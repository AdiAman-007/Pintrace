const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const _ = require('underscore');
const { v4: uuidv4 } = require('uuid');
const { forEach } = require('underscore');
const { query } = require('express');
const port = 3000
const uri = "mongodb+srv://pintrace:password12345@cluster0.ypvi9.mongodb.net/Pintrace?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
    if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   else console.log('Connected...');
  //  resetParts();
   //addParts();
//    client.close();
});

const app = express()
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(express.static(process.cwd()+"/dist/Pintrace/"));

app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/dist/Pintrace/index.html")
});


function verifyManufacturerToken(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null'){
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload){
    return res.status(401).send('Unauthorized request')
  }
  req.type = payload.type
  if(req.type === 'manufacturer'){
    console.log(req.type)
    next()
  }
  else{
    return res.status(401).send('Unauthorized request')
  }
}

function verifySupplierToken(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null'){
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload){
    return res.status(401).send('Unauthorized request')
  }
  req.type = payload.type
  if(req.type === 'supplier'){
    next()
  }
  else{
    return res.status(401).send('Unauthorized request')
  }
}

app.get('/getuser', (req, res) => {
    dbo = client.db("Pintrace")
    var query = { userid: "aman@samsung" }
    dbo.collection("Users").findOne(query, function(err, result) {
        if (err){
            throw err
            res.send("error")
        } 
        if(!result){
            res.send("invalid query")
            console.log("invalid query")
        }
        else{
            res.send(result)
            console.log(result)
        }
        dbo.close
      });

})

app.get('/updateuser', (req,res) => {
    dbo = client.db("Pintrace")
    var myquery = { userid: "aditya@fedex" }
    var newvalues = { $set: {name: "Aditya"} }
    dbo.collection("Users").updateOne(myquery, newvalues, function(err, res) {
      if (err)
      {
        console.log(err)
      }
      else console.log("doc updated")
      dbo.close
    })
})

app.post('/authenticateUser', (req,res) => {
  let userData = req.body;
  dbo = client.db("Pintrace")
  dbo.collection("Users").findOne({userid: userData.userid}, function(err, user) {
    if (err){
      console.log(err);
    }
    else{
      if(!user){
        res.status(401).send('Invalid User')
      }
      else if(user.password !== userData.password){
        res.status(401).send('Invalid Password')
      }
      else{
         let payload = {
           name: user.name,
           userid: user.userid,
           org: user.org,
           type: user.type,
           role: user.role
         }
         let token = jwt.sign(payload, 'secretKey')
         res.status(200).send({token})
      }
    }
  })
})

app.get('/getlocation',verifyManufacturerToken ,(req,res) => {
  dbo = client.db("Pintrace")
  var cursor = dbo.collection('manufacturer_location').find();
  cursor.each(function(err, doc) {
      if(err){
        console.log(err);
        res.status(500).send(err);
      } else {
        if(doc){
          res.status(200).send(doc.location);
        }
      }
  })
  dbo.close
})

app.get('/getsuppliers',verifyManufacturerToken ,(req,res) => {
  dbo = client.db("Pintrace")
  var cursor = dbo.collection('Suppliers').find();
  cursor.each(function(err, doc) {
      if(err){
        console.log(err);
        res.status(500).send(err);
      } else {
        if(doc){
          res.status(200).send(doc.suppliers);
        }
      }
  })
  dbo.close
})

app.post('/getparts', verifyManufacturerToken, (req,res) => {
  dbo = client.db("Pintrace")
  let reqData = req.body
  dbo.collection('Supplier_master').findOne({ supplier:reqData.supplier }, function(err, doc) {
    if (err){
        throw err
        res.send("error")
    } 
    if(!doc){
        res.send("invalid query")
        console.log("invalid query")
    }
    else{
        let result = doc
        delete result._id
        delete result.supplier
        res.status(200).send(Object.keys(result))
        console.log(Object.keys(result))
    }
    dbo.close
  })
})

