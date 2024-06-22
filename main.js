document.addEventListener('DOMContentLoaded', (event) => {
    const changeColorBtn = document.getElementById('changeColorBtn');
            pins = document.querySelectorAll('#pins line');
            
            changeColorBtn.addEventListener('click', () => {
            //     let delay = 0;
            //     console.log('pins', pins)
            //     pins.forEach((pin, index) => {
            //         setTimeout(() => {
            //             pin.setAttribute('stroke', getRandomColor());
            //         }, delay);
            //         delay += 200; // Increment delay for each pin
            //     });
            //     console.log('en el click del boton')
        loopWithDelay()
            });
            function getRandomColor() {
                return `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
            }


})

var port;
var writer;
var pull = 0
var dir = 0
var en = 0
var data = ""
var pins;   
var stepsNumberInput;

async function startWebcams() {
    try {
        // Obtener todos los dispositivos de video
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        console.log('videoDevices', videoDevices)
        if (videoDevices.length === 0) {
            console.log("No se encontraron dispositivos de video");
            return;
        }

        // Configurar la primera webcam
        const stream1 = await navigator.mediaDevices.getUserMedia({
            video: {
                deviceId: videoDevices[0].deviceId
            }
        });
        document.getElementById('webcam1').srcObject = stream1;

        // Configurar la segunda webcam si existe
        // if (videoDevices.length > 1) {
        //     const stream2 = await navigator.mediaDevices.getUserMedia({
        //         video: {
        //             deviceId: videoDevices[1].deviceId
        //         }
        //     });
        //     document.getElementById('webcam2').srcObject = stream2;
        // } else {
        //     console.log("Solo se encontró una cámara");
        //     const webcam2 = document.getElementById('webcam2');
        //     webcam2.style.display = 'none';
        //     // border: 1px solid black;
        // }

    } catch (error) {
        console.error("Error accediendo a las cámaras: ", error);
    }
}

startWebcams();

async function boton1() {
    en = !en
    console.log('click en el boton 1', "EN", en, "DIR", dir)
    data = `${en},${dir}\n`;
    console.log('data', data)
                
    let elemento = document.getElementById('boton1');
    console.log('------------------',  pins[0].getAttribute('stroke'))
    if(en) {
        elemento.style.backgroundColor = 'red';
        pins[0].setAttribute('stroke', 'yellow');
        pins[1].setAttribute('stroke', 'gold');
    }else{
        elemento.style.backgroundColor = 'rgba(255, 0, 0, 0.500)';
        pins[0].setAttribute('stroke', 'black');
        pins[1].setAttribute('stroke', 'black');
    }
}

async function boton2() {

    dir= !dir
    console.log('click en el boton 2', "EN", en, "DIR", dir)
    data = `${en},${dir}\n`;
    console.log('data', data)
     
    let elemento = document.getElementById('boton2');
    if(dir) {
        elemento.style.backgroundColor = 'green';
        pins[2].setAttribute('stroke', 'yellow');
        pins[3].setAttribute('stroke', 'gold');
    }else{
        elemento.style.backgroundColor = 'rgba(0, 128, 0, 0.500)';
        pins[2].setAttribute('stroke', 'black');
        pins[3].setAttribute('stroke', 'black');
    }
    }



        async function readSerial() {
            while (true) {
            const { value, done } = await reader.read();
            if (done) {
                console.log('Reader cerrado');
                reader.releaseLock();
                break;
            }
            console.log('Datos recibidos: ', value);
            //   document.getElementById('output').textContent += value + '\n';
            }
        }


        async function boton4() {
            console.log('data', data)
            stepsNumberInput = document.getElementById('Input').value;
            console.log('click en el boton 3', "EN", en, "DIR", dir, 'stepsNumberInput', stepsNumberInput)
            data = `${en},${dir},${stepsNumberInput}\n`;
            console.log('data', data)
            
            if (!port) {
                try {
                    port = await navigator.serial.requestPort();
                    await port.open({ baudRate: 9600 });
          
                    const encoder = new TextEncoderStream();
                    writer = encoder.writable.getWriter();
                    encoder.readable.pipeTo(port.writable);
          
                    const decoder = new TextDecoderStream();
                    reader = decoder.readable.getReader();
                    port.readable.pipeTo(decoder.writable);
          
                    readSerial()
                } catch (error) {
                    console.error('Error al conectar con el puerto serial: ', error);
                }
            } if (port && writer) {
            try {
                await writer.write(data);
                    console.log('Cadena enviada: ', data);
                } catch (error) {
                    console.error('Error al enviar la cadena: ', error);
                }
            }
          
            
   
        }
        // async function loopWithDelay() {
        //     console.log('  loopWithDelay()')
        //     console.log('stepsNumberInput', stepsNumberInput)
        //     let i = 0;
        //     stepsNumberInput = document.getElementById('Input').value;
        //     let stepsNumberInputInt = parseInt(stepsNumberInput)
        //     while (i < stepsNumberInputInt) {
        //         i++
        //         if(pins[4].getAttribute('stroke') === "black"){
        //             console.log('negro')
        //             pins[2].setAttribute('stroke', 'yellow');
        //         }else{
        //             console.log('yellow')
        //             pins[2].setAttribute('stroke', 'black');
        //         }

        //         console.log(`Iteración ${i}`);

        //         // await delay(1000); // Espera 1 segundo
        //         return new Promise(resolve => setTimeout(resolve, 1000))
        //     }
        //     console.log("Bucle completado");
        // }

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        
        async function loopWithDelay() {
            let stepsNumberInput = document.getElementById('Input').value;
            
            let stepsNumberInputInt = parseInt(stepsNumberInput);
            let i = 0;
            let a = true;
            while (i < stepsNumberInputInt) {
                i++;
                if (pins[4].getAttribute('stroke') === "black") {
                    console.log('negro');
                    pins[4].setAttribute('stroke', 'yellow');
                    pins[5].setAttribute('stroke', 'gold');
                    if (a) {
                        pins[6].setAttribute('stroke', 'yellow');
                        pins[7].setAttribute('stroke', 'gold');
                        a = false
                    } else {
                        pins[8].setAttribute('stroke', 'yellow');
                        pins[9].setAttribute('stroke', 'gold');  
                        a= true                      
                    }             
                } else {
                    console.log('yellow');
                    pins[4].setAttribute('stroke', 'black');
                    pins[5].setAttribute('stroke', 'black');
                    pins[6].setAttribute('stroke', 'black');
                    pins[7].setAttribute('stroke', 'black'); 
                    pins[8].setAttribute('stroke', 'black');
                    pins[9].setAttribute('stroke', 'black');          
                }
        
                console.log(`Iteración ${i}`);
        
                await delay(500);
            }
            console.log("Bucle completado");
        }
        
        
        
      