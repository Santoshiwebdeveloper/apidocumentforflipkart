let fs = require('fs');//it is like deling with file system like add,del,update ...
// fs.writeFile('mycode.txt','this is node app',()=>{console.log('Task done')})

//by using this u have to create any type of file such as pdf,text,docs etc...
//first u can give file name,content in file,then iffi function wich is known as immediately innvokable function
//the problem with write file is the content in file every time remove the first content and add new content
//it does not append new content(over ride the text every time new content)


 fs.appendFile('mycode.txt',`${Math.floor(Math.random()*1000)}>this is appending text every time \n`,()=>{console.log('task done')})

//it always add new data to current data it does not remove old dat

// fs.readFile('mycode.txt','utf-8',(err,data)=>{
//     if(err) throw err
//     console.log(data)
// })

// fs.rename('mycode.txt','mytext.txt',(err)=>{
//     if(err) throw err
//     console.log('file rename')
// })

// fs.unlink('mytext.txt',(err)=>{
//     if(err) throw err
//     console.log('file delted')
// }
// )