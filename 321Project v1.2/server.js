const express=require("express");
const path=require("path");
const nunjucks=require("nunjucks");
const app=express();
const cookieParser=require('cookie-parser');
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));

app.set("view engine", "html")


app.use(cookieParser())
app.use(express.urlencoded({extended:false}));

const mymodule=require('./database_dealer.js');
const { resolve } = require("path");
const { sign } = require("crypto");
app.use(express.json());
app.listen(3000);



nunjucks.configure(path.resolve(__dirname,'views'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true

});
let temp
let p;


app.get('/',(req,res) =>{

    res.render('index.html');
    
})



app.post('/sign-up',async(req,res) =>{
    let x=req.body
    let cond=true;
             //   mymodule.addCustomer(x.username,x.phone,x.password,x.email);

    p =new Promise((resolve) => {
       cond= mymodule.checkemail(x.email)

        resolve(cond)

           });
           
           p.then((mes) =>{
            if(mes){
                
                mymodule.addCustomer(x.username,x.phone,x.password,x.email);
       //         res.render('sign-in.html');
       res.redirect('/sign-in')

            }
            else{
                res.redirect('/sign-up')
            }
        })    
})


app.get('/sign-up',(req,res) =>{

    
 
    res.render('sign-up.html');
    
    
    })

    app.post('/sign-in',(req,res) =>{
                
        let x=req.body;
         console.log(x);  

         p = new Promise((resolve)=>{
          let  rowss = mymodule.checkpassword(x.email,x.password);
       resolve(rowss);
       });
         p.then((message)=>{



            if(message==0){res.redirect('/sign-in')
                                           }
             if(message==1){ 

                 p1 = new Promise((resolve)=>{
                 rowss = mymodule.getinfo('Customer',x.email);
  
                  resolve(rowss);
                                        }); 
                 p1.then((message)=>{ 
                console.log("then entered! ")
                 console.log(message)
                 res.cookie('Customer_ID',message.CustomerID); 
                 console.log(message.CustomerID)
                 res.cookie('type','Customer');
     
                res.cookie('Name',message.Name);
               console.log(message.Name)
              res.cookie('password',message.password);
              res.cookie('email',x.email); 
              res.cookie('phone',message.Number)
      
             res.redirect('/C_home');
           });
               }
     if(message==2){

           p1 = new Promise((resolve)=>{
                rowss = mymodule.getinfo('Employee',x.email);
                resolve(rowss);
               });
            p1.then((message)=>{
            console.log(message)

             res.cookie('Emp_ID',message.ID);
            res.cookie('type','employee');
           res.cookie('Name',message.Name);
            res.cookie('password',message.password);
            res.cookie('email',x.email);
           res.cookie('phone',x.Number)
             res.redirect('/E_home');

                           });  


        }//msg = 2 




});
})

app.get('/sign-in',(req,res) =>{

    res.render('sign-in.html');
    
    })


app.get('/contactus',(req,res) =>{


res.render('contactus.html');


})






app.get('/C_home',(req,res)=>{
    console.log(req.cookies);
    res.render('Costumer-Log-in.html',{name:req.cookies.Name});
});





app.get('/costumer_logout',(req,res)=>{
    res.clearCookie('Name');
    res.clearCookie('password');
    res.clearCookie('Customer_ID');
    res.clearCookie('type');
    res.clearCookie('email');
    res.clearCookie('phone');
    res.clearCookie('Emp_ID');
    res.redirect('/')
})


app.post('/Cadd_package',async (req,res)=> {
    console.log(''+new Date().toISOString().slice(0, 10))
    data= req.body
   
    console.log(req.cookies);
    rows= [data.source,'In transit',data.weight,data.heigh,data.length,data.width,''+new Date().toISOString().slice(0, 10),data.category,data.destination,''+new Date().toISOString().slice(0, 10)];
  await mymodule.add('Package',['Location','Status','Weight','Height','Length','Width','sendDate','Category','Destination','lastEdited'],rows)
    mymodule.getPKGID().then(async res => {r=await res[0] ;
        await mymodule.add('Send',['PackageNum','SendID','ReceiveID'],[r['MAX(PackageNum)'],req.cookies.Customer_ID,data.RecEmail])
         
        })
  
} )



