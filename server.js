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

// dbOperation.getClosedLoans(125131,'069896-094316').then(res=>{
//     console.log(res);
    
// })

app.listen(API_PORT,()=>console.log(`listening on port ${API_PORT}`))
