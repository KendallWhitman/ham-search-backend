import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
const app = express();
const port = 8005

app.use(cors({
  origin: [
    'https://dev.hamsearch.io',
    'https://hamsearch.io',
    'http://localhost:3000'
  ],
}));

app.get('/', (req, res) => {
  res.send({ status: 'EMPTY' });
});

app.get('/:callsign', async (req, res) => {
  const { callsign } = req.params;
  const isValid = (/[a-z,A-Z,0-9]/).test(callsign);
  
  const licenseClasses = {
    T: "Technician",
    G: "General",
    E: "Extra",
  };

  const licenseStatus = {
    A: "Active",
    E: "Expired",
  };

  if (isValid) {
    try {
      const hamdbUrl = `http://api.hamdb.org/${callsign}/json/hamsearch`
      const response = await fetch(hamdbUrl);
      const { hamdb } = await response.json();
      const data = {
        ...hamdb.callsign,
        licenseStatus: hamdb.callsign.status,
        status: hamdb.messages.status,
      };

      const formattedData = {
        address: data.addr1,
        address2: `${data.addr2 && `${data.addr2},`} ${data.state && `${data.state}.`} ${data.zip}`,
        callsign: data.call,
        cls: licenseClasses[data.class] || data.class,
        country: data.country,
        expires: data.expires,
        grid: data.grid,
        lat: data.lat,
        licenseStatus: licenseStatus[data.licenseStatus] || data.licenseStatus,
        lon: data.lon,
        name: `${data.fname} ${data.name}`,
        status: data.status,
      }

      res.send(formattedData);
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
