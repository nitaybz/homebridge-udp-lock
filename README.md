# homebridge-udp-lock
Control your lock through UDP packets

_________________________________________
#### Creating and maintaining Homebridge plugins consume a lot of time and effort, if you would like to share your appreciation, feel free to "Star" or donate. 

<a target="blank" href="https://www.paypal.me/nitaybz"><img src="https://img.shields.io/badge/Donate-PayPal-blue.svg"/></a>
<a target="blank" href="https://blockchain.info/payment_request?address=18uuUZ5GaMFoRH5TrQFJATQgqrpXCtqZRQ"><img src="https://img.shields.io/badge/Donate-Bitcoin-green.svg"/></a>

[Click here](https://github.com/nitaybz?utf8=%E2%9C%93&tab=repositories&q=homebridge) to review more of my plugins.
_________________________________________

# config.json

```
{
        "accessory": "UDPlock",
        "name": "My Lock",
        "host": "192.168.0.X",
        "port": 80,
        "lock_payload": "874652395hjui4d98523",
        "unlock_payload": "8932y4123545j5k245325",
}
```

## Configuration Params

|             Parameter            |                       Description                       | Required |
| -------------------------------- | ------------------------------------------------------- |:--------:|
| `name`                           | name of the accessory                                   |     ✓    |
| `host`                           | endpoint for whatever is receiving these requests       |     ✓    |
| `port`                           | port of destination                                     |     ✓    |
| `unlock_payload`                 | payload for the unlock state                            |     ✓    |
| `lock_payload`                   | payload for the lock state                              |     ✓    |
| `defaultState`                   | default state when restarting (lock/unlock)             |     ✓    |

## Help

  - Make sure to specify a port and host in the config file.

## Installation

1. Install homebridge using: `npm install -g homebridge`
2. Install this plugin using: `npm install -g homebridge-udp-lock`
3. Update your config file
