const url=require('url');
const path=require('path');
const fs=require('fs');

//files

const buildbreadcrumb=require('./breadcrumb.js');
const buildmaincontent=require('./maincontent.js');
const getmimetype=require('./getmimetype.js');

const staticbasepath =path.join(__dirname,'..','static');

const respond=(request,response) =>{


//pathname

let pathname=url.parse(request.url,true).pathname;
//if favicon.ico stop
if(pathname === '/favicon.ico'){
    return false;
}
//onsole.log(pathname);
//404 file not found
pathname=decodeURIComponent(pathname);
const fullstaticpath=path.join(staticbasepath,pathname);
if(!fs.existsSync(fullstaticpath)){
    //console.log(fullstaticpath+"does not exists");
    response.write("404:file not found");
    response.end();
    return false;  
}
let stats;
try{
    stats=fs.lstatSync(fullstaticpath)
}
catch(err){
    console.log('lstatsync Error:',err);
}

if(stats.isDirectory()){
let data=fs.readFileSync(path.join(staticbasepath,'project_files/index.html'),'utf-8');

   // console.log(pathname);
    let pathelements=pathname.split('/').reverse();
    pathelements=pathelements.filter(element=> element!=='');
    let foldername=pathelements[0];

    if(foldername===undefined)
    {
        foldername='Home';
    }
    
    //console.log(pathelements);
    //build breadcrumb
    const breadcrumb=buildbreadcrumb(pathname);
    
    //build table rows
    const maincontent=buildmaincontent(fullstaticpath,pathname);
    data=data.replace('page_title',foldername);
    data=data.replace('pathname',breadcrumb);
    data=data.replace('maincontent',maincontent);

    response.statusCode=200;
    response.write(data)
    return response.end();
}
if(!stats.isFile())
{
    response.statusCode=401;
    response.write('401: Access Denied');
    console.log('Not a File');
    return response.end();
}
//file
 //extension
 let filedetails={};
 filedetails.extname=path.extname(fullstaticpath);
 //console.log(filedetails.extname);
 let stat;
        try{
            stat=fs.statSync(fullstaticpath);
        }catch(err){
            console.log('err: '+err);
        }
        filedetails.size=stat.size;
 //mimetype
 getmimetype(filedetails.extname)
 .then( mime =>
    {
        //store headers here
        let head={};
        let options={};

        //response status
        let statusCode=200;

        //set "content type" for all file types
        head['Content-Type']=mime;
        
          
        //pdf
        if(filedetails.extname==='.pdf')
        {
           
  head['Content-Disposition']='inline';
 // head['Content-Disposition']='attachments;filename=file.pdf';       
}
if(filedetails.extname==='.docx')
        {
           
  head['Content-Disposition']='inline';
  //head['Content-Disposition']='attachments;filename=file.docx';       
}
//audio/video
if(RegExp('audio').test(mime)||RegExp('video').test(mime)){
    head['Accept-Ranges']='bytes';

    const range=request.headers.range;
    console.log('range '+range);
    //if(range){
     //   const start_end=
       //     range.replace(/bytes=/,"").split('-');
         //   const start= parseInt(start_end[0]);
           // const end= start_end[1]
            //? parseInt(start_end[1])
            //: filesize-1;
        
    //}
    //Content-Range
   
    //head['Content-Range']=`bytes ${start}-${end}/${filedetails.size}`;
    //head['Content-Range']=end-start+1;
    statusCode=206;
    //options={start,end};
}
        //reading file using fs.read

 //       fs.promises.readFile(fullstaticpath,'utf-8')
   //         .then(data=>{
                
  //                  response.writeHead(statusCode,head);
  //                  response.write(data);
    //                return response.end();
    //
                
      //      })
        
        //.catch(error =>{
          //  console.log(error);
            //response.statusCode=404;
            //response.write('404: file reading error');
            //return response.end();
        //});
        //streaming method
        const filestream=fs.createReadStream(fullstaticpath,options);
        //stream chunks to response object
         response.writeHead(statusCode,head);
         
        filestream.pipe(response);

        //events
        filestream.on('close',()=>{
            return response.end();
        });
        filestream.on('error',error=>{
            console.log(error.code);
            response.statusCode=404;
            response.write('404: file stream error');
           
            return response.end();
        });


    })
    .catch(err => {
     response.statusCode=500;
     response.write('500: Internal server error');
     response.end();
     console.log('promise err : '+err);
     return respond.end();
 })
 //pdf file

}

module.exports=respond;