const express = require("express");
const https = require("https");

const app = express();

//łączymy się z API 

app.get("/", function(req, res){
   https.get("https://api.nasa.gov/planetary/apod?api_key=sDBYz8OpJTjB2SjGiCw2uqrhPLFEWdd3R5npOHTG", function(ress){
      console.log(ress.statusCode);
      //po poprawnym połączeniu "StatusCode" to 200
      //dostajemy plik JSON
      //aby zniego kożystac musimy go przemienić w obiekt JS 
      ress.on("data", function(data){
         const NASAData = JSON.parse(data);
         console.log(NASAData.url);
         // console.log(NASAData.hdurl);
         const url = NASAData.url;
         const date = NASAData.date;
         const title = NASAData.title;
         const desc = NASAData.explanation;
         res.writeHead(200,{"Content-Type" : "text/html"});
         res.write(`<i>${date}</i>`);
         res.write(`<h1>${title}</h1>`);
         res.write(`<p>${desc}</p>`);
         res.write(`<img src='${url}'>`);
         res.send();
      })
   })
})

app.listen("2137");