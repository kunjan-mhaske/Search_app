const express = require("express")
const bodyParser = require("body-parser")
const app = express();


// For single domain to connect
const cors = require("cors");
var corsOptions = {
    origin: "http://localhost:8091"
};
// app.use(cors(corsOptions))

// Uncomment above function call and comment following function call 
// to use only single domain to connect.
// To allow multiple domains to connect
app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:8091'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
  });


// parse requests of content type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Search API landing page. Use API inspection tools such as Postman to test API calls." });
});

require("./app/routes/records.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
// uncomment to create the table if not exists
// db.sequelize.sync();


// Use In development-testing only. It deletes the db records
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });