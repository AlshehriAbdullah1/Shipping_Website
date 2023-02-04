const firstFrom=document.getElementById('date-8665');
const firstTo=document.getElementById('date-40d3');
const secondFrom=document.getElementById('date-86651');
const secondTo=document.getElementById('date-40d31');




const firstsearch= document.getElementById('firstsearch');
firstsearch.addEventListener("click", firsttable)
const table1= document.getElementById('table1');

function firsttable(){
    let url=window.location.href.substring(0,21)+'/Adminreportfirstsearch';
console.log(secondTo.value)
    
let from =firstFrom.value
let To =firstTo.value

const options ={
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({from:from,to:To})
  };
  try {
    fetch(url,options).then(res => res.json()).then(data => {
        table1.innerHTML=''
        console.log(data);
data.forEach(element => {

    const date = new Date(element.sendDate);

    date.setDate(date.getDate() + 7);
let newdate=''+date.toISOString().slice(0, 10)

console.log(newdate)
    table1.innerHTML=table1.innerHTML+      '  <tr style="height: 49px;"><td class="u-border-1 u-border-grey-30 u-table-cell">'+element.PackageNum+'</td><td class="u-border-1 u-border-grey-30 u-table-cell">'+newdate+'</td><td class="u-border-1 u-border-grey-30 u-table-cell">'+element.Destination+'</td> <td class="u-border-1 u-border-grey-30 u-table-cell">'+element.Paid+'</td> <td class="u-border-1 u-border-grey-30 u-table-cell">'+element.Status+'</td> </tr>'
    
});


    })

  } catch (error) {
    
  }






}


const secondsearch= document.getElementById('secondsearch');
secondsearch.addEventListener("click", secondtable)


function secondtable(){
    console.log(firstFrom.value)
    console.log(secondFrom.value)
    console.log(firstTo.value)
    console.log(secondTo.value)


}





const thirdsearch= document.getElementById('thirdsearch');

thirdsearch.addEventListener("click", thirdtable)


function thirdtable(){
    console.log(3)

}



const fourthsearch= document.getElementById('fourthsearch');

fourthsearch.addEventListener("click", fourthtable)


function fourthtable(){
console.log(4)
}