app.post('/createpo', verifyManufacturerToken, (req,res) => {
  try{
    dbo = client.db("Pintrace")
    if(_.isEmpty(req.body)){
      res.status(500).send({msg:'Failed to created order'})
      throw err;
    }
    else{
      let reqData = req.body
      reqData.status = "confirmed"
      reqData.deliverdate = ""
      dbo.collection("Order_master").insertOne(reqData, function(err, resp) {
        if (err){
          res.status(500).send({msg:'Failed to created order'})
          throw err;
        }
        else{
          console.log("1 document inserted");
          res.status(200).send({msg:'Order Created'})
        }
        dbo.close
      });
    }
  } 
  catch(err) {
    res.status(500).send({msg:'Failed to created order'})
    console.log(err)
  }
})

app.get('/carddata', verifyManufacturerToken, (req,res) => {
  try{
    let payload = {}
    dbo = client.db("Pintrace")
    dbo.collection("Order_master").find({ status:'confirmed' }).count((err,r1) => {
      if(err) throw err;
      payload.confirmed = r1
      dbo.collection("Order_master").find({ status:'shipped' }).count((err,r2) => {
        if(err) throw err;
        payload.shipped = r2
        dbo.collection("Order_master").find({ status:'delivered' }).count((err,r3) => {
          if(err) throw err;
          payload.delivered = r3
          res.status(200).send(payload)
        });
      });
    });
  } 
  catch(err) {
    res.status(500).send({msg:'Failed to fetch data'})
    console.log(err)
  }
})

app.get('/dashboardchart', verifyManufacturerToken, (req,res) => {
  try{
    date = new Date()
    dateArray=[]
    dbo = client.db("Pintrace")
    for(i=0; i<5; i++){
      date = date.toISOString().split('T')[0]
      dateArray.push(date)
      date = new Date(new Date(date).setDate(new Date(date).getDate() - 1))
    }
    for(let items of dateArray){
      dbo.collection("Order_master").find({orderdate:items}).toArray( (err,resp) => {
        if(err) throw err
        if(_.isEmpty(resp)) throw err
        console.log(resp)
        
      })
    }
    dbo.close
    res.status(200).send(resp)
  }
  catch(err){
    console.log(err)
  }
})

app.get('/dashboardtable', verifyManufacturerToken, (req, res) => {
  try{
    dbo = client.db("Pintrace")
    dbo.collection("Order_master").find({}).toArray( (err,resp) => {
      if(err) throw err
      if(_.isEmpty(resp)) throw err
      res.status(200).send(resp)
    })
  }
  catch(err){
    res.status(500).send({msg:'Failed to fetch data'})
    console.log(err)
  }
})

app.get('/producttable', verifyManufacturerToken, (req, res) => {
  try{
    dbo = client.db("Pintrace")
    dbo.collection("Product_inventory").find({}).toArray( (err,resp) => {
      if(err) throw err
      if(_.isEmpty(resp)) throw err
      res.status(200).send(resp)
    })
  }
  catch(err){
    res.status(500).send({msg:'Failed to fetch data'})
    console.log(err)
  }
})

app.post('/getpo',(req,res) => {
  try{
    console.log(req.body.poid);
    dbo = client.db("Pintrace")
    var query= {_id:new mongo.ObjectID(req.body.poid)}
    dbo.collection('Order_master').findOne(query, function(err, doc) {
      if (err){
          throw err
          res.send("error")
      } 
      if(!doc){
          res.send("invalid query")
          console.log("invalid query")
      }
      else{
          let result = doc
          res.status(200).send(result)
      }
      dbo.close
    })
  }
  catch(err){
    res.status(500).send({msg:'Failed to fetch data'})
    console.log(err)
  }
})

app.post('/getfg',(req,res) => {
  try{

    dbo = client.db("Pintrace")
    var query= {productid:req.body.productid}
    dbo.collection('Product_inventory').findOne(query, function(err, doc) {
      if (err){
          throw err
          res.send("error")
      } 
      if(!doc){
          res.send("invalid query")
          console.log("invalid query")
      }
      else{
          let result = doc
          res.status(200).send(result)
      }
      dbo.close
    })
  }
  catch(err){
    res.status(500).send({msg:'Failed to fetch data'})
    console.log(err)
  }
})

