const { Board, Led, Pin, Proximity } = require('johnny-five'); 

const board = new Board();

board.on('ready', () => {
  const led = new Led.RGB({
    pins: {
      red: 9,
      green: 10,
      blue: 11,
    },
  });

  const proximitySensor = new Proximity({
    controller: 'HCSR04',
    pin: 5,
    freq: 2000,
  });

  const pin = new Pin({
    pin: 12,

  });

  proximitySensor.on('data', () => {
    const distance = proximitySensor.cm;
    console.log(distance);

    switch(true) {
      case distance < 30 && distance > 20:
        pin.low();
        led.stop();
        led.color('yellow');
        break;
      case distance < 20 && distance > 10:
        pin.low();
        led.stop();
        led.color('#FFA500');
        break;
      case distance < 10:
        pin.high();
        led.color('red');
        led.blink();
        break;
      default:
        pin.low();
        led.stop();
        led.color('green');
    };
  });
});
