#!/bin/bash
echo "Import mongo dumps to an ecommerce database"
mongorestore --verbose item/dump
mongorestore --verbose cart/dump