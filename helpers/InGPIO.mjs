import * as onoff from 'onoff'; //include onoff to interact with the GPIO

class InGPIO {
    constructor(GPIONumber, callback) {
        this.GPIONumber = GPIONumber;
        this.callback = callback;
    }

    init() {
        console.log(`Initialising input GPIO ${this.GPIONumber}`);
        if(onoff.Gpio.accessible){
            this.gpio = new onoff.Gpio(this.GPIONumber, 'in', 'both', 
            {debounceTimeout:10}); 
            this.gpio.watch((error,value) => {
                if(error){
                    console.log(`GPIO ${this.GPIONumber} error ${error}`);
                }
                else {
                    this.callback(value);
                }
            })
        }
    }
}

export { InGPIO as InGPIO };

