const config = require('./dbConfig');
sql =require('mssql');

const getClosedLoans=async (personalNo,agreementNo)=>{
    try {
        let pool = await sql.connect(config);
        let closedLoans = pool.request().query(`SELECT LoanId,ClientFullName,PersonalNo,AgreementNo,StartDate,CloseDate,ApplicationDept,Status,packN,boxN,toggleSelected FROM [CrystalDB].[dbo].[vClosedLoans] where PersonalNo='${personalNo}' or AgreementNo='${agreementNo}'`)
        console.log(closedLoans);
        return closedLoans
    } catch(error) {
        console.log(error);
        
    }

}

const getChangedStatus=async ()=>{
    try {
        let pool = await sql.connect(config);
        let changedStatus = pool.request().query("SELECT LoanId FROM [CrystalDB].[dbo].[vClosedLoans] where Status!=' '")
        console.log(changedStatus);
        return changedStatus
    } catch(error) {
        console.log(error);
        
    }

}
//packnCount
const getPackNCount=async (packN)=>{
    console.log("packN ", packN);
    try {
        let pool = await sql.connect(config);
        let PackNCount = pool.request().query(`SELECT LoanId FROM [CrystalDB].[dbo].[vClosedLoans] where packN='${packN}'`)
        console.log(PackNCount);
        return PackNCount
    } catch(error) {
        console.log(error);
        
    }

}

// const updateClosedLoans=async (loan)=>{ 
//         try {
//             let pool = await sql.connect(config);
//             let closedLoansk =await pool.request().query(`UPDATE [CrystalDB].[dbo].[KEEPER_ClosedLoans] SET [Status] = N'${loan.Status  || ''}',[packN]='${loan.packN  || ''}' ,[boxN]='${loan.boxN || ''}' WHERE LoanId=${loan.LoanId}`)
//             let closedLoansL =await pool.request().query(`UPDATE [CrystalDB].[dbo].[LMS_ClosedLoans] SET [Status] = N'${loan.Status  || ''}',[packN]='${loan.packN  || ''}' ,[boxN]='${loan.boxN || ''}' WHERE LoanId=${loan.LoanId}`)
//          return closedLoansk , closedLoansL
//         } catch(error) {
//             console.log('err ',error); 
//     }
   
// }

const updateClosedLoans = async (loan) => {
    try {
        let pool = await sql.connect(config);

        let queryK = `
            UPDATE [CrystalDB].[dbo].[KEEPER_ClosedLoans]
            SET [Status] = @status, [packN] = @packN, [boxN] = @boxN
            WHERE LoanId = @loanId
        `;
        
        let queryL = `
            UPDATE [CrystalDB].[dbo].[LMS_ClosedLoans]
            SET [Status] = @status, [packN] = @packN, [boxN] = @boxN
            WHERE LoanId = @loanId
        `;

        let request = pool.request();
        request.input('status', sql.NVarChar, loan.Status || '');
        request.input('packN', sql.NVarChar, loan.packN || '');
        request.input('boxN', sql.NVarChar, loan.boxN || '');
        request.input('loanId', sql.Int, loan.LoanId);

        let closedLoansk = await request.query(queryK);
        let closedLoansL = await request.query(queryL);
        
        return closedLoansk, closedLoansL;
    } catch (error) {
        console.log('err ', error);
    }
}





module.exports={
    getClosedLoans,
    getChangedStatus,
    getPackNCount,
    updateClosedLoans
}