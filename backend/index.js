const connecttomongo=require('./con');
const express = require('express');
var cors = require('cors');
connecttomongo();

var app = express()
 
app.use(cors())
app.use(express.json());
const port = 8000


app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook App listening on port ${port}`)
})