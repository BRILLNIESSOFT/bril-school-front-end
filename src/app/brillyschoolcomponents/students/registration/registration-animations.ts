//importing animations functions
import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
  } from '@angular/animations';

  export const fingerPrint = trigger('NotesSignal', [
        state('noneDetected', style({
          color: '#393940',
        })), 
        state('confirmFingerPrint',style({
          color: '#005fb1',
         })),
         state('notMatched', style({
          color: '#FF0000',
        })), 
         state('successedFingerPrint',style({
          color: '#00FF2B',
         })),
         transition('noneDetected <=> confirmFingerPrint', [
            animate('.7s')
         ]),
         transition('confirmFingerPrint <=> successedFingerPrint', [
          animate('.4s')
       ])
]);

//INITIALIZING THE CAMERA 
export const lunchCam =  trigger('CamLuncherAnimation', [
    
    state('lanched', style({
      right: '20px',
      opacity: 1
    })),
    state('shated', style({
      right: '800px',
      opacity: 0
    })),
    
    transition('lanched => shated', [
      animate('0.2s')
    ]),
    transition('shated => lanched', [
      animate('0.2s')
    ])
])

export const SnapImage = trigger('SnappedTheImage', [
  state('snapped', style({
    right: '20px',    
    opacity: 1
  })),
  state('dismissed', style({
    right: '800px',        
    opacity: 0
  })),
  
  transition('snapped => dismissed', [
    animate('0.1s')
  ]),
  transition('dismissed => snapped', [
    animate('0.1s')
  ])
]);

//STEP HOLDER ANIMATION 
export const StepHolder = trigger('spetsParentHolder', [
    state('skiped', style({
      backgroundColor: '#000000',    
     })),
    state('started', style({
      backgroundColor: '#ffffff',    
    })),
    
    transition('skiped => started', [
      animate('0.2s')
    ]),
    transition('started => skiped', [
      animate('0.2s')
    ])
]);
