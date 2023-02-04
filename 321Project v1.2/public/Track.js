const button = document.getElementById("track123");
button.addEventListener("click",getShipment);
console.log("in  !")
function getShipment() {
    const shipmentN = document.getElementById("shipment");
    if(shipmentN.value !=""){
        let url=window.location.href.substring(0,21)+'Track-Shipment'
        p = new Promise((resolve)=>{
            console.log('is: '+weightT.value)
            let obj={pkgN: shipmentN.value};
              resolve(obj);
          });
          p.then((msg)=>{

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