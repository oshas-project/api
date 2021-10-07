const fs = require('fs');

const PROFILES_DIRECTORY = './profiles/'

function get_profile(username) {
	const path = PROFILES_DIRECTORY + username + '.json'
	if (!(fs.existsSync(path))) return null
	const profile = JSON.parse(fs.readFileSync(path))
	return profile
}

function get_profiles() {
	let profiles = []
	const profileFiles = fs.readdirSync('./profiles').filter(file => file.endsWith('.json'))
	for (const profileFile of profileFiles) {
		const path = PROFILES_DIRECTORY + profileFile
		const profile = JSON.parse(fs.readFileSync(path))
		profiles.push(profile)
	}
	return profiles
}

function set_profile(username, data) {
	const path = PROFILES_DIRECTORY + username + '.json'
	const content = JSON.stringify(data, null, 2)
	if (!(fs.existsSync(path))) return null
	fs.writeFileSync(path, content)
}

module.exports = {
	get_profile,
	get_profiles,
	set_profile
}