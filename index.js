// const http=require('http')
// const url=require('url')
// const fs=require('fs')


// const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
// const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
// const tempproduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
// const dataObj =JSON.parse(data);


// const replaceTemplate=(temp,product)=>{
//     let output = temp.replace(/{%productname%}/g,product.productName);
//      output = output.replace(/{%image%}/g,product.image);
//      output = output.replace(/{%price%}/g,product.price);
//      output = output.replace(/{%from%}/g,product.from);
//      output = output.replace(/{%nutrients%}/g,product.nutrients);
//      output = output.replace(/{%quantity%}/g,product.quantity);
//      output = output.replace(/{%Description%}/g,product.description);
//      output = output.replace(/{%ID%}/g,product.id);
//      output = output.replace(/{%ID%}/g,product.id);

//      if(!product.organic)output=output.replace(/{%notorganic%}/g,'not-organic');
//      console.log('----------------')
//      console.log(output);
//      return output; 
//     //  console.log('--------')   
// }

 
// //  console.log(productdata);
   

// //created server here
// const server=http.createServer((req,res)=>{
//    //assign the req address in a variable name pathname
//     const pathname=req.url;
//    //overview page
//    if(pathname==='/'|| pathname==='/overview'){
//        res.writeHead(200,{
//            'Content-type':'text/html'
//        });  

//        const cardhtml=dataObj.map(el=>replaceTemplate(tempCard,el)).join('');
//         const output=tempOverview.replace('{%productcard%}',cardhtml);
//        //    console.log(cardhtml)
//        res.end(output);
//    }
//    //product page
//    else if(pathname==='/product'){
//        res.end(tempproduct);
//    }
//    //api
//    else if(pathname==='/api'){
//         //  console.log(productdata);
//         res.writeHead(200,{'Content-type':  'application/json'})
//          res.end(data);
        
//     }
         
         
         
//         //not found any page 
//     else{
//        res.writeHead(404,{
//            'Content-type':'text/html',
//            'my-own-header':'hello-world'
//        });
//        res.end('<h1>404 || Page Not found..</h1>')
//    }



// })
   
// server.listen(8000,'127.0.0.1',()=>{    
// console.log('listening to the request of the users')})
const http=require('http')
const url=require('url')
const fs=require('fs');
// const { profile } = require('console');
const slugify = require('slugify');

const cardtemp= fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const overview= fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const productcard = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
const filedata= fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const newdata =JSON.parse(filedata); 
const slugs =newdata.map(el=>slugify(el.productName,{lower:true}));
console.log(slugs)
console.log(slugs.length);
const replaceTemplate= require('./module/function.js');
const server=http.createServer((req,res)=>{
    //  const pathname = req.url;
    //  console.log(req.url);
     const {query,pathname}=url.parse(req.url,true);
    
    //  console.log(pathname);
    //  console.log(pathname);
     if(pathname==='/' || pathname==='/overview'){
       //write head
       res.writeHead(200,{'Content-type':'text/html'});
        const cardhtmlreplace=newdata.map(el=>replaceTemplate(cardtemp,el)).join();
    //    console.log(cardhtmlreplace);          
       const output = overview.replace(`{%productcard%}`,cardhtmlreplace);
       res.end(output);                     
    }else if(pathname === '/product'){
       res.writeHead(200,{'Content-type':'text/html'});
        const product = newdata[query.id];
        const output = replaceTemplate(productcard,product)
         res.end(output);
        //  res.end(product);
     }
     else if(pathname==='/api'){
         res.end(filedata);
     }
     else{
         res.end('404 || Page not found')
     }
     
      

})
server.listen(8000,'127.0.0.1',()=>{
    console.log('listening to the request of the users');
}




















)
