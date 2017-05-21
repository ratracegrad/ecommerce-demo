'use strict';

const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const dbURI = process.env.DBURI;
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
};

router.get('/categories', (req, res) => {
  const categories = [];
  let total = 0;
  let category = {
    _id: "All",
    num: 9999
  };
  categories.push(category);

  connectToDatabase()
    .then((db) => {
      db.collection('item')
        .aggregate([
          { $group: { _id: '$category', num: { $sum: 1 } } },
          { $sort: { _id: 1 } }
        ]).toArray((err, docs) => {
          if (err) {
            return res.status(500).send(`Error: ${err}`);
          }

          docs.forEach((item) => {
            const itemCat = Object.assign({}, category);
            itemCat._id = item._id;
            itemCat.num = item.num;
            total += item.num;
            categories.push(itemCat);
          });

          categories[0].num = total;
          res.json(categories);
        })
    })
    .catch((err) => {
      res.status(500).send(`Error connecting to database: ${err}`);
    });
});

router.get('/getitems', (req, res) => {
  const category = req.params.category || 'All';
  const page = req.params.page ? Number(req.params.page) : 0;
  const limit = req.params.itemsPerPage ? Number(req.params.itemsPerPage) : 5;
  const skip = page * limit;

  connectToDatabase()
    .then((db) => {

      if (category.toLowerCase() === 'all') {
        db.collection('item').find({}).skip(skip).limit(limit).sort({ _id: 1 })
          .toArray((err, docs) => {
            if (err) {
              return res.status(500).send(`Error: ${err}`);
            }

            res.json(docs);
          })
      } else {
        db.collection('item').find({ category: category }).skip(skip).limit(limit).sort({ _id: 1 })
          .toArray((err, docs) => {
            if (err) {
              return res.status(500).send(`Error: ${err}`);
            }

            res.json(docs);
          })
      }

    })
    .catch((err) => {
      res.status(500).send(`Error connecting to database: ${err}`);
    });
});

router.get('/getnumitems', (req, res) => {
  const category = req.params.currentCategory || 'All';
  const findSearch = (category.toLowerCase() === 'all') ? {} : { category: category };

  connectToDatabase()
    .then((db) => {
      db.collection('item').find(findSearch).toArray((err, docs) => {
        if (err) {
          return res.status(500).send(`Error: ${err}`);
        }

        res.json({ count: docs.length });
      });
    })
    .catch((err) => {
      res.status(500).send(`Error connecting to database: ${err}`);
    });

});

module.exports = router;