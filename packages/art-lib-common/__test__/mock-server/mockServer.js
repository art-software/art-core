const express = require('express');
const cors = require('cors');
const app = express();
const port = 9999;

app.use(cors())

app.get('/testme/get', (req, res) => {
  res.send('get method success');
});

app.post('/testme/post', (req, res) => {
  res.send('post method success');
});

app.put('/testme/put', (req, res) => {
  res.send('put method success');
});

app.delete('/testme/delete', (req, res) => {
  res.send('delete method success');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
