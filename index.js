"use strict";
const express = require("express");
const fs = require("fs");
const path = require("path");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { lstatSync, readdirSync } = require("fs");
const { join } = require("path");

const app = express();

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0";

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

app.get("/video/:id", function(req, res) {
  const nombre = req.params.id;

  let ruta_al_video = `videos/${nombre}/${nombre}.mp4`;
  let existe_video = fs.existsSync(path.join(__dirname, ruta_al_video));

  res.render("video.html", { nombre, existe_video, ruta_al_video });
});

app.get("/video-subs/:id", autenticado, function(req, res) {
  const nombre = req.params.id;
  let archivo = path.join(`${__dirname}/videos/${nombre}/${nombre}.vtt`);

  if (fs.existsSync(archivo)) {
    res.sendFile(archivo);
  } else {
    res.sendFile(path.join(`${__dirname}/public/sin-subtitulo.vtt`));
  }
});

app.get("/video-stream/:id", autenticado, function(req, res) {
  const nombre = req.params.id;
  const path = `videos/${nombre}/${nombre}.mp4`;
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

app.get("/captura/:id", function(req, res) {
  let nombre = req.params.id;
  let archivo = path.join(`${__dirname}/videos/${nombre}/${nombre}.jpg`);

  if (fs.existsSync(archivo)) {
    res.sendFile(archivo);
  } else {
    res.sendFile(path.join(`${__dirname}/public/sin-imagen.png`));
  }
});

function es_directorio(archivo) {
  return lstatSync(archivo).isDirectory();
}

function obtener_directorios(ruta) {
  return readdirSync(ruta)
    .map(name => join(ruta, name))
    .filter(es_directorio);
}

app.get("/videos", autenticado, function(req, res) {
  let directorios = obtener_directorios("videos").map(e =>
    e.replace("videos/", "")
  );
  res.render("videos.html", { directorios });
});

app.listen(PORT, HOST, function() {
  console.log(`Iniciando servicio en http://${HOST}:${PORT}`);
});
