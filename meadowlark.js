const express = require("express");
const app = express();
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

// ROUTES

app.get("/", (req, res) => {
  console.log(res);
  res.render("home");
}); 

app.get('/about', (req, res)=>{
  res.render('about', { fortune: randomCookieGenerator(cookies) });
})

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

app.listen(app.get("port"), () => {
 
  console.log(
    `Express started on http://localhost:${app.get("port")}; 
     press Ctrl+C to terminate`
  )
})
