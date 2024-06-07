const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/login', async (req, res) =>{
  console.log(req.body);
  res.redirect('http://localhost:4200/dashboard/')
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
