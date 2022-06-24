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
  res.send({ messages: { status: 'EMPTY' } });
})

app.get('/:callsign', async (req, res) => {
  const { callsign } = req.params;
  const isValid = (/[a-z,A-Z,0-9]/).test(callsign);

  if (isValid) {
    try {
      const response = await fetch(`https://api.hamdb.org/${callsign}/json/hamsearch`);
      const data = await response.json();

      res.send(data.hamdb);
    } catch (err) {
      res.send({ messages: { status: 'OTHER' } });
    }
  } else {
    res.send({ messages: { status: 'EMPTY' } });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
