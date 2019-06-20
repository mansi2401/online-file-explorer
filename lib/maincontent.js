const fs=require('fs');
const path=require('path');
const calculatesized=require('./calculatesized.js');
const calculatesizef=require('./calculatesizef.js');
const buildmaincontent=(fullstaticpath,pathname)=>{
    let maincontent='';
    let items;
    //loop through elements
     try{
        items=fs.readdirSync(fullstaticpath);
        //console.log(items);
     }
        catch(err){
          console.log('error:  '+err);
          return `<div class="alert alert-danger">Internal server error </div>`   ;
     }
//get following elements
items.forEach(items=>{
    //link
    let itemdetails={};
   // let icon,stats;
    const link=path.join(pathname,items);
    //icon
    const itemfullstaticpath=path.join(fullstaticpath,items);
  try{
    itemdetails.stats=fs.statSync(itemfullstaticpath);
  }catch(err){
      console.log('err: '+err);
      return `<div class="alert alert-danger">Internal server error </div>`   ;
  }
    if(itemdetails.stats.isDirectory()){
            itemdetails.icon=`<ion-icon name="folder"></ion-icon>`;

           [itemdetails.dsize,itemdetails.dsizebytes]= calculatesized(itemfullstaticpath);
    }else if(itemdetails.stats.isFile()){
        itemdetails.icon=`<ion-icon name="document"></ion-icon>`;
           [itemdetails.dsize,itemdetails.dsizebytes]= calculatesizef(itemdetails.stats);
    }
    //last modified
   itemdetails.timestamp=parseInt(itemdetails.stats.mtimeMs);
   //convert to date
   itemdetails.date=new Date( itemdetails.timestamp);
   itemdetails.date=itemdetails.date.toLocaleString();
   //console.log( itemdetails.date);

    maincontent+=`<tr data-name="${items}" data-size="${itemdetails.dsizebytes}" data-time="${itemdetails.timestamp}">
    <td>${itemdetails.icon}<a href="${link}">${items}</td>
    <td>${itemdetails.dsize}</td>
    <td>${itemdetails.date}</td>
    </tr>`
})
//name
//icon
//link
//size
//last modified info
   
return maincontent;
};

module.exports=buildmaincontent;