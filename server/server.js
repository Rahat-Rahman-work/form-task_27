const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 1048;

const app= express();

app.use(bodyParser.json());

app.use(cors());

app.get('/', function(req, res) {
   res.send('Hello from Server');
})

app.post('/enroll', function(req,res){
   console.log(req.body);
   res.status(401).send({"message": "Data received"}); 
})

app.listen(PORT, function(){
    console.log("Server running on localhost: "+ PORT);
});