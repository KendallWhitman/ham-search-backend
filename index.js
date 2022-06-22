import fetch from 'node-fetch';
import express from 'express';
const app = express();
const port = 3001

app.get('/hamdb/:callsign', async (req, res) => {
  const response = await fetch(`http://api.hamdb.org/${req.params.callsign}/json/hamsearch`);
  const json = await response.json();
  res.send(json);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
