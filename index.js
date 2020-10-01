const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const { connect } = require("http2");

const url = "mongodb://localhost:27017/";
const dbname = "confusion";

MongoClient.connect(url, (err, client) => {
  assert.strictEqual(err, null);
  console.log("connected to  db");

  const db = client.db(dbname);
  //console.log(db + "\n\n");
  const collecton = db.collection("dishes");
  collecton.insertOne(
    { name: "hitesh", description: "well taught" },
    (err, result) => {
      assert.strictEqual(err, null);
      console.log("inserted..");

      collecton.find().toArray((err, docs) => {
        assert.strictEqual(err, null);
        console.log(docs);
      });
      db.dropCollection("dishes", (err, result) => {
        assert.strictEqual(err, null);

        console.log("deleted dishes");
        client.close();
      });
    }
  );
});
