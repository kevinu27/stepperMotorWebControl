var port;
var writer;
var pull = 0
var dir = 0
var en = 0
var data = ""

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
    console.log('click en el boton 1', "EN", en, "PULL", pull, "DIR", dir)
    data = `${en},${pull},${dir}\n`;
    console.log('data', data)
            if (!port) {
                try {
                    port = await navigator.serial.requestPort();
                    await port.open({ baudRate: 9600 });

                    const encoder = new TextEncoderStream();
                    writer = encoder.writable.getWriter();
                    encoder.readable.pipeTo(port.writable);
                } catch (error) {
                    console.error('Error al conectar con el puerto serial: ', error);
                }
        } if (port && writer) {
    try {
    await writer.write(data);
    console.log('Cadena enviada: ');
        } catch (error) {
        console.error('Error al enviar la cadena: ', error);
        }
    }
}

async function boton2() {

    dir= !dir
    console.log('click en el boton 2', "EN", en, "PULL", pull, "DIR", dir)
    data = `${en},${pull},${dir}\n`;
    console.log('data', data)
     
        if (!port) {
            try {
                port = await navigator.serial.requestPort();
                await port.open({ baudRate: 9600 });

                const encoder = new TextEncoderStream();
                writer = encoder.writable.getWriter();
                encoder.readable.pipeTo(port.writable);
            } catch (error) {
                console.error('Error al conectar con el puerto serial: ', error);
            }
    } if (port && writer) {
try {
  await writer.write(data);
  console.log('Cadena enviada: ');
} catch (error) {
  console.error('Error al enviar la cadena: ', error);
}
}
    }

async function boton3() {
    pull=!pull
    console.log('click en el boton 3', "EN", en, "PULL", pull, "DIR", dir)
    data = `${en},${pull},${dir}\n`;
    console.log('data', data)

    if (!port) {
        try {
            port = await navigator.serial.requestPort();
            await port.open({ baudRate: 9600 });

            const encoder = new TextEncoderStream();
            writer = encoder.writable.getWriter();
            encoder.readable.pipeTo(port.writable);
        } catch (error) {
            console.error('Error al conectar con el puerto serial: ', error);
        }
} if (port && writer) {
try {
await writer.write(data);
console.log('Cadena enviada: ');
} catch (error) {
console.error('Error al enviar la cadena: ', error);
}
}

    }
