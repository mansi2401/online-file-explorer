//loop thru children of tbody
const children=$('tbody').children();
//convert to arr;
let child_arr=[];
for(let i=0;i<children.length;i++){
    child_arr.push(children[i]);
}
//arf of object
const items=[];
child_arr.forEach(element=>{
    const rowdetails ={
        name:element.getAttribute('data-name'),
        size:parseInt(element.getAttribute('data-size')),

        time:parseInt(element.getAttribute('data-time')),

        html:element.outerHTML
    };
    items.push(rowdetails);
});
//order status
const sortstatus={
     name:'none',//none,up,down
     size:'none',
    time:'none',
};
const sortup=(items,type)=>{
       items.sort((item1,item2)=>{
           let value1,value2;
         if(type==='name')
         {
            value1=item1.name.toUpperCase();
            value2=item2.name.toUpperCase();
           
         }else if(type==='size')
         {value1=item1.size;
            value2=item2.size;
           


         }else{
            value1=item1.time;
            value2=item2.time;
         }
         if(value1<value2)
         {
             return -1;
         }
         if(value1>value2)
         {
             return 1;
         }
         return 0;
       });
};
//sortnameup(items);
const sortdown=(items,type)=>{
    sortup(items);
    items.reverse();
}
//sortnamedown(items);



//fill table body
const filltable=items=>{
    const content=items.map(element=>
        element.html).join('');

         $('tbody').html(content);
};

//event listeners;
document.getElementById('tablehead').addEventListener('click',event=>{
     if(event.target){
         
             $('ion-icon').remove();
            if(['none','down'].includes(sortstatus[event.target.id])){
                //ascending
                sortup(items,event.target.id);
                sortstatus[event.target.id]='up';
                //add icon
                event.target.innerHTML+=' <ion-icon name="arrow-dropup-circle"></ion-icon>';
                //console.log('ji');
            }
           else if(sortstatus[event.target.id]==='up')
            {
                sortdown(items,event.target.id);
                sortstatus[event.target.id]='down';
                event.target.innerHTML+=` <ion-icon name="arrow-dropdown-circle"></ion-icon>`;
            }
            filltable(items);
         }
     
});
