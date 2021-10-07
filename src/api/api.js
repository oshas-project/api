const express = require('express')
const database = require('./data/database.js')

const app = express()
const port = 5000

app.use(express.json())
app.set('trust proxy', true)

// root page (potentially link to documentation?)
app.get('/', (req, res) => {
  res.send('Welcome to the OSHAS server api!')
})

// get endpoint for query profiles system
app.get('/profiles', (req, res) => {
	const ipv4 = req.ip.split(':')[3]
	const body = req.body
	const profile = findProfile(body)
	if (profile) {
		sendData(res, profile, 200)
	} else {
		sendMessage(res, 'No profile was found.', 400)
	}
})

// main post for profile  => {
	app.put('/profiles/', (req, res) => {
	const ipv4 = req.ip.split(':')[3]
	const body = req.body
	if (!('username' in body)) {
		sendMessage(res, 'Please specify a username', 400)
		return
	}

	const profile = database.get_profile(body['username'])
	if (profile) {
		// overriding profile
		console.log('Overriding existing profile')
	} else {
		// creating new profile
		console.log('Attempting to create new profile')
	}
})

function start() {
	app.listen(port, () => {
		console.log(`API Listening @ https://localhost:${port}`)
	})
}

function findProfile(query) {
	for (const profile of database.get_profiles()) {
		let allMatched = true
		for (const entry of Object.entries(query)) {
			if (!(Object.keys(profile).includes(entry[0]))) {
				allMatched = false
				continue
			}

			if (entry[1] != profile[entry[0]]) {
				allMatched = false
			}
		}

		if (allMatched) {
			return profile
		}
	}
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

function sendData(res, data, status) {
	res.status(status)
	res.send(data)
}

module.exports = {
	start
}