let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const { strictEqual } = require('assert');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/getMovies', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = 'SELECT * FROM movies';

	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/addReview', (req, res) => {
	var reviewInfo = req.body;
	let connection = mysql.createConnection(config);

	let sql = 'INSERT INTO Review (userID, movieID, reviewTitle, reviewContent, reviewScore) VALUES ?';
	var reviewData = [Object.values(reviewInfo.data)];

	connection.query(sql, [reviewData], (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		res.send({ express: results });
	});
	connection.end();
});

app.post('/api/MyPage', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = "Select CONCAT(first_name, ' ', last_name) as directorName, name From imdb.directors D, imdb.movies M, imdb.movies_directors MD where D.id = MD.director_id AND M.id = MD.movie_id";

	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/Search', (req, res) => {

	let connection = mysql.createConnection(config);

	let sql = "Select Distinct CONCAT(D.first_name, ' ', D.last_name) as director, M.name, AVG(T.reviewScore) as score, GROUP_CONCAT(CONCAT(A.first_name, ' ', A.last_name)) As actor From movies M INNER JOIN movies_directors MD ON M.id = MD.movie_id INNER JOIN directors D ON D.id = MD.director_id INNER JOIN roles R ON R.movie_id = M.id INNER JOIN actors A on A.id = R.actor_id LEFT JOIN t27hassa.Review T ON M.id = T.movieID Group By M.name, CONCAT(D.first_name, ' ', D.last_name)"
	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});


app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
