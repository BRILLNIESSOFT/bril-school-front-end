//importing animations functions
import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
  } from '@angular/animations';

export const SubjectsElement = trigger('SubjectsElementContainer', [
    state('showSubjects', style({
       width : '210px',
       display : 'block',
       opacity : '1',
    })), 
    state('hideSubjects',style({
        width : '0px',
        height : '0px',
        display : 'none',
        opacity : '0',
     })),
     
     transition('showSubjects => hideSubjects', [
        animate('.4s')
      ]) , 

   transition('hideSubjects => showSubjects', [
        animate('.1s')
    ])
]);