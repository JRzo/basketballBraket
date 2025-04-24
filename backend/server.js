const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const MongoClient = require('mongodb').MongoClient;
let url = 'mongodb+srv://juliosoftwaredev:CyberWarrior2209**@basketballbracketdb.qndxxen.mongodb.net/?retryWrites=true&w=majority&appName=BasketballBracketDB';
const dbName = "NBADB";
let db;

let port = 8888;

let database;

MongoClient.connect(url)
    .then(client => {
        database = client.db(dbName);
        console.log('Connected to database');

        app.listen(port, () => {
            console.log('Server is running on port 5000');
        });
    })
    .catch(err => console.error(err));

    // middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("../frontEnd/public"));
app.use(bodyParser.json());
// Set the view engine to EJS
app.set('views', './views')
app.set('view engine', 'ejs');

// Create views directiory ==> express looks for view files in a directoiryt named views in the root of your
// project


app.get('/api/teams/east', async (req, res) => {
    try {
        const eastCollection = database.collection("East");
        const eastTeams = await eastCollection.find({}).toArray(); // Fetch all documents as an array
        res.status(200).send(eastTeams); // Send the array of team objects as JSON
    } catch (error) {
        console.error("Error fetching East teams:", error);
        res.status(500).send("Error fetching data");
    }
});

// To fetch all of the teams;
app.get('/api/teams', async (req, res) =>{
    try{
        const westCollection = database.collection("West");
        const westTeams = await westCollection.find({}).toArray();
        res.send(westTeams);

    }
    catch(error){
        console.log("Error here", error);
        res.status(500).send("Error fetching data");
    }
})
  

  // Define a route to handle the query parameter (if you're passing 'team' in the URL)
