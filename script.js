const http = require('http');
const fs =require('fs')
const  express=require('express')
const path=require('path');
const app =express();
const hostname = '127.0.0.1';
const port = 3000;
//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));
app.use(express.urlencoded());
//PUG SPECIFIc STUFF
app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'))
const home=fs.readFileSync('./index.html') 
const about=fs.readFileSync('./about.html') 
const contact=fs.readFileSync('./contact.html') 
const services=fs.readFileSync('./services.html') 
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
});
//END POINTS

app.get('/',(req,res)=>{
  const title='PUG title';
  const heading='PUG heading is one of the best heading';
  res.status(200).render('index.pug',{title:title,heading:heading});
})
app.post('/',(req,res)=>{
  const name=req.body.name;
  const email=req.body.email;
  const message=req.body.message;
  const more=req.body.more;
  let ouputTOWrite=`The name of the person is ${name},the email of the person is ${email}, his message: ${message} and more about him:${more}`
  fs.writeFileSync('output.txt',ouputTOWrite);
  const mes='Your form has been submitted successfully';
  res.status(200).render('index.pug',{message:mes});
})
// app.get('/demo',(req,res)=>{
//   res.render('demo', { title: 'this is title', message: 'Hello there,this is pug file' })
// })
// app.get('/',(req,res)=>{
//   res.send("This the file of the contact in get form");
// })
// app.post('/about',(req,res)=>{
//   res.send("This the file of the contact in post form");
// })
// app.get('/contact',(req,res)=>{
//   res.send("This the file of the home in get form");

// })
// app.post('/services',(req,res)=>{
//   res.send("This the file of the home in post form");
// })
//START THE SERVER
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});