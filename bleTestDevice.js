NRF.setAdvertising({}, {name:"Puck.js Device"});
//NRF.setLowPowerConnection(true);

E.on('init',function() {
  var l; 
  setInterval(function() {
     digitalWrite(LED1,l=!l);
  }, 200);
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// CONNECTION FUNCTION
// When a connection is established, the green light is powered on.
try {
  NRF.on('connect', function() {
  console.log("Connection established");
    digitalWrite(LED1,0);
    clearInterval();
    LED3.set();
    sleep(3000).then(() => {
      digitalWrite(LED3, 0);
      LED2.set();
      //NRF.sleep();
    });
  });
} catch (e) {
  console.log("Error: " + e);
    digitalWrite(LED2, 0);
    digitalWrite(LED3, 0);
    LED1.set();
    sleep(4000).then(() => {
      digitalWrite(LED1, 0);
    });
  //setTimeout('LED1.set();', 5000);
}

// FLASHING FUNCTION
// Causes LED2 to flash on an interval of 200 milliseconds.
/*function startFlashingGreen() {
  digitalWrite(LED3, 0);
  digitalWrite(LED1, 0);
  var l = false;
 setInterval(function() {
   digitalWrite(LED2,l=!l);
   console.log(l);
   console.log(NRF.disconnect());
   sleep(7000).then(() => {
     digitalWrite(LED2, 0);
     //NRF.disconnect();
   });
 }, 200);
}*/

// WATCHER WAITING FOR BUTTON PRESS
// Reset button press starts at the beginning.
setWatch(function() {
  console.log("Button Pressed");
  digitalWrite(LED1, 0);
  digitalWrite(LED2, 0);
  digitalWrite(LED3, 0);
  NRF.disconnect();
  NRF.restart();
}, BTN, {edge:"rising", debounce:50, repeat:true});

NRF.on('disconnect', function(True) {
  //clearWatch();
  digitalWrite(LED3, 0);
  //digitalWrite(LED2, 0);
  var l; 
  setInterval(function() {
     digitalWrite(LED1,l=!l);
  }, 200);
  //NRF.wakre();
});


//LED.set();//Red LED
//LED2.set(); //Green LED
//LED3.set(); //Blue LED

//console.log("Device Address: " + addr);