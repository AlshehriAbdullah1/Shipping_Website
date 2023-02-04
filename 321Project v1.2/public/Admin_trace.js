
const getbutton= document.getElementById('the Button');
const holder= document.getElementById('theholder');
const table= document.getElementById('mytable');

getbutton.addEventListener("click", getlist)

function getlist(){
    let url=window.location.href.substring(0,22)+'Admin_Trace_package/'+holder.value
    if(!holder.value==''){

        const options ={
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            }
          };

          
    fetch(url,options).then(res => res.json()).then(data => {console.log(data)
    
        let package=data.package;
        let beento=data.beento;
beento.reverse();



let place=[ 'AirPort', 'AirPort', 'AirPort', 'WareHouse', 'WareHouse',  'WareHouse',  'Plane',  'Plane', 'Plane','Truck',  'Truck','Truck']
let city=['Dammam','Riyadh','Jeddah', 'Riyadh', 'Jeddah','Dammam','Riyadh','Jeddah','Dammam','Riyadh','Jeddah','Dammam']

console.log(beento)
table.innerHTML='';

        beento.forEach(element => {
 table.innerHTML=  table.innerHTML+ '<tr style="height: 44px">   <td class="u-border-1 u-border-grey-30 u-table-cell">'+package.Status +'</td> <td class="u-border-1 u-border-grey-30 u-table-cell">'+ package.lastEdited +'</td> <td class="u-border-1 u-border-grey-30 u-table-cell"> '+city[element.ID-1]+'-'+place[element.ID-1]+' </td> <td class="u-border-1 u-border-grey-30 u-table-cell">'+element.Date+' </td></tr>';


console.log(element.ID)

        });


    
    
    
    
    
    
    })
    
    



















     }
}