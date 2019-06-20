const {execSync}=require('child_process');
const calculatesized=(itemfullstaticpath)=>{
    //escapespaces
    const itemfullstaticpathcleanes=itemfullstaticpath.replace(" ",'\ ');
    const commandoutput=execSync(`du -c "${itemfullstaticpathcleanes}"`).toString();
   //console.log(commandoutput.split(',')); 
   let details=commandoutput.split(',').reverse();
   //console.log(itemfullstaticpathcleanes); 
   let filesize=(details[0]/(1024*1024)).toFixed(0);  
   if(filesize==0)
   {
       filesize=details[0]/1024;
       filesize.toString();
       filesize+='KB';
   }
   else{
    filesize.toString();
    filesize+='MB';
   }
   //console.log(filesize);
    return [filesize,details[0]];
};
module.exports=calculatesized;