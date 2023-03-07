import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import { licenseClasses, licenseStatus, countryCodes } from './utils/index.js';

const app = express();
const port = 8005

app.use(cors({
  origin: [
    'https://dev.hamsearch.io',
    'https://hamsearch.io',
    'http://localhost:3000'
  ],
}));

app.get('/', (_, res) => {
  res.send({ status: 'EMPTY' });
});

app.get('/:callsign', async (req, res) => {
  const { callsign } = req.params;
  const isValid = (/[a-z,A-Z,0-9]/).test(callsign);

  if (isValid) {
    try {
      const response = await fetch(`http://api.hamdb.org/${callsign}/json/hamsearch`);
      const { hamdb } = await response.json();
      const data = {
        ...hamdb.callsign,
        licenseStatus: hamdb.callsign.status,
        status: hamdb.messages.status,
      };

      const { code } = countryCodes.find(({ name }) => name === data.country);
      const flagUrl = `https://flagcdn.com/${code}.svg`;

      res.send({
        address: data.addr1,
        address2: `${data.addr2 && `${data.addr2},`} ${data.state && `${data.state}.`} ${data.zip}`,
        callsign: data.call,
        cls: licenseClasses[data.class] || data.class,
        country: data.country,
        expires: data.expires,
        flag: flagUrl,
        grid: data.grid,
        lat: data.lat,
        licenseStatus: licenseStatus[data.licenseStatus] || data.licenseStatus,
        lon: data.lon,
        name: `${data.fname} ${data.name}`,
        status: data.status,
      });
    } catch (err) {
      res.send({ status: 'ERROR' });
    }
  } else {
    res.send({ status: 'EMPTY' });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
