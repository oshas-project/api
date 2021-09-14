const fs = require('fs');

const PROFILES_DIRECTORY = './profiles/'

function get_profile(username) {
	const path = PROFILES_DIRECTORY + username + '.json'
	if (!(fs.existsSync(path))) return null
	const profile = JSON.parse(fs.readFileSync(path))
	return profile
}

function set_profile(username, data) {
	const path = PROFILES_DIRECTORY + username + '.json'
	const content = JSON.stringify(data, null, 2)
	if (!(fs.existsSync(path))) return null
	fs.writeFileSync(path, content)
}

module.exports = {
	get_profile,
	set_profile
}