app.post('Track-Shipment',(req,res)=>{
    data = req.body; 
    costumer = req.cookies.Customer_ID
    console.log(data)
  //  mymodule.Track() ;
})



    app.get('/Payment',(req,res)=>{
        res.render('Payment.html')
    }) 
    
    
    app.get('/Track-Package',(req,res)=>{
            res.render('Track-Package-.html',{name:req.cookies.Name});
    })
    
    
    app.get('/Send-Pack',(req,res)=>{
        res.render('Send-Package.html');
    })
    
    
    app.get('/Recieve-Pack',(req,res)=>{
       // res.render() waiting for that page 
    })
    
    
    app.get('/Update-Personal-Information',(req,res)=>{
        res.render('Update-Personal-Information.html',{name:req.cookies.Name,email:req.cookies.email,phone:req.cookies.phone,pass:req.cookies.password
                                                        })
    })
















    app.get('/AdminAddPackage',(req,res) =>{


        res.render('Add-Package(Adminstrator).html');
        
        
        })



    app.post('/Eadd_package',(req,res)=> {
        console.log(''+new Date().toISOString().slice(0, 10))
        data= req.body
        console.log(data);
        rows= [data.source,'In transit',data.weight,data.heigh,data.length,data.width,''+new Date().toISOString().slice(0, 10),data.category,data.destination]
        mymodule.add('Package',['Location','Status','Weight','Height','Length','Width','sendDate','Category','Destination'],rows)
        console.log("server !");
        console.log(req.body) 
    } )




app.get('/Admin_Trace_package',(req,res) =>{

       
    res.render('Admin-Track-Package-.html',{name:req.cookies.Name});
    
    
    })
app.post('/Admin_Trace_package/:pkgnum',(req,res)=>{

let x=req.params.pkgnum;

let pkg
let BeenTo

mymodule.getGenInfo('Package','PackageNum',x).then(message=>  pkg=message ).then(message=>mymodule.GetBeenTo('BeenTo','PackageNum',x) ).then(ress =>res.send({package:pkg,beento:ress}))

})





app.get('/E_home',(req,res) =>{ 


    
    res.render('Adminstrator.html',{name:req.cookies.Name})
     })



app.get('/AdminRemoveEdit',(req,res) =>{


    res.render('Remove(edit)packages.html');
    
    
})


 app.get('/AdminEditUser',(req,res) =>{

    res.render('AdminUpdate-Personal-Information.html',{name:req.cookies.Name});
        
        
 })

 app.post('/AdminEditUser',(req,res) =>{
    let x =req.body;



    mymodule.update('Customer','email',x.email,'Name',x.Name)
    .then(res => mymodule.update('Customer','email',x.email,'Number',x.Number))
    .then(res => mymodule.update('Customer','email',x.email,'password',x.password))

    .then(res.redirect('/E_home'))

 })

   
 app.post('/AdmingetUser/:email',(req,res) =>{
   let x=req.params
    p = new Promise((resolve)=>{
   let   rowss =  mymodule.getinfo('Customer',x.email);
     resolve(rowss);
});
 p.then((message)=>{
if(message==undefined) {res.send(
    {
        CustomerID: 0,
        Name: '',
        Number: '',
        password: '',
        email: ''
      })}
   else{     res.send(message);}

});

 

 
        
 })

 app.post('/AdminEDeletUser/:email',(req,res) =>{
    console.log('deleted')
mymodule.remove('Customer','email',req.params.email)        
 })

app.get('/Admin-AddEmployee',(req,res) =>{
    res.render('AddEmployee.html')
      
 })

 app.post('/Admin-AddEmployee',(req,res) =>{
    x=req.body;
    console.log(x)
    mymodule.getinfo('Employee',x.email).then(ress =>{
        if (typeof(ress)!= "undefined")res.redirect('/E_home');
        else{
            mymodule.add('Employee',['Name','JobType','password','email','City'],[x.username,x.JobType,x.password,x.email,x.City]);
         res.redirect('/E_home');
        }
    } )

      
 })

 app.get('/Admin_report',(req,res)=>{


 res.render('AdminRepoorts.html')
 })



app.post('/Adminreportfirstsearch',(req,res)=>{
console.log(req.body)

 p = new Promise((resolve)=>{
    rowss =  mymodule.betweenDatestrans(req.body.from,req.body.to);
     resolve(rowss);
 });
 p.then((message)=>{
    res.send(message)
 });


})





 





    























