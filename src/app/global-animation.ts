//importing animations functions
import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
  } from '@angular/animations';




  export const toggleFixedBottomMenu = trigger('fixedMenuClosed', [
    state('onclosed', style({
       opacity: '1',
    })), 
    state('onopned',style({
         opacity: '.4',
     })),
 
     transition('onclosed <=> onopned', [
        animate('.3s')
     ]) 
]);  


 