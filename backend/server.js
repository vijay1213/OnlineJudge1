const express = require("express")
const cors = require('cors');
const bodyParser = require("body-parser");
const routes = require('./routes');
const database = require('./config/Dadabase');
const connectDatabase = require("./config/Dadabase");
const indexRoutes = require('./routes/index');



const app = express();


connectDatabase();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors({credentials:true, origin: "http://localhost:3000"}));
app.use(routes);
app.use('/', indexRoutes);


app.listen(8080,()=>{
    console.log("Server Work in Port  : " , 8080)
})