const express = require('express')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
var shortid = require('shortid')
var path = require('path')

//init app
const app = express()



//make mysql connection
const conn = mysql.createConnection({
	host: "localhost",
	port: "3308",
	user: "root",
	password: "",
	database: "club_membership_system"
})



app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('./'));
app.use(bodyParser())
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})
app.use(session({
	secret: "2d23e43rwr3wrw33e", 
	resave: false, 
	saveUninitialized: true,
	cookie: {
       expires: new Date(Date.now() + 60 * 2000),
       maxAge: 60 * 2000}
	}))


app.get('/api/cources/:id', (req, res) => {
    res.send(req.params.id)
});

app.post('/', (req, res) => {
	console.log(req.body)
	conn.query("SELECT * FROM account WHERE Email = '" + req.body.email + "' AND Password = '" + req.body.password +"'", (err, row) => {
		if(err) throw err
		console.log("password: " + req.body.password)
		console.log("email: " + req.body.email)
		console.log(row)
		if (row[0]) {
			conn.query("SELECT UserID FROM member WHERE Email = '" + req.body.email + "'", (errInner, rowInner) => {
				if(errInner) throw errInner
				req.session.user = row[0]
				console.log(rowInner)
				return res.status(200).json(rowInner).send()
			})
			
			
		} else if (err) {
			return res.status(500).send()
		} else if (!row[0]) {
			return res.status(404).send()
		}
	})
});

app.get('/logout', (req, res) => {
    req.session.destroy()
	res.redirect("home.html")
});

app.get('/member/:userid', (req, res) => {
	var userid = req.params.userid
	conn.query("SELECT * FROM member WHERE UserID = '" + userid + "'", (err, row) => {
		if(err) throw err
		res.send(row)
	})
	
});

app.post('/signup', (req, res) => {
	var id = shortid.generate()
	console.log(id)
	insertAccount(req.body.email, req.body.password)
	conn.query("INSERT INTO member (UserID,Password, Name, Surname, Birthdate, Gender, Email, Street, Province, ZipCode, Job, Adminname)"+ 
	" VALUES ('"+ id + "','" + req.body.password + "','" + req.body.firstname + "','" + req.body.lastname + "','"  + req.body.birthdate +  "','" + req.body.gender + "','" + req.body.email +"','" +req.body.street +"','" + req.body.province +"','" + req.body.zipcode +"','" + req.body.job +"','" + "yasincidem" +"')", (err, row) => {
		if(err) throw err
		console.log(row)
	})
	
});

app.get('/dashboard', (req, res) => {
	if(!req.session.user) {
		return res.status(401).send()
	} else {
		return res.status(200).send("Welcome to super secret API")
	}
})

function insertAccount(email, password) {
	conn.query("INSERT INTO account (Email, Password)"+ 
	" VALUES ( '"+ email + "','" + password + "')", (err, row) => {
		if(err) throw err
		console.log(row)
	})
}

function insertCanSubscribe(MagazineTitle) {
	conn.query("INSERT INTO account (Email, Password)"+ 
	" VALUES ( '"+ email + "','" + password + "')", (err, row) => {
		if(err) throw err
		console.log(row)
	})
}

function insertAccount(email, password) {
	conn.query("INSERT INTO account (Email, Password)"+ 
	" VALUES ( '"+ email + "','" + password + "')", (err, row) => {
		if(err) throw err
		console.log(row)
	})
}

 function IDGenerator() {
	 
	 this.length = 8;
	 this.timestamp = +new Date;
	 
	 var _getRandomInt = function( min, max ) {
		return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
	 }
	 
	 this.generate = function() {
		 var ts = this.timestamp.toString();
		 var parts = ts.split( "" ).reverse();
		 var id = "";
		 
		 for( var i = 0; i < this.length; ++i ) {
			var index = _getRandomInt( 0, parts.length - 1 );
			id += parts[index];	 
		 }
		 
		 return id;
	 }		 
}





//bcrypt => https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt


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







app.listen(3000, () => console.log('Example app listening on port 3000!'))