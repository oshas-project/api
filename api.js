const express = require('express')
const database = require('./database.js')

const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Welcome to the OSHAS server api!')
})

app.get('/profiles', (req, res) => {
	sendMessage(res, 'Please specify a username!', 400)
})

app.get('/profiles/:username', (req, res) => {
	let username = req.params['username']
	const profile = database.get_profile(username)
	if (profile == null) {
		sendMessage(res, 'Invalid profile username!', 404)
		return
	}
	res.send(profile)
})

app.listen(port, () => {
  console.log(`API Listening @ https://localhost:${port}`)
})

function sendMessage(res, message) {
	res.send({
		message: message
	})
}

function sendMessage(res, message, status) {
	res.status(status)
	res.send({
		message: message
	})
}