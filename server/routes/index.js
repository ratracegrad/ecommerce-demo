'use strict';

const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const dbURI = process.env.dbURI
console.log('dbURI', dbURI); // TODO make this work

const connectToDatabase = () => {
  return new Promise((resolve, reject) => {

    MongoClient.connect("mongodb://localhost:27017/mongomart", (err, db) => {
      if (err) {
        reject(err)
      }

      resolve(db)
    })

  })
}

router.get('/categories', (req, res) => {
  console.log('in routes categories');
  connectToDatabase()
    .then((db) => {
      db.collection('item')
        .aggregate([
          { $group: { _id: '$category', num: { $sum: 1 } } },
          { $sort: { _id: 1 } },
          { $project: {name: "$_id", num: 1, _id: 0} }
        ]).toArray((err, categories) => {
          if (err) {
            return res.status(500).send(`Error: ${err}`);
          }
          res.json(categories);
        })
    })
    .catch((err) => {
      res.status(500).send(`Error connecting to database: ${err}`);
    });
});

module.exports = router;