const express = require('express');
const http = require('http');
const io = require('socket.io')();
const child_process = require('child_process');
const fs = require('fs');
const async = require('async');
const expressApp = express();

const usbtinyisp = require('avrgirl-usbtinyisp');
const chips = require('avrgirl-chips-json');

const avrgirl = new usbtinyisp({
    debug: true,
    chip: chips.attiny44,
    programmer: 'sf-tiny-avr'
});

/**
 * Helper method to start a server on a particular port.
 * @param {Server} theServer The server to start.
 * @param {int} portNum The TCP port on which the server should listen.
 */
function startServer (theServer, portNum) {
    theServer.listen(portNum, function () {
        console.log('listening on *:' + portNum);
    });
}

const server = http.Server(expressApp);
io.attach(server);
console.log("Starting server");
startServer(server, process.env.PORT || 3030);

io.on('connection', function(socket) {

    socket.on('compile', function(data) {
        compile(socket, data.code);
    });
})

function emitStatus(socket, message) {
    socket.emit('status', {
        status: message
    })
}

function compile(socket, avrCode) {
    emitStatus(socket, 'Looking for avr-gcc.');
    try {
        child_process.execSync("which avr-gcc")
    }
    catch(e) {
        emitStatus(socket, 'ERROR: Cannot find avr-gcc. Are you sure it\'s installed??')
        return;
    }
    
    emitStatus(socket, 'Found avr-gcc.');
    emitStatus(socket, 'Compiling.');
    
    var fd = fs.openSync('scratch-to-avr.c', 'w');
    fs.writeSync(fd, avrCode);
    fs.closeSync(fd);

    try {
        child_process.execSync('avr-gcc -mmcu=attiny44 -Wall -Os -DF_CPU=20000000 -I./ -o scratch-to-avr.out scratch-to-avr.c');
        child_process.execSync('avr-objcopy -O ihex scratch-to-avr.out scratch-to-avr.c.hex');
        child_process.execSync('avr-size --mcu=attiny44 --format=avr scratch-to-avr.out');
    }
    catch(e) {
        emitStatus(socket, 'Compilation failed!');
        emitStatus(socket, e.stderr.toString());
    }

    emitStatus(socket, 'Compilation succeeded.');
    emitStatus(socket, 'Trying to upload to AVR board.');

    // avrgirl.on('ready', function() {
        // emitStatus(socket, "avrgirl ready.")
      // upload a program to flash memory
    avrgirl.enterProgrammingMode(function(e) {
        if (e === undefined) {
            avrgirl.writeFlash('scratch-to-avr.c.hex', function(e) {
                if (e === null) {
                    avrgirl.exitProgrammingMode(function(e) {
                        if (e === undefined) {
                            console.log("Flash succeeded");
                        }
                        else {
                            console.log("Error exiting programming mode");
                            console.log(e);
                        }
                    });
                }
                else {
                    console.log("Error writing flash");
                    console.log(e);
                }
            });
        }
        else {
            console.log("Error entering programming mode");
            console.log(e);
        }
    });

      
      // async.series([
      //   avrgirl.enterProgrammingMode,
      //   avrgirl.writeFlash.bind(avrgirl, 'scratch-to-avr.c.hex'),
      //   avrgirl.exitProgrammingMode
      //   ], function (error) {
      //     console.log('err', error);
      //     avrgirl.close();
      //   }
      // );
    // });

}
