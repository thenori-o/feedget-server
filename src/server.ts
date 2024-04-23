import express from 'express';

const app = express();
app.use('/', async (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log('HTTP server running on port', PORT);
});