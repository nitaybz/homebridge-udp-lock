var udp = require('./udp');
var Service, Characteristic;

module.exports = function(homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;

	homebridge.registerAccessory("homebridge-udp-lock", "UDPlock", udpLock);
}

function udpLock(log, config) {
	this.log = log;
	this.name = config["name"];
	this.host = config["host"];
   	this.port = config["port"];
	this.unlock_payload = config["unlock_payload"];
	this.lock_payload = config["lock_payload"];
	this.currentState = (config["defaultState"] == "lock") ? true : false;
	this.log("locked = " + this.currentState);
	
	this.lockservice = new Service.LockMechanism(this.name);

	this.lockservice
		.getCharacteristic(Characteristic.LockCurrentState)
		.on('get', this.getState.bind(this));

	this.lockservice
		.getCharacteristic(Characteristic.LockTargetState)
		.on('get', this.getState.bind(this))
		.on('set', this.setState.bind(this));
}

udpLock.prototype.getState = function(callback) {
	this.log("current lock state is " + this.currentState);
	callback(null, this.currentState);	

}

udpLock.prototype.setState = function(state, callback) {
	var lockState = (state == Characteristic.LockTargetState.SECURED) ? "lock" : "unlock";
	this.log("Set state to ", lockState);

   	this.udpRequest(this.host, this.port, (lockState == "lock" ? this.lock_payload : this.unlock_payload), function() {
		this.log("Success ", (lockState == "lock" ? "locking" : "unlocking"))
			this.currentState = (state == Characteristic.LockTargetState.SECURED) ? Characteristic.LockCurrentState.SECURED : Characteristic.LockCurrentState.UNSECURED;
		this.garageservice
			.setCharacteristic(Characteristic.LockCurrentState, this.currentState);
			callback(null); // success
    	}.bind(this));
},

udpLock.prototype.udpRequest = function(host, port, payload, callback) {
        udp(host, port, payload, function (err) {
            callback(err);
        });
    },	

udpLock.prototype.getServices = function() {
	return [this.lockservice];
}
