const express = require("express");

const cors = require("cors");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 5007;

app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://todoz:jcHytVIX4yMtjQkQ@cluster0.2xzkprd.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const List = client.db("todoz").collection("list");

    app.post("/addList", async (req, res) => {
      const ListItem = req.body;
      console.log(ListItem);
      ListItem.Deadline = new Date(ListItem.Deadline);
      const result = await List.insertOne(ListItem);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("todoz server is running");
});
app.listen(port, (req, res) => {
  console.log(`todoz server is running on port:${port}`);
});
