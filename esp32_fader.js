class ESPfader {

  constructor() {
    this.device = null;
    this.onDisconnected = this.onDisconnected.bind(this);
  }

  request() {
    let options = {
      "filters": [{
        "name": "ESP32 UART Service"
      }],
      "optionalServices": ["48696828-8aba-4445-b1d2-9fe5c3e47382"]
    };
    return navigator.bluetooth.requestDevice(options)
    .then(device => {
      this.device = device;
      this.device.addEventListener('gattserverdisconnected', this.onDisconnected);
    });
  }

  connect() {
    if (!this.device) {
      return Promise.reject('Device is not connected.');
    }
    return this.device.gatt.connect();
  }

  writeFaderFreq(data) {
    return this.device.gatt.getPrimaryService("48696828-8aba-4445-b1d2-9fe5c3e47382")
    .then(service => service.getCharacteristic("7dd57463-acc5-48eb-9b7f-3052779322de"))
    .then(characteristic => characteristic.writeValue(data));
  }

  startFaderFreqNotifications(listener) {
    return this.device.gatt.getPrimaryService("48696828-8aba-4445-b1d2-9fe5c3e47382")
    .then(service => service.getCharacteristic("7dd57463-acc5-48eb-9b7f-3052779322de"))
    .then(characteristic => characteristic.startNotifications())
    .then(characteristic => characteristic.addEventListener('characteristicvaluechanged', handleNotifications));
  }

  stopFaderFreqNotifications(listener) {
    return this.device.gatt.getPrimaryService("48696828-8aba-4445-b1d2-9fe5c3e47382")
    .then(service => service.getCharacteristic("7dd57463-acc5-48eb-9b7f-3052779322de"))
    .then(characteristic => characteristic.stopNotifications())
    .then(characteristic => characteristic.removeEventListener('characteristicvaluechanged', handleNotifications));
  }

  disconnect() {
    if (!this.device) {
      return Promise.reject('Device is not connected.');
    }
    return this.device.gatt.disconnect();
  }

  onDisconnected() {
    console.log('Device is disconnected.');
  }
}

var eSPfader = new ESPfader();
var slider = document.getElementById("myRange");

slider.onchange = function() {
	try {
		let encoder = new TextEncoder('utf-8');
		let value = this.value;
		let buf = new Uint8Array.of(value);
		console.log(value + "\t" + typeof(value) + "\t" + buf);
		eSPfader.writeFaderFreq(buf);
	}
	catch(error) { console.log(error); }
}


document.querySelector('button').addEventListener('click', event => {
  eSPfader.request()
  .then(_ => eSPfader.connect())
  .then(_ => {
  /* Do something with eSPfader... */
  //eSPfader.startFaderFreqNotifications;
  })
  .catch(error => { console.log(error) });
});

function handleNotifications(event) {
  let value = event.target.value;
  console.log(value + "\t" + typeof(value));
  let a = [];
  // Convert raw data bytes to hex values just for the sake of showing something.
  // In the "real" world, you'd use data.getUint8, data.getUint16 or even
  // TextDecoder to process raw data bytes.
  for (let i = 0; i < value.byteLength; i++) {
    a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
  }
  console.log('> ' + a.join(' '));

	slider.value = value.getUint8(0).toString(8);
	output.innerHTML = slider.value;
}
