let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 9871;
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
// let mongoUrl = process.env.MongoUrl;
let mongoUrl = process.env.MongoLiveUrl;
let db;//db object 


app.get('/',(req,res)=>{
    res.send('express server default');
})

// app.get('/products',(req,res) => {
//   let categoryid = Number(req.query.categoryid);
//   let query = {}
//   if(categoryid){
//     query = {category_id:categoryid}
//   }

//   db.collection('products').find(query).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })
// products based on category name
app.get('/products',(req,res) => {
  let categoryname = req.query.categoryname
  let query = {}
  if(categoryname){
    query = {category:categoryname}
  }

  db.collection('products').find(query).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})


//best selling products
app.get('/bestsellingproducts',(req,res) => {
    db.collection('products').find({$and:[{product_count:{$gt:1000}}]}).toArray((err,result) => {
      if(err) throw err;
      res.send(result)
    })
})

// sort products based on price and range

app.get('/sortproductsonprice',(req,res) => {
  db.collection('products').find({$and:[{Price:{$gte:1000,$lte:5000}}]},{projection:{_id:0,product_name:1,Price:1}}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

//filters

// app.get(`/filter/:category_id`,(req,res) => {
//   let sort = {cost:1}
//   let category_id = Number(req.params.category_id)
//   let cuisineId = Number(req.query.cuisineId)
//   let lcost = Number(req.query.lcost)
//   let hcost = Number(req.query.hcost)
//   let query = {}
//   if(req.query.sort){
//     sort={cost:req.query.sort}
//   }

//   if(lcost && hcost && cuisineId){
//     query={
//       "mealTypes.mealtype_id":mealId,
//       $and:[{cost:{$gt:lcost,$lt:hcost}}],
//       "cuisines.cuisine_id":cuisineId
//     }
//   }
//   else if(lcost && hcost){
//     query={
//       "mealTypes.mealtype_id":mealId,
//       $and:[{cost:{$gt:lcost,$lt:hcost}}]
//     }
//   }
//   else if(cuisineId){
//     query={
//       "mealTypes.mealtype_id":mealId,
//       "cuisines.cuisine_id":cuisineId
//     }
//   }else{
//     query={
//       "mealTypes.mealtype_id":mealId
//     }
//   }
//   db.collection('products').find(query).sort(sort).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })



// products details based on productid 
app.get('/productdetails/:id',(req,res) => {
  let productid =  mongo.ObjectId(req.params.id)
  let query = {}
  if(productid){
    query = {_id:productid}
  }
  db.collection('products').find(query).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

// based on selected product display remaining products related to brand name
app.get('/relatedproductdetails/:pname',(req,res) => {
  let pname = req.params.pname;
  let query = {}
  if(pname){
    query = {Brand:pname}
  }
  db.collection('products').find(query).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})


// // delete orders details based on id
// app.delete('/deleteOrder/:id',(req,res) => {
//   let oid =  mongo.ObjectId(req.params.id)
//   db.collection('orders').remove({_id:oid},(err,result) => {
//     if(err) throw err;
//     res.send('Order Deleted')
//   })
// })


// app.get('/products',(req,res) => {
//   db.collection('products').find().toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })

app.get('/category',(req,res) => {
    db.collection('category').find().toArray((err,result) => {
      if(err) throw err;
      res.send(result)
    })
})

// app.get('/restaurants',(req,res) => {
//   let stateId = Number(req.query.stateId)
//   let mealId = Number(req.query.mealId)
//   let query = {}
//   if(stateId && mealId){
//     query = {state_id:stateId,'mealTypes.mealtype_id':mealId}
//   }
//   else if(stateId){
//     query = {category_id:stateId}
//   }else if(mealId){
//     query = {'mealTypes.mealtype_id':mealId}
//   }
//   db.collection('restaurants').find(query).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })



app.get('/mealType',(req,res) => {
  db.collection('mealType').find().toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

// app.get('/restaurants',(req,res) => {
//   let stateId = Number(req.query.stateId)
//   let mealId = Number(req.query.mealId)
//   let query = {}
//   if(stateId && mealId){
//     query = {state_id:stateId,'mealTypes.mealtype_id':mealId}
//   }
//   else if(stateId){
//     query = {state_id:stateId}
//   }else if(mealId){
//     query = {'mealTypes.mealtype_id':mealId}
//   }
//   db.collection('restaurants').find(query).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })

//connection with db
MongoClient.connect(mongoUrl,(err,client) => {
    if (err) console.log('ERROR WHILE CONNECTING');
    db = client.db('flipkart');
    app.listen(port,(err)=>{
        if (err) throw err;
        console.log(`express server listing on port ${port}`);
    
    })
})


