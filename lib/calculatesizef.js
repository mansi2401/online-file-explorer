const calculatesizef=(stats)=>{
     const sizebytes=stats.size;

     //console.log(sizebytes);
     let filesize=(sizebytes/1024).toFixed(0);
     if(filesize==0)
   {
      filesize=(sizebytes);
       filesize.toString();
       filesize+='B';
   }
   else{
    filesize.toString();
    filesize+='KB';
   }
    return[filesize,sizebytes];
};
module.exports=calculatesizef;