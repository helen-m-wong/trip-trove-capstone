var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express()
app.use(cors())

var CONNECTION_STRING = "mongodb+srv://wonghele:wQUDeHROxfHSOooY@tripplannerdb.y1x1gi0.mongodb.net/"

var DATABASENAME = "test";
var database;

app.listen(3000, ()=> {
    Mongoclient.connect(CONNECTION_STRING, (error,client)=> {
        database= client.db(DATABASENAME);
        console.log("Mongo DB Connection Success");
    });
})

app.get('/api/test/GetExperiences', (request,response)=> {
    database.collection("experiences").find({}).toArray((error,result)=> {
        response.send(result);
    });
})

app.post('/api/test/AddExperiences', multer().none(), (request,response)=> {
    database.collection("test").count({}, function(error,numOfDocs) {
        database.collection("expreiences").insertOne({
            id:(numOfDocs+1).toString(),
            description:request.body.newNotes
        });
        response.json("Added Successfully")
    })
})

app.delete('/api/test/DeleteExperiences', (request,reponse)=>{
    database.collection("experiences").deleteOne({
        id:request.query.id
    });
    response.json("");
})
