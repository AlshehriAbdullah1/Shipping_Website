console.log('we got it');


const getbutton= document.getElementById('get email');
getbutton.addEventListener("click", getemail)
const emailholder=document.getElementById('email-d08d');
const nameholder=document.getElementById('name-3b9a');
const phoneholder=document.getElementById('phone-725f');
const passwordholder=document.getElementById('name-5d56');

function getemail(){


  if(!emailholder.value==''){
    let url=window.location.href.substring(0,21)+'/AdmingetUser/'+emailholder.value;


    const options ={
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        }
      };
      try {
        fetch(url,options).then(res => res.json()).then(data => {console.log(data)
        
          nameholder.value=data.Name;
         phoneholder.value=data.Number;
          passwordholder.value=data.password;
     })
      } catch (error) {
        
      }
    }

        
}

const deletebutton= document.getElementById('delete email');
deletebutton.addEventListener("click", deleteemail)


function deleteemail(){
  let url=window.location.href.substring(0,21)+'/AdminEDeletUser/'+emailholder.value;
  console.log('entered the deletion',url)

  const options ={
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    }
  };


  fetch(url,options);
document.getElementById('email-d08d').value='';
document.getElementById('name-3b9a').value='';
document.getElementById('phone-725f').value='';
document.getElementById('name-5d56').value='';
  
}






const editbutton= document.getElementById('update button');
editbutton.addEventListener("click", editCustomer)





function editCustomer(){


  if(!emailholder.value==''){
    let url=window.location.href.substring(0,21)+'/AdminEditUser';
p = new Promise((resolve)=>{
  let obj={Name:nameholder.value,Number:phoneholder.value,password:passwordholder.value,email:emailholder.value};
    resolve(obj);
});
p.then((message)=>{
    console.log(message);

    const options ={
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(message)
    };
    
     fetch(url,options)



});
      



    

        
}}