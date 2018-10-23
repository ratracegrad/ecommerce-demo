# E-commerce Demo

This is a sample application that demonstrates an E-commerce website using the MEAN stack. The application loads 
products a MongoDB database and displays them. Users can select to display products in a single category. Users can 
click on any product to get more information including pricing, reviews and rating. Users can select items and 
add them to their shopping cart

## Import Data
I have included a data folder in this repo. Inside that folder will be 2 folders called cart and item. These 2 folders contain a mongodump of the 2 collections that I use in this ecommerce demo. You can use the [import-data.sh](data/import-data.sh) script to import these 2 dumps to an ecommerce database, then you will have the same content that I have for this demo.

## Live Demonstration

The E-commerce demo can be [viewed online here](https://jb-ecommerce-demo.herokuapp.com/).

Here are screenshots that show the E-commerce demo application in use.

**Home Page**
![Home Page](/screenshots/homePage.png?raw=true "Optional Title")

---

**Item Detail Page**
![Item Detail](/screenshots/itemDetail.png?raw=true "Optional Title")

---

**Shopping Cart**
![Shopping Cart](/screenshots/shoppingCart.png?raw=true "Shopping Cart")

## Getting Started
To get started  you can simply clone this `ecommerce-demo` repository and install the dependencies.

Clone the `ecommerce-demo` repository using git:

```bash
git clone https://github.com/ratracegrad/ecommerce-demo
cd ecommerce-demo
```

Install dependencies with this command:
```bash
npm install
```

Run the application with this command:
```bash
npm start
```

## Tech Stack
* AngularJS
* Node.js
* Express.js
* Bootstrap
* ui-Router
