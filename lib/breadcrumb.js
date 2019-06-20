const buildbreadcrumb=pathname=>{
//return pathname;
const path=require('path');
const pathchunks=pathname.split('/').filter(element=>element!=='');
//console.log(pathchunks);
let breadcrumb =` <li class="breadcrumb-item"><a href="/">home</a></li>`;
let link="/";
pathchunks.forEach((item,index) => {
    link= path.join(link,item);
    if(index!==pathchunks.length){
      //console.log('1');  
 breadcrumb +=`<li class="breadcrumb-item"><a href="${link}">${item}</a></li>`;
    // console.log(breadcrumb);
    }else{
       `<li class="breadcrumb-item active" aria-current="page">${item}</li>`;
      // console.log(breadcrumb);
       //console.log('2');
    }
 
});
return breadcrumb;
};
module.exports=buildbreadcrumb;