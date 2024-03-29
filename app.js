require("dotenv").config();
const express = require ("express");
const https = require ("https");
const bodyParser = require ("body-parser");
const ejs= require ("ejs");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');


app.get("/", function(req, res){
	res.render("home");
});

app.post("/", function(req, res){
	const query= req.body.CityName;
	const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + process.env.SECRET;

	https.get(url, function(response){
		console.log(response.statusCode);

		response.on("data", function(data){
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const description = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

			
			
			res.write("<h1>The temperature in "+ query+ " is " + temp + " degrees Celsius. </h1>");
			res.write("<p>The weather is currently " + description + "<p>");
			res.write("<img src="+imageurl+">");
			res.send();

			
		})
	})
})




app.listen (3000, function (){
	console.log ("Server started");

	});