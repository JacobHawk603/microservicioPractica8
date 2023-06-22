require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
var app = express();

var bodyParser= require('body-parser');
var con = mysql.createConnection(process.env.DATABASE_URL);
// var con = mysql.createConnection({
// 	host: process.env.HOST,
// 	user: process.env.USER,
// 	password: process.env.PASSWORD,
// 	database: process.env.DATABASE,
// 	port: process.env.PORT,
// 	ssl: {"rejectUnauthorized":true}
// })

//'mysql://zijifobhzdqbr3iqhqv2:pscale_pw_apFcsSUuxBSGNzZa8jneM5D8MRDxBvIwCvT2CrNhsDS@aws.connect.psdb.cloud/microserviciopractica8?ssl={"rejectUnauthorized":true}'
con.connect()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
	extended: true
}))
	


app.use(express.static('public'))

app.post('/agregarUsuario', (req,res)=>{
	let nombre = req.body.nombre
	con.query('INSERT INTO usuario values("'+nombre+'")', (err, respuesta, fields)=>{
		if(err) return console.log('ERROR', err);
		return res.redirect("/breakout.html")
	})
})

app.get('/getUsuarios', (req, res)=>{

	con.query('SELECT * FROM usuario', (err, respuesta, field)=>{
		if(err) return console.log('ERROR: ', err);

		var userHTML = ``
		var i = 0
		console.log(respuesta)
		respuesta.forEach(user =>{
			i++
			userHTML +=`<tr>
							<td>${i}</td>
							<td>${user.nombre}</td>
						</tr>`
							
		})
		return res.send(`<table>
							<tr>
								<th>id </th>
								<th>Nombre:</th>
							</tr>
							${userHTML}
						</table>`)
	})
})

app.post('/eliminarUsusario', (req,res)=>{
	let nombre = req.body.nombre
	con.query("DELETE FROM usuario where nombre='"+nombre+"'", (err, respuesta, fields)=>{
		if(err) return console.log('ERROR', err);
		return res.send("<h1>'"+nombre+"', quien te bajó a la novia, recibió justicia divina </h1>");
	})
})

app.post('/modificarUsuario', (req,res)=>{
	let nombreInicial = req.body.nombreInicial
	let nombreFinal = req.body.nombreFinal
	con.query("update usuario set nombre='"+nombreFinal+"' where nombre='"+nombreInicial+"'", (err, respuesta, fields)=>{
		if(err) return console.log('ERROR', err);
		return res.send("<h1> a '"+nombreInicial+"' le ha ocurrido una metamorphosis y ahora es '"+nombreFinal+"'</h1>");
	})
})

app.listen(8080, ()=>{
	console.log('Servidor escuchando en el puesrto 8080 aiuda porfavor')
})