// console.log('Hello');

//to help make routes
const express = require('express')

//to access the routes we set a variable
const app = express()

//to connect the database
const mongoose = require ('mongoose')

//to set up middleware, for fetching the json datatype
app.use(express.json())


//import product module
const p = require('./models/productModel')

//routes
app.get('/',(req,res)=>{
    res.send('Hello node API')
})

app.get('/blog',(req,res)=>{
    console.log('hello blog');
    res.send("Hi there you are in blog")
})

//to access the product schema, we set up routes first
app.post('/products',async(req,res)=>{
    // console.log(req.body);
    // res.send(req.body);          the json body that we send through the 'body'attribute in thunderclient is recieved from the server

    //next up is how to save this json body in the database
    try{
        //the body that is sent via request with the help of product schema(p) is created and stored in the prod variable. to be stored in the db 
        const prod = await p.create(req.body)
        res.status(200).json(prod);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

//to get the data fromthe db
app.get('/products', async(req,res)=>{
    try {
        //this implies find all the products in p schema
        const eshasp = await p.find({})
        res.status(200).json(eshasp)
    }catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})

//to get a single product instead of all the products from the database
app.get('/products/:id',async(req,res)=>{
    try {
        //we provide id here fromo the parameters
        const {id} = req.params;

        //now rather than finding all the products from the product schema, get the product which has the id which we specified.
        const p1 = await p.findById(id)
        res.status(200).json(p1);
    }catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})

//to update a product we use put method
app.put('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;

        //we get the id of the product to be updated and update it with the data in 'req.body'
        const p2 = await p.findByIdAndUpdate(id, req.body)

        //check if the data is being updated or not
        //we cannot find the product in the database
        if(!p2){
            return res.status(404).json({message:'cannot find any product with ID ${id}'})
        }

        //if successfully updated then
        //if we only write the line res.status..... then it takes time to respond with the updated product so we have to fetch more than once for updated and last value
        //thus we will access the updated data first
        const updatedp2 = await p.findById(id);
        res.status(200).json(updatedp2);

        //if we want to update the products not just by json then we have to include their middle ware also. 
        //eg for json we did app.use(express.json())
        //we will have to do the following for form
        //app.use(express.urlencoded({extended:false}))

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})

//delete a product
app.delete('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const p3 = await p.findByIdAndDelete(id);

        //if there id no product with that id
        if(!p3){
            return res.status(404).json({message:'cannot find this product with id ${id}'})
        }

        //when successfully deleted
        res.status(200).json(p3);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }

})

mongoose.set("strictQuery",false);      //so that it doesnt show a error log in the console(terminal)
mongoose.connect("your-mongoose-uri-here")              //connect with your mongoose uri and pwd
.then(()=>{
    console.log('connected to DB')
    app.listen(5000, ()=>{
        console.log('Node API Oneshot is running on port 5000');
    })
})
.catch((err)=>{
    console.log(err)
})
