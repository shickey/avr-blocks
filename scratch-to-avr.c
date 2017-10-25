#include <avr/io.h>
#include <util/delay.h>
#include <avr/pgmspace.h>

#define output(directions,pin) (directions |= pin)
#define input(directions,pin) (directions &= (~pin))
#define set(port,pin) (port |= pin)
#define clear(port,pin) (port &= (~pin))
#define pin_test(pins,pin) (pins & pin)
#define bit_test(byte,bit) (byte & (1 << bit))





int main(void) {
   //
   // set clock divider to /1
   //
   CLKPR = (1 << CLKPCE);
   CLKPR = (0 << CLKPS3) | (0 << CLKPS2) | (0 << CLKPS1) | (0 << CLKPS0);

   // Setup
   output(DDRA, (1 << PA2));

   //
   // main loop
   //
   while (1) {

      set(PORTA, (1 << PA2));
_delay_ms(1000);
clear(PORTA, (1 << PA2));
_delay_ms(1000);

   }
}