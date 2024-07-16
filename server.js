require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const taskRoutes = require('./routes/tasks')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware
app.use(express.json())
app.use(express.static('./frontend/build'));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build",
  "index.html"));
  });

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/tasks', taskRoutes)
app.use('/api/user', userRoutes)

app.use((req,res)=>{
   res.send('app is running')
})
// connect to db
const port =  process.env.PORT || 5444
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(port, () => {
      console.log('connected to db & listening on port', port)
    })
  })
  .catch((error) => {
    console.log(error)
  })