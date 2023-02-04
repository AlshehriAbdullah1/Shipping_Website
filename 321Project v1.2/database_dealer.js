


const sqlite =  require('aa-sqlite');
//add('Customer',['CustomerID','Name','Number','notification_ID'],['2','ABDULLAH','05124325678','2']);
//remove('Customer','CustomerID','1');
//update('Customer','CustomerID',2,'Name','SULTAN');
//retrieve('Customer','Number','0599999999',false);
//let rowss = retrieve('Customer','Number','05124325678',false);



    
    async function update(table_name, primarykey, pkValue , attribute,newValue){
        const sqlite =  require('aa-sqlite');

        try {
            await sqlite.open('./ProjectP2.db');
          await console.log("Connected to db! ");
        sql =  `UPDATE ${table_name} SET ${attribute} = "${newValue}" WHERE ${primarykey} = "${pkValue}"` ;
        console.log(sql);
       await  sqlite.all(sql);
    
        await sqlite.close();   
        } catch (error) {
            console.log('UPDATING FAILED!');
        }
       console.log("db closed! ");
      
           
    }
    async function add(table_name,Attributes, VALUES){ 
        const sqlite =  require('aa-sqlite');

      
        try {
            var length = await Attributes.length;
           
            await sqlite.open('./ProjectP2.db');
            await console.log("Connected to db! ");
            sql = await 'INSERT INTO '+table_name+' ('; 
            await  console.log('the sql is '+sql)
             for(let i = 0 ; i<length;i++){
                 sql=await sql+Attributes[i]+','; 
               
            }
            sql = await sql.substring(0,sql.length-1);
            await console.log('the sql2 is '+sql)
            sql = await sql+')'+ ' VALUES ('
             for(let i = 0;i<length;i++){
                sql=await sql+'"'+VALUES[i]+'",'; 
               
            }
            sql = await sql.substring(0,sql.length-1);
            
            sql=await sql+')';
            await console.log('the sql3 is '+sql)
            await sqlite.run(sql,(err)=>{
            if(err)console.error(err);
          });
      
        } catch (error) {
            console.error(error);
            console.log('ADDING FAILED!')
        }
       await  sqlite.close();
    }

async function remove(table_name , primarykey,pkValue ){
    const sqlite =  require('aa-sqlite');

    try {
        await sqlite.open('./ProjectP2.db');
    console.log("Connected to db! ");
    sql = `DELETE FROM ${table_name} WHERE ${primarykey} = "${pkValue}"` ; 
     await sqlite.all(sql);
    console.log("done!");
    await sqlite.close();
    } catch (error) {
        console.log('REMOVING FAILED!')
    }
    
    console.log("db closed");

}



async function retrieve(table_name,Attributes,conditions){
    // attributes is a list 
    //c is a list too 
    // the length of c and attributes should match
   
    const sqlite = require('aa-sqlite');
    try {
    await sqlite.open('./ProjectP2.db');
    console.log("Connected to db! ");   
   
   
    
    sql = `SELECT * FROM ${table_name} WHERE ${Attributes[0]} = "${conditions[0]}"`;
    for(let i = 1 ; i<Attributes.length;i++){
        sql = `${sql} AND ${Attributes[i]} = "${conditions[i]}"`;
     }

    
    const rows=  await sqlite.all(sql);
    //await console.log(rows);
    await sqlite.close();
    return rows;
    } catch (error) {
        return [];
    }
    

}

async function checkemail(email){
    const sqlite = require('aa-sqlite');

    await sqlite.open('./ProjectP2.db');

    console.log('Connected to the SQlite database.');


    
    sql = 'SELECT email FROM Customer where email ="'+email+'"';
    const rows1 = await sqlite.all(sql)

console.log(rows1)

    sql1 = 'SELECT email FROM Employee where email ="'+email+'"';
    const rows2 = await sqlite.all(sql1)
    console.log(rows2)

    await sqlite.close();
    if(rows1.length==0 && rows2.length==0){return true;}
    else {return false;}

    }


async function addCustomer(username,phone,password,email){
    const sqlite = require('aa-sqlite');
    await sqlite.open('./ProjectP2.db');

    console.log('Connected to the SQlite database.');
    await sqlite.run("INSERT INTO Customer(Name,Number,password,email) VALUES('"+username+"','"+phone+"','"+ password+"','"+email+"')")
    await sqlite.close();
}

