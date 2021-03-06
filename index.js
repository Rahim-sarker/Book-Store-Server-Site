const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kfohm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri)

async function run() {
    try {
        await client.connect();
        const database = client.db('bookShop');
        const productCollection = database.collection('products');

        //GET Products API
        app.get('/products', async (req, res) => {
            const cursor = productCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        })
    }
    finally {
        // await client.close();

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Book House Server is Running');
});

app.listen(port, () => {
    console.log('Server is running at port', port);
})
