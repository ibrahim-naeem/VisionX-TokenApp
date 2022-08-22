const express = require('express');


const PORT = 3000;
const app = express();


const users = require('./router');

// middleware without this we cannot access request body (req.body)
app.use(express.json())

app.use('/app', users)


//PORT : 3000
app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`)
})