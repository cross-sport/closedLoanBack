const express=require('express'),
dbOperation=require('./dbFile/dbOperation'),
cors=require('cors')

const API_PORT=process.env.PORT || 5000;
const app=express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


app.get('/api', async (req,res)=>{
    console.log("requestLog  ", req);
    const result= await dbOperation.getClosedLoans(req.query.personalNo,req.query.agreementNo)
    delete require.cache[require.resolve('./server')];
    res.send(result.recordsets)
    })

app.get('/count', async (req,res)=>{
    const result= await dbOperation.getChangedStatus();
    delete require.cache[require.resolve('./server')];
    console.log(result);
    res.send(result.rowsAffected)
    })    

    app.get('/packN', async (req,res)=>{
        const result= await dbOperation.getPackNCount(req.query.packN);
        delete require.cache[require.resolve('./server')];
        console.log(result);
        res.send(result.rowsAffected)
        })    

app.post('/update', async (req, res) => {
    try {
      console.log(req.body);
  
      // Perform your database operation
      await dbOperation.updateClosedLoans(req.body);
  
      // Send a successful response with a status of 200
      res.status(200).send({ message: 'Update successful' });
    } catch (error) {
      // Handle any errors that occur during the database operation
      console.error('Error updating closed loans:', error);
  
      // Send an error response with a status of 500
      res.status(500).send({ error: 'An error occurred during update' });
    }
  });

app.listen(API_PORT,()=>console.log(`listening on port ${API_PORT}`))
