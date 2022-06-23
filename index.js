import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
const app = express();
const port = 8005

app.use(cors({
  origin: [
    'https://dev.hamsearch.io',
    'https://hamsearch.io',
    'http://localhost:3000/'
  ],
}));

app.get('/hamdb/', (req, res) => {
  res.send({ messages: { status: 'EMPTY' } });
})

app.get('/hamdb/:callsign', async (req, res) => {
  const { callsign } = req.params;

  try {
    const response = await fetch(`http://api.hamdb.org/${callsign}/json/hamsearch`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
    const data = await response.json();
    res.send(data.hamdb);
  } catch (err) {
    res.send({ messages: { status: 'OTHER' } });
  }

});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
