const express = require('express');
const app = express();
const url = 'mongodb://Nick:SecWorkshop2@ds133202.mlab.com:33202/nasa-missions';
const dbName = 'nasa-missions'
const mongoClient = require("mongodb").MongoClient
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app. get('/', (req, res) =>{
res.status(200).json({message: 'Welcome to the NASA missions api'});
});
mongoClient.connect(url, function(err, client)
{
    if (err)
    {
        console.log(err);
    }

    const db = client.db(dbName);
    app.get("/missions", (req, res) =>
{
    db.collection('missions')
    .find()
    .toArray(function(err, docs) {
        if (err)
        {
            console.error(err);
            res.status(500).json({messgae: 'Houston We have a problem'});
        }
        else{
        res.status(200).json(docs);
        }
    });

});
});

app.post('/missions', (req, res) => {
    const mission = req.body;
    db.collection('missions')
        .insert(mission,
            function(err, result) {
                if (err) {
                    console.error(err);
                    res.status(500).json({message: "Houston we have a problem"});
                } else {
                    res.status(200).json(result.ops);
                }
    });
});
app.listen(9000, () => 
{
    console.log('NASA Server launched over 9000!!!!!!');
});