'use strict';

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer();
// require and use "multer"...

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post("/api/fileanalyse", upload.any(),  (req, res) => {
  if(req.files.length)
    res.json({name: req.files[0].originalname,
           type: req.files[0].mimetype,
           size: req.files[0].size});
  else res.json({error: "Please upload a file"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
