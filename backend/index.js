const express = require('express');
const app = express();
const port = 5000
const db = require('./db/db')

db();

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*");
    next(); 

})

app.get('/', (req, res) => {
    res.send('Hello World');
})


app.use(express.json())
app.use("/api", require('./Routes/CreateUser'))
app.use("/api", require('./Routes/Displaydata'))
app.use("/api", require('./Routes/OrderData'))
// app.use("/api", require('./screens/myOrderData'))


app.listen(5000, () => {
    console.log('Listening on port 5000');
})


module.exports = app;    
