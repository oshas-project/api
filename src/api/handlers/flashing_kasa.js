const fs = require('fs')
const path = require('path')

const { Client } = require('tplink-smarthome-api')
const kasa_client = new Client()

// weird workaround for relative paths not working
const CONFIG_DATA_PATH = '/home/pi/oshas/api/src/api/data/handlers/kasa_switches.json'

function setSwitchState(ip, state) {
	const plug = kasa_client.getDevice({ host: ip }).then((device) => {
		device.setPowerState(state);
	})
}

function execute(preference) {
	return
	const kasa_switches_raw = fs.readFileSync(CONFIG_DATA_PATH)
	const kasa_switches = JSON.parse(kasa_switches_raw)
	const ip = '192.168.0.5'
	setSwitchState(ip, preference.state)

	const delay = 500
	let state = false

	setTimeout(() => {
		setSwitchState(ip, state)
		state = !state
		setTimeout(() => {
			setSwitchState(ip, state)
			state = !state
			setTimeout(() => {
				setSwitchState(ip, state)
				state = !state
				setTimeout(() => {
					setSwitchState(ip, state)
					state = !state
					setTimeout(() => {
						setSwitchState(ip, state)
						state = !state
						setTimeout(() => {
							setSwitchState(ip, state)
							state = !state
							setTimeout(() => {
								setSwitchState(ip, state)
								state = !state
								
							}, delay)
						}, delay)
					}, delay)
				}, delay)
			}, delay)
		}, delay)
	}, delay)

	console.log(preference.id + ' turned to ' + preference.state)
}

module.exports = {
	execute
}