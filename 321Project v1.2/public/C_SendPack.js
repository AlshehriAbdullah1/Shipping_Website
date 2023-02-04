console.log("we got it!!!!!!  ! ")
const button = document.getElementById("send123");

button.addEventListener("click", trigger)
function trigger() {
    
    const weightT = document.getElementById("name-d0f3");
    const widthT = document.getElementById("email-3b9a");
    const heighT = document.getElementById("name-7143");
    const lengthT = document.getElementById("name-3b9a");
    const categoryT = document.getElementById("category");
    const sourceT  = document.getElementById('Source') ;
    const destinationT = document.getElementById("Destination");
    const ReciveremailT= document.getElementById('ReciverEmail');
    //console.log('is '+categoryT.options[categoryT.selectedIndex].text)
  //  console.log(weightT.value)

  //  let s =`${weight} - ${width} - ${length} - ${heigh} - ${category} - ${destination}`
  //  console.log(`printing ${weight} - ${width} - ${length} - ${heigh} - ${category} - ${destination}`)
        if(weightT.value !="" && widthT.value !="" && lengthT.value !="" && heighT.value !="" && categoryT.options[categoryT.selectedIndex].text !="" && destinationT.options[destinationT.selectedIndex].text !=""   ){
            let url=window.location.href.substring(0,21)+'/Cadd_package';
        console.log(url);
        p = new Promise((resolve)=>{
            console.log('is: '+weightT.value)
            let obj={weight:weightT.value,width:widthT.value,heigh:heighT.value,length:lengthT.value,category:categoryT.value,destination:destinationT.value,source:sourceT.value,RecEmail:ReciveremailT.value};
              resolve(obj);
          });
          p.then((msg)=>{
             console.log('nsg is '+msg)
  const options = {
          method: 'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(msg),
        };
        
    
        fetch(url, options);
          });
       
      
        
    }
    
      }