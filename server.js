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
    res.send(result.recordsets)
    })

app.post('/update', async(req,res)=>{
    await dbOperation.updateClosedLoans(req.body);
    const result= await dbOperation.getClosedLoans()
    res.send(result.recordsets)
})

app.listen(API_PORT,()=>console.log(`listening on port ${API_PORT}`))
