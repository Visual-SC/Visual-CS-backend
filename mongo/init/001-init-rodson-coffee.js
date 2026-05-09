// Creates base DB/collections on first initialization.
// Note: This runs only when /data/db is empty.

db = db.getSiblingDB("rodson-coffee");

db.createCollection("products");
db.createCollection("orders");
