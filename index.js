import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
const app = express();
const port = 8005

app.use(cors({
  origin: ['http://localhost:8004'],
}));

app.get('/hamdb/:callsign', async (req, res) => {
  const { callsign } = req.params;

  if (callsign) {
    try {
      const response = await fetch(`http://api.hamdb.org/${callsign}/json/hamsearch`);
      const data = await response.json();
      res.send(data.hamdb);
    } catch (err) {
      res.send({ status: 'OTHER' });
    }
  } else {
    res.send({ status: 'EMPTY' });
  }

});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
