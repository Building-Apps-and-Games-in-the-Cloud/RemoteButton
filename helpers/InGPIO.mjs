import * as onoff from 'onoff'; //include onoff to interact with the GPIO

class InGPIO {

    /**
     * 
     * @param {number} GPIONumber 
     * @param {function} callback 
     */
    constructor(GPIONumber, callback) {
        this.GPIONumber = GPIONumber;
        this.callback = callback;
        this.oldValue = undefined;
    }

    init() {
        console.log(`Initialising input GPIO ${this.GPIONumber}`);
        if(onoff.Gpio.accessible){
            // Create the input button
            this.gpio = new onoff.Gpio(this.GPIONumber, 'in', 'both', 
            {debounceTimeout:10}); 
            // Watch the input for changes
            this.gpio.watch((error,value) => {
                if(error){
                    console.log(`GPIO ${this.GPIONumber} error ${error}`);
                }
                else {
                    // Make sure the value has changed
                    if(this.oldValue==undefined){
                        console.log(`    Sending:${value}`);
                        // send the result to the callback
                        this.callback(value);
                    }
                    else {
                        if(this.oldValue != value){
                            console.log(`    Sending:${value}`);
                            // send the result to the callback
                            this.callback(value);
                        }
                    }
                    this.oldValue = value;
                }
            })
        }
    }
}

export { InGPIO as InGPIO };

