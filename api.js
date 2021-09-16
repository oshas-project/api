const express = require('express')
const database = require('./database.js')

const app = express()
const port = 5000

app.use(express.json())

// root page (potentially link to documentation?)
app.get('/', (req, res) => {
  res.send('Welcome to the OSHAS server api!')
})

app.get('/profiles', (req, res) => {
	const body = req.body
	sendMessage(res, 'Please specify a username!', 400)
})

// main get for profile
app.get('/profiles/:username', (req, res) => {
	let username = req.params['username']
	const profile = database.get_profile(username)
	if (profile == null) {
		sendMessage(res, 'Invalid profile username!', 404)
		return
	}
	res.send(profile)
})

// if no profile is specified, send an error
app.put('/profiles/', (req, res) => {
	sendMessage(res, 'Please specify a username!', 400)
})

// main post for profile  => {
	app.put('/profiles/:username', (req, res) => {
	let username = req.params['username']
	const profile = database.get_profile(username)
	if (profile == null) {
		// creating new profile
		console.log('Attempting to create new profile')
	} else {
		// overriding profile
		console.log('Overriding existing profile')
	}
	res.json(req.body)
})

function start() {
	app.listen(port, () => {
		console.log(`API Listening @ https://localhost:${port}`)
	})
}

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

module.exports = {
	start
}