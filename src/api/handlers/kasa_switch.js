const fs = require('fs')
const path = require('path')

const { Client } = require('tplink-smarthome-api')
const kasa_client = new Client()

// weird workaround for relative paths not working
const CONFIG_DATA_PATH = path.join(__dirname.replace('\\handlers', '') + '/data/handlers/kasa_switches.json')

function execute(preference) {
	console.log(preference.id + ' turned to ' + preference.state)
	const kasa_switches_raw = fs.readFileSync(CONFIG_DATA_PATH)
	const kasa_switches = JSON.parse(kasa_switches_raw)
	const ip = kasa_switches[preference.id]['ip']
	setSwitchState(ip, preference.state)
}

function setSwitchState(ip, state) {
	const plug = kasa_client.getDevice({ host: ip }).then((device) => {
		device.setPowerState(state);
	})
}

module.exports = {
	execute
}