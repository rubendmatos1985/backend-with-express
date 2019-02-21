const express = require("express");
const app = express();

const fortunes = [
  "Conquer your fears or the will conquer you",
  "Rivers need springs",
  "Do not fear what you don't know",
  "You will have a pleasant sorprise",
  "Whenever possible, keep it simple."    
]


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
  res.render("home");
});

app.get('/about', (req, res)=>{
  const num = Math.floor(Math.random() * fortunes.length)  
  res.render('about', { fortune: fortunes[num] });
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

app.listen(app.get("port"), (e) => {
 
  console.log(
    `Express started on http://localhost:${app.get("port")}; 
     press Ctrl+C to terminate`
  )
})
