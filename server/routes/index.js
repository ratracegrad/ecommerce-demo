'use strict';

require('dotenv').config();
const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const dbURI = process.env.MONGODB_URI;

const connectToDatabase = () => {
  return new Promise((resolve, reject) => {

    MongoClient.connect(dbURI, (err, db) => {
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
  let category = req.query.category || 'All';
  let page = req.query.page ? Number(req.query.page) : 0;
  let limit = req.query.limit ? Number(req.query.limit) : 5;
  let skip = page * limit;

  connectToDatabase()
    .then((db) => {

      const findCondition = (category.toLowerCase() === 'all') ? {} : { category: category };
        db.collection('item').find(findCondition).skip(skip).limit(limit).sort({ _id: 1 })
          .toArray((err, docs) => {
            if (err) {
              return res.status(500).send(`Error: ${err}`);
            }

            res.json(docs);
          })
    })
    .catch((err) => {
      res.status(500).send(`Error connecting to database: ${err}`);
    });
});

router.get('/getnumitems', (req, res) => {
  const category = req.query.currentCategory || 'All';
  const findCondition = (category.toLowerCase() === 'all') ? {} : { category: category };

  connectToDatabase()
    .then((db) => {
      db.collection('item').find(findCondition).toArray((err, docs) => {
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

router.get('/getitem/:id', (req, res) => {
  const itemId = parseInt(req.params.id);

  connectToDatabase()
    .then((db) => {
      db.collection('item').findOne({ _id: itemId }, (err, doc) => {
        if (err) {
          return res.status(500).send(`Error: ${err}`);
        }

        /* EXCEPTION: document not found */
        if (doc === null) {
          return res.status(404).send('Item not found');
        }

        res.json(doc);
      })
    })
    .catch((err) => {
      res.status(500).send(`Error connecting to database: ${err}`);
    });

});

router.get('/getrelateditems', (req, res) => {

  connectToDatabase()
    .then((db) => {
      db.collection('item').find({}).limit(4)
        .toArray((err, docs) => {
          if (err) {
            return res.status(500).send(`Error: ${err}`);
          }

          res.json(docs);
        })
    })
    .catch((err) => {
      res.status(500).send(`Error connecting to database: ${err}`);
    });
});

module.exports = router;