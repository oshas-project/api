const fs = require('fs')
const path = require('path')

// weird workaround for relative paths not working
const PROFILES_DIRECTORY = path.join(__dirname + '/data/profiles/')

function getProfile(username) {
	const path = PROFILES_DIRECTORY + username + '.json'
	if (!(fs.existsSync(path))) return null
	const profile = JSON.parse(fs.readFileSync(path))
	return profile
}

function getProfiles() {
	let profiles = []
	const profileFiles = fs.readdirSync(PROFILES_DIRECTORY).filter(file => file.endsWith('.json'))
	for (const profileFile of profileFiles) {
		const path = PROFILES_DIRECTORY + profileFile
		const profile = JSON.parse(fs.readFileSync(path))
		profiles.push(profile) 
	}
	return profiles
}

function setProfiles(username, data) {
	const path = PROFILES_DIRECTORY + username + '.json'
	const content = JSON.stringify(data, null, 2)
	if (!(fs.existsSync(path))) return null
	fs.writeFileSync(path, content)
}

module.exports = {
	getProfile,
	getProfiles,
	setProfiles
}