app.get('/supplierdashboardtable', verifySupplierToken, (req, res) => {
  try{
    dbo = client.db("Pintrace")
    var header=(req.headers.authorization.toString());
    var headerArray= header.split(' ')
    let payload = jwt.verify(headerArray[1], 'secretKey')
    dbo.collection("Order_master").find({supplier:payload.org.toString()}).toArray( (err,resp) => {
      if(err) throw err
      if(_.isEmpty(resp)) throw err
      res.status(200).send(resp)
    })
  }
  catch(err){
    res.status(500).send({msg:'Failed to fetch data'})
    console.log(err)
  }
})

app.post('/createpackage', verifySupplierToken, (req, res) => {
  try{
    dbo = client.db("Pintrace")
    partList = req.body.partList
    for(let items in partList){
      for(let i=0; i<partList[items].quantity; i++){
        dbo.collection("Supplier_inventory").updateOne({$and: [{part:{ $eq: partList[items].partname }}, {available:{ $eq: true }}]}, { $set: {poid: req.body.poid, available: false} }, function(err, doc) {
          if (err){
              throw err
          } 
          if(!doc){
              res.send("invalid query")
              console.log("invalid query")
          }
          else{

          } 
        })
      }
    }
    var query= {_id:new mongo.ObjectID(req.body.poid)}
    dbo.collection("Order_master").updateOne(query, { $set: {status: 'packed'}}), function(err,doc){
      if (err){
        throw err
      } 
      if(!doc){
        res.send("invalid query")
        console.log("invalid query")
      }
      else{
        console.log("package created")
      }
    }
    dbo.close
    res.status(200).send({msg:'Package created'})
  }
  catch(err){
    res.status(500).send({msg:'Failed to find availabe parts'})
    console.log(err)
  }
})

app.post('/createshipment', verifySupplierToken, (req, res) => {
  try{
    dbo = client.db("Pintrace")
    var query= {_id:new mongo.ObjectID(req.body.poid)}
    dbo.collection("Order_master").updateOne(query, { $set: {status: 'shipped'}}), function(err,doc){
      if (err){
        throw err
      } 
      if(!doc){
        res.send("invalid query")
        console.log("invalid query")
      }
    }
    res.status(200).send({msg:'Package shipped'})
    dbo.close

  }
  catch(err){
    res.status(500).send({msg:'Shipment failed'})
    console.log(err)
  }
})

app.post('/getpins', (req, res) => {
  try{
    dbo = client.db("Pintrace")
    var query= {poid: req.body.poid}
    dbo.collection("Supplier_inventory").find(query).toArray( (err,resp) => {
      if(err) throw err
      if(_.isEmpty(resp)) throw err
      res.status(200).send(resp)
    })
    dbo.close
  }
  catch(err){
    res.status(500).send({msg:'Shipment failed'})
    console.log(err)
  }
})

app.post('/confirmdelivery', (req,res) => {
  try{
    var date = new Date().toISOString().split('T')[0];
    dbo = client.db("Pintrace")
    var query= {poid: req.body.poid}
    dbo.collection("Supplier_inventory").find(query).toArray( (err,resp) => {
      if(err) throw err
      if(_.isEmpty(resp)) throw err
      for(let items in resp){
        console.log(resp[items]);
        dbo.collection("Manufacturer_part_inventory").insertOne(resp[items], function(err,doc){
          if (err){
            throw err
          } 
          if(!doc){
            res.send("invalid query")
            console.log("invalid query")
          }
          else {
            console.log("part transferred")
            dbo.collection("Manufacturer_part_inventory").updateOne({$and: [{poid:{ $eq:resp[items].poid }}, {part:{ $eq:resp[items].part }}]}, 
              { $set: {available: true}}), function(err,doc){
              if (err){
                throw err
              } 
              if(!doc){
                res.send("invalid query")
                console.log("invalid query")
              }
            }
          }
        })
      }
      dbo.collection("Order_master").updateOne({_id:new mongo.ObjectID(req.body.poid)}, 
      { $set: {status: 'delivered', deliverdate: date}}), function(err,doc){
        if (err){
          throw err
        } 
        if(!doc){
          res.send("invalid query")
          console.log("invalid query")
        }
      }
    })
    dbo.close
    res.status(200).send({msg:'Shipment delivered'})
  }
  catch(err){
    res.status(500).send({msg:'Shipment failed'})
    console.log(err)
  }
})

