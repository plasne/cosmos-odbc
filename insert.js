
// includes
const config = require("config");
const DocumentDBClient = require("documentdb").DocumentClient;
const async = require("async");
const fs = require("fs");

// configuration
const host = config.get("host");
const key = config.get("key");
const db = config.get("db");
const col = config.get("col");

// create Cosmos client
const client = new DocumentDBClient(host, { masterKey: key });
const dbLink = "dbs/" + db;
const collectionLink = dbLink + "/colls/" + col;

// insert document
function insertDocument(doc) {
    return new Promise((resolve, reject) => {
        client.createDocument(collectionLink, doc, (error, created) => {
            if (error) {
                reject(error);
            } else {
                resolve(created);
            }
        });
    });
}

// insert documents
function insertDocuments(filename) {
    console.log("inserting into " + filename + "...");
    return new Promise((resolve, reject) => {
        let count = 0;

        // read the file
        const items = JSON.parse(fs.readFileSync(filename));

        // add each to Cosmos in parallel (up to 8 at a time)
        async.eachLimit(items, 8, (item, cb) => {
            insertDocument(item).then((created) => {
                count++;
                cb();
            }, (error) => {
                cb("error(100): " + error);
            });
        }, (error) => {
            console.log("done...");
            if (error) {
                console.error("error(101): " + error);
                reject(error);
            } else {
                console.log(count + " items loaded from " + filename + ".");
                resolve(count);
            }
        });

    });
}

// insert all data
insertDocuments("colors.json").then((count) => {
    insertDocuments("features.json").then((count) => {
        insertDocuments("cars.json").then((count) => {
            console.log("all loaded.");
        }, (error) => {
            // error already raised
        });
    }, (error) => {
        // error already raised
    });
}, (error) => {
    // error already raised
});