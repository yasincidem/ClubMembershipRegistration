const express = require('express')
const mysql = require('mysql')
const bcrypt = require('bcrypt')

const app = express()
const conn = mysql.createConnection({
	host: "localhost",
	port: "3308",
	user: "root",
	password: "",
	database: "club_membership_system"
})
//bcrypt => https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

conn.connect(function(err) {
	if(err) throw err
	console.log("Connected")
	var sql = 
	'INSERT INTO magazine (Title, Popularity, Adminname) VALUES ("Mag5" , "55", "yasincidem")'
	let hash = bcrypt.hashSync('alici', 2);
	
})

app.get('/magazine', (req, res) => {
	conn.query("SELECT * FROM magazine", (err, result) => {
		if(err) throw err
		console.log("Insertion done successfully" + result)
		res.send(result)
	})
})

app.get('/administrator', (req, res) => {
	conn.query("SELECT * FROM administrator ", (err, result) => {		
		if(err) throw err

		res.send(result)
		result.forEach((row) => console.log(row.AdminName))

	})
})

app.get('/events', (req, res) => {
	conn.query("SELECT * FROM events ", (err, result) => {
		if(err) throw err
		console.log("Insertion done successfully" + result)
		res.send(result)
	})
})

app.get('/member', (req, res) => {
	conn.query("SELECT * FROM member ", (err, result) => {
		if(err) throw err
		console.log("Insertion done successfully" + result)
		res.send(result)
	})
})

app.put('/member', (req, res) => {
	conn.query("SELECT * FROM member ", (err, result) => {
		if(err) throw err
		console.log("Insertion done successfully" + result)
		res.send(result)
	})
})




app.listen(3000, () => console.log('Example app listening on port 3000!'))