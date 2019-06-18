const express = require('express');
const cors = require('cors');
const app = express();
const port = 9999;

app.use(cors())

app.get('/testme/get', (req, res) => {
  res.send('get method success');
});

app.get('/testme/get/error', (req, res) => {
  res.status(500).send('Something broke!');
});

app.post('/testme/post', (req, res) => {
  res.send('post method success');
});

app.post('/testme/post/json', (req, res) => {
  res.json({
    firstName: 'John',
    lastName: 'Williams'
  });
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
