const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;


const app = express();
const port = process.env.PORT || 5000;



//use middleware
app.use(cors());
app.use(express.json());

//user : dbuser1
//password : Lmh4cPOOHPJzZjj7



const uri = "mongodb+srv://dbuser1:Lmh4cPOOHPJzZjj7@cluster0.y63bj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
      
        await client.connect();
        const usercollection = client.db("FoodExpress").collection("User");

        //get users
        app.get('/user',async(req,res)=>{
            const query ={}
            const cursor = usercollection.find(query);
            const users = await cursor.toArray();
            res.send(users)
        })
        //post user add a new user
        app.post('/user',async(req,res)=>{
            const newUser =req.body;
            console.log('Add newUser',newUser);
            const result =await usercollection.insertOne(newUser)
            res.send(result)
        })
        //delete a single user
        app.delete('/user/:id',async(req,res)=>{
            const id =req.params.id
            const query ={_id:ObjectId(id)}
            const result =await usercollection.deleteOne(query)
            res.send(result)
        })
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('Running my node crud server')
})
app.listen(port, () => {
    console.log('crud server is ruuning ', port);
})