async function checkpassword(email,password){
    const sqlite = require('aa-sqlite');

    await sqlite.open('./ProjectP2.db');

    console.log('Connected to the SQlite database.');


    
    sql = 'SELECT email, password FROM Customer where email ="'+email+'" AND password ="'+password+'"';
    const rows1 = await sqlite.all(sql)

    sql = 'SELECT email, password FROM Employee where email ="'+email+'" AND password ="'+password+'"';
    const rows2 = await sqlite.all(sql)

let cond1;
let cond2;
    await sqlite.close();
    if(!rows1.length==0){return 1;} //if customer return 1

    else if(!rows2.length==0){return 2;}// if employee return 2
    else{return 0;}
    }


    async function getinfo(type,email){
        const sqlite = require('aa-sqlite');
    
        await sqlite.open('./ProjectP2.db');
    
        console.log('Connected to the SQlite database.');
    
    
        
        sql = 'SELECT * FROM"' +type+ '"where email ="'+email+'"';
        const rows1 = await sqlite.all(sql)

        await sqlite.close();
        return rows1[0];

    }



    async function checkpassword(email,password){
        const sqlite = require('aa-sqlite');
    
        await sqlite.open('./ProjectP2.db');
    
        console.log('Connected to the SQlite database.');
    
    
        
        sql = 'SELECT email, password FROM Customer where email ="'+email+'" AND password ="'+password+'"';
        const rows1 = await sqlite.all(sql)
    
        sql = 'SELECT email, password FROM Employee where email ="'+email+'" AND password ="'+password+'"';
        const rows2 = await sqlite.all(sql)
    
    let cond1;
    let cond2;
        await sqlite.close();
        if(!rows1.length==0){return 1;} //if customer return 1
    
        else if(!rows2.length==0){return 2;}// if employee return 2
        else{return 0;}
        }
    
    
        async function getGenInfo(type,rule,email){
            const sqlite = require('aa-sqlite');
        
            await sqlite.open('./ProjectP2.db');
        
            console.log('Connected to the SQlite database.');
        
        
            
            sql = 'SELECT * FROM"' +type+ '"where"' +rule+ '"="'+email+'"';
            const rows1 = await sqlite.all(sql)
    
            await sqlite.close();
            return rows1[0];
    
        }





        async function GetBeenTo(type,rule,email){
            const sqlite = require('aa-sqlite');
        
            await sqlite.open('./ProjectP2.db');
        
            console.log('Connected to the SQlite database.');
        
        
            
            sql = 'SELECT * FROM"' +type+ '"where"' +rule+ '"="'+email+'"';
            const rows1 = await sqlite.all(sql)
    
            await sqlite.close();

            return rows1;
    
        }

    


        async function getPKGID(){
            const sqlite = require('aa-sqlite');
        
            await sqlite.open('./ProjectP2.db'); 
            sql = 'SELECT MAX(PackageNum) FROM Package' 
            const rows = await sqlite.all(sql)
            await sqlite.close()
            return rows;
        }
        
        async function Track(shipmentN, CostumerN){
            const sqlite = require('aa-sqlite'); 
            try {
                await sqlite.open('./ProjectP2.db');
                sql = `SELECT PackageNum FROM Send WHERE SendID="${CostumerN}" and PackageNum= "${shipmentN}"`;
                r = await sqlite.all(sql)
                console.log(r)
                await sqlite.close();
            } catch (error) {
                
            }
        
        }




        async function getPushed(sql){
            const sqlite =  await require('aa-sqlite');
            await sqlite.open('./ProjectP2.db');
            rows= await sqlite.all(sql);

             //console.log("you are in get pushed ! ")
           //  console.log(rows)
            return rows;
        }

        async function getNotPiad(CostumerID){
           let lastarr = [] 
            sql2 =`SELECT PackageNum FROM Send WHERE SendID="${CostumerID}"`
            const sqlite =  require('aa-sqlite');
            try {
                await sqlite.open('./ProjectP2.db');

               rows= await sqlite.all(sql2);
               await sqlite.close()
               console.log("done! : ")

           await Promise.all(rows.map(async(element) => {
                sql =await `SELECT * FROM Package WHERE Paid="Not Paid" AND PackageNum ="${element.PackageNum}"`
               elm= await getPushed(sql)
              //  console.log(elm[0])
               await lastarr.push( elm[0])
            }));

              await   console.log("awway is ")
               await console.log(lastarr)
               return lastarr
            } catch (error) {
                console.log('Getting not paid failed! ')
                return []
            }

         }






async function betweenDatestrans(from,to){

const sqlite = require('aa-sqlite');
await sqlite.open('./ProjectP2.db');
sql = "Select * From Package where  lastEdited > date('"+from+"') and  lastEdited < date('"+to+"')  "
const rows = await sqlite.all(sql)
return rows;}

//and Status <> 'In transit'

 //  rowss =  add('Customer',['Name','Number','password','email'],['abdullah','+966597560020','123456','asim4ever11@gmail.com']);
// p = new Promise((resolve)=>{
//     rowss =  getinfo('Employee','sb@kfupm.com');
//     resolve(rowss);
// });
// p.then((message)=>{
//     console.log(message);
// });


//update('Package','PackageNum',31,'sendDate','2022-12-16')

module.exports = {add,remove,update,retrieve,addCustomer,checkemail,checkpassword,getinfo,getGenInfo,GetBeenTo,Track,getPKGID,getNotPiad,getPushed,betweenDatestrans };