app.get('/getproductcode', verifyManufacturerToken, (req,res) => {
  dbo = client.db("Pintrace")
  dbo.collection('Product_template').find({}).toArray( (err,resp) => {
    if(err) throw err
    if(_.isEmpty(resp)) throw err
    payload=[]
    for(let templates of resp){
      payload.push(templates.productcode)
    }
    res.status(200).send(payload)
  })
})

app.post('/getproducttemplate', verifyManufacturerToken, (req, res) => {
  dbo = client.db("Pintrace")
  var query = req.body
  dbo.collection('Product_template').findOne(query, function(err, result) {
      if (err){
          throw err
          res.send("error")
      } 
      if(!result){
          res.send("invalid query")
          console.log("invalid query")
      }
      else{
          res.send(result)
      }
      dbo.close
    });

})

app.post('/createfg', verifyManufacturerToken, (req,res) => {
    var productId= uuidv4();

    let createProductPromise = new Promise((resolve,reject) => {
      if(createProduct(req.body, productId)){
        console.log(productId)
        resolve('promise resolved')
      }
      else reject('promise rejected')
    })

    let addPartPromise = new Promise((resolve,reject) => {
      if(addParts(req.body, productId)){
        console.log(productId)
        resolve('promise resolved')
      }
      else reject('promise rejected')
    })

    createProductPromise.then(
      (msg) => {
        console.log(msg)
        addPartPromise.then(
          (msg) => {
            console.log(msg)
            res.status(200).send({msg:"FG created"})
          }
        ).catch((message) => { 
          console.log(message);
        });
      }
    ).catch((message) => { 
      console.log(message);
    });
})

function createProduct(payload, productId){
  dbo = client.db("Pintrace")
  delete payload._id
  payload.productid = productId
  var date = new Date().toISOString().split('T')[0];
  payload.manufacturedate = date
  console.log(payload)
  dbo.collection("Product_inventory").insertOne(payload, function(err, resp) {
    if (err) throw err;
    else console.log("1 document inserted");
    dbo.close
  });
  return true
}

function addParts(payload, productId){
  dbo = client.db("Pintrace")
  for(let part of payload.partList){
    for(let qty=0; qty<part.quantity; qty++){
      dbo.collection("Manufacturer_part_inventory").updateOne(
        {$and: [{part:{ $eq: part.part }}, {available:{ $eq: true }}]}, 
        { $set: {productid: productId, available: false}}, 
        function(err, res) {
        if (err) throw err
        else console.log("doc updated")
      })
    }
  }
  dbo.close
  return true
}



// function addParts(){

//   data={
//     part:'battery',
//     dimension:"10cm x 7cm x 0.5cm",
//     weight:"100gm",
//     available:true
//   }
//   for(let i=0; i<10;i++){
//     dbo = client.db("Pintrace")
//     dbo.collection("Supplier_inventory").insertOne(data, function(err, resp) {
//       if (err){
//         throw err;
//       }
//       else{
//         console.log("1 document inserted");
//       }
//       dbo.close
//     });
//   }

// }

// function resetParts(){
//   dbo = client.db("Pintrace")
//   dbo.collection("Supplier_inventory").updateMany({$and: [{part:{ $eq: 'display' }}, {available:{ $eq: false }}]}, { $set: {poid: '', available: true} }, function(err, doc) {
//     if (err){
//         throw err
//     } 
//     if(!doc){
//         res.send("invalid query")
//         console.log("invalid query")
//     }
//     else{
//         console.log("part reset")
//     } 
//   })
//   dbo.close
// }

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
