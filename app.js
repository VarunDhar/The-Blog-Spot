//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const ldash = require('lodash');
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const mongoose = require("mongoose");
const app = express();
mongoose.set("strictQuery", false);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// const blogposts = [];
//mongodb+srv://admin-varun:<password>@cluster1.o6fixn6.mongodb.net/
mongoose.connect("mongodb+srv://<Connect your own MongoDB here>/blogDB", {
  useNewUrlParser: true,
});

// const blogList = new mongoose.Schema({
//   listblog:[blogSchema];
// });

const blogSchema = new mongoose.Schema({
  content: String,
  titlehead: String,
});
const blogschema = mongoose.model("blogschema", blogSchema);

const blogList = new mongoose.Schema({
  listblog:[blogSchema]
});
const bloglist = mongoose.model("bloglist",blogList);

app.get("/",(req,res)=>{
  blogschema.find({},function(err,arr){
    if(err){
      console.log(err);
    }
    else{
      console.log(arr);
      res.render("home",{homeText:homeStartingContent,blogs:arr});
    }
  });
  // res.render("home",{homeText:homeStartingContent,blogs:blogposts});
});

app.get("/contact",(req,res)=>{
  res.render("contact",{contactText: contactContent});
});

app.get("/about",(req,res)=>{
  res.render("about",{aboutText: aboutContent});
});

app.get("/compose",(req,res)=>{
  res.render("compose");
});



app.post("/compose",(req,res)=>{
  // console.log(req.body.entryTitle);
  // let objectName = {
  //   title: req.body.entryTitle,
  //   text: req.body.entryBlog
  // };
  const tempblog = new blogschema({
    content: req.body.entryBlog,
    titlehead:req.body.entryTitle
  });
  
  tempblog.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log(tempblog);
      console.log("Inserted blog successfully!");
    }
  });
  //blogposts.push(objectName);
  res.redirect("/");
});


app.get('/blogposts/:subpage',(req,res)=>{


  bloglist.findOne({ [ldash.lowerCase(titlehead)]: ldash.lowerCase(req.params.subpage) }, function (err, arr) {
    if (err) {
      console.log(err);
    } else {
      // arr.item.push(tempactivity);
      // arr.save(function (err) {
      //   console.log("Added successfully by Post to " + day);
      // });
      res.render("post",{blogtitle: arr.titlehead,blogtext:arr.content});
      console.log("Post found successfully!");
      
    }
  });
  // if(found == false){
  //   console.log("Match Not Found");
  // }
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
