//importing animations functions
import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
  } from '@angular/animations';


  export const showClassDetails = trigger('classDetailHolder', [
    state('onopned', style({
       opacity: '1',
       width : '75%'
    })), 
    state('onclosed',style({
         opacity: '.0',
         width : '0px'
     })),
 
     transition('onclosed <=> onopned', [
        animate('.2s')
     ]) 
]);  
