const express = require("express");
const nunjucks = require("nunjucks");

const server = express();
const data = require("./data");

server.use( express.static("public") );
server.set("view engine", "njk");

nunjucks.configure("views", { 
    express: server,
    autoescape: false,
    noCache: true
});

server.get("/", function(req, res) { 
  return res.render("courses", { items: data });
});

server.get("/about", function(req, res) { 

  const about = {
    image: "https://rocketseat.gallerycdn.vsassets.io/extensions/rocketseat/rocketseatreactjs/3.0.2/1588456824702/Microsoft.VisualStudio.Services.Icons.Default",
    title: "Rocketseat",
    about: "Escola de programação online",
    paragraph: "Técnologias utilizadas",
    items_list: [
      { name: "Javascript" },
      { name: "React" },
      { name: "Flutter" },
    ],
    links: [
      {
        name: "Github",
        url: "/"
      },
      {
        name: "Instagram",
        url: "/"
      },
      {
        name: "Facebook",
        url: "/"
      }
    ]
  }

  return res.render("about", { about });
});

server.get("/courses/:id", function(req, res) {
  const id = req.params.id;

  const page = data.find(function(item) {
    return item.id == id;
  });

  if (!page) {
    return res.send("Page Not Found");
  }

  return res.render("page", { page });
});

server.use(function(req, res) {
  res.status(404).render("not-found");
});

server.listen( 5000, function() { 
  console.log("Server is running!");
});