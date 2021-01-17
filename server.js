const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()

const bucketRouter = require('./router/bucket_router')
const todoRouter = require('./router/todo_router')


require('./db/mongoose')

const port = process.env.PORT || 3030

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/bucket',bucketRouter);
app.use('/todo',todoRouter);

app.listen(port,()=>{
  console.log(`port started on ${port}!!`)
})