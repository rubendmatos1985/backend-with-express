const express = require("express");
const app = express();
const R = require('ramda');
const randomCookieGenerator = require('./lib/fortune.js')
  .getFortune;
const cookies = require('./lib/cookies')
  .fortuneCookies;

// set up handlebars view engine
const handlebars = require("express3-handlebars").create({
  defaultLayout: "main"
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.set("port", process.env.PORT || 3000);


// set up public folder

app.use(express.static(__dirname + '/public'));

// HANDLE TESTS
app.use((req, res, next)=>{
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});

// ROUTES

app.get('/headers', (req, res)=>{
  res.set('Content-Type', 'text/plain');  
  const response = R.map((d)=>( d ), req.headers)
  res.send(response); 
})

app.get("/", (req, res) => {
  res.render("home");
}); 

app.get('/about', (req, res)=>{
  res.render('about', { fortune: randomCookieGenerator(cookies) });
});
app.get('/tours/hood-river', (req, res)=>{
  res.render('tours/hood-river')    
});
app.get('/tours/request-group-rate', (req, res)=>{
   res.render('tours/request-group-rate'); 
})

app.get('/newsletter', (req, res)=>{
  res.render('newsletter', { csrf: 'CSRF tokens go here' })   
})
app.post('/process', (req, res)=>{
  console.log(`form from (querystring): ${req.query.form}`);
  //console.log(`CSRF token from hidden form field : ${req.body._csrf}`)
  console.log(`Name from visible form field: ${req.body.name}`)
  console.log(`Email from visible form field: ${req.body.email}`)
  res.redirect(303, '/thank-you'); 
})

// --------------------MIDDLEWARES

// custom 404 page
app.use((req, res) => {
  res.status(404);
  res.render("404");
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.render("500");
})

// body-parser
app.use(require('body-parser')());

//-------> SERVER
app.listen(app.get("port"), () => {
 
  console.log(
    `Express started on http://localhost:${app.get("port")}; 
     press Ctrl+C to terminate`
  );
});
