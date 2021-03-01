const express = require ("express");
const https = require ("https");
const bodyParser = require ("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
	const query= req.body.CityName;
	const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=90b1a88c6c6a0dcb9a16df89c1e6c436"

	https.get(url, function(response){
		console.log(response.statusCode);

		response.on("data", function(data){
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const description = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
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