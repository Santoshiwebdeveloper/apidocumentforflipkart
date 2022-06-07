//creating server using http,static api can be created by using hhtp and fs together
//node js do not require any server, it creates its own server
let http =require('http');
//param ,queryparam,form in above formates u can send req
let server = http.createServer((req,res)=>{
res.write('<h1>hi first server </h1>');
res.end();
})
server.listen(6780)
//the main problem with http server is it has only single route it can be over come
//by using expess ,it can define by using multiple routes