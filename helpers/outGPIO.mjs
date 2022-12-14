import * as onoff from 'onoff'; //include onoff to interact with the GPIO

class OutGPIO {
    constructor(GPIONumber) {
        this.GPIONumber = GPIONumber;
    }

    init() {
        console.log(`Initialising output GPIO ${this.GPIONumber}`);
        if(onoff.Gpio.accessible){
            this.gpio = new onoff.Gpio(this.GPIONumber, 'out'); 
        }
    }

    on(){
        console.log("On");
        if(onoff.Gpio.accessible){
            this.gpio.writeSync(1);
        }
    }

    pulse(){
        console.log("Pulse");
        this.on();
        setTimeout(()=>{this.off();}, 1000);
    }

    off(){
        if(onoff.Gpio.accessible){
            this.gpio.writeSync(0);
        }
        console.log("Off");
    }
}

export { OutGPIO as OutGPIO };

