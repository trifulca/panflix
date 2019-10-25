"use strict";
const express = require("express");
const fs = require("fs");
const path = require("path");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

nunjucks.configure("templates", {
  autoescape: true,
  express: app
});

app.use(cookieParser());
app.use(
  session({
    secret: "pecuniams123ekretsession",
    resave: false,
    saveUninitialized: true
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function autenticado(req, res, next) {
  //next();

  if (!req.session.autenticado) {
    res.send("No estás autorizado a ingresar en esta sección");
  } else {
    next();
  }
}

app.get("/", function(req, res) {
  if (req.session.autenticado) {
    res.redirect("/videos");
  } else {
    res.render("index.html");
  }
});

app.post("/login", function(req, res) {
  let data = req.body;

  if (data.clave === "123") {
    req.session.autenticado = true;

    req.session.save(function(err) {
      res.redirect("/videos");
    });
  } else {
    res.send("Bad user/pass");
  }
});

app.get("/logout", function(req, res) {
  req.session.destroy(err => {
    if (err) {
      return console.log(err);
    }
    res.redirect("/");
  });
});

app.get("/video/:id", autenticado, function(req, res) {
  const path = `assets/${req.params.id}`;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4"
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4"
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

app.get("/videos", autenticado, function(req, res) {
  res.render("videos.html", { lista: [2, 3, 4, 5] });
});

app.listen(3000, function() {
  console.log("Iniciando servicio en http://localhost:3000 ");
});
