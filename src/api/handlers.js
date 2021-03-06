const fs = require('fs')
const path = require('path')

// weird workaround for relative paths not working
const HANDLERS_DIRECTORY = path.join(__dirname + '/handlers/')

function handle(profile) {
	for (const preference of profile.preferences) {
		const path = HANDLERS_DIRECTORY + preference.handler + '.js'
		if (!(fs.existsSync(path))) return false
		const handler = require(path)
		handler.execute(preference)
		return true
	}
}

function getPreferenceFromHandler(preferences, handlerName) {
	for (const preference of preferences) {
		if (preference.handler == handlerName) {
			 return preference
		}
	}
	return null
}

module.exports = {
	handle
}