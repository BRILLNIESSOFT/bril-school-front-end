import { Component, ElementRef, ViewChild,OnInit , AfterViewInit} from '@angular/core';
import { SubjectsElement } from './../timetable-animation'
//FULL CALENDER IMPORTS 
import { Calendar } from '@fullcalendar/core';

 import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
 


@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss'],
  animations:[SubjectsElement]
})
export class CheckComponent implements OnInit {

  //IS SUBJECT DIV ELEMENT SHOWN
  public subjectElmIsShown:boolean = false;

  public CalendarOptions = {};

  //BINDING REFERENCES
  @ViewChild('SubjectsElmRef') subjectElementReference!:ElementRef; 

  constructor() {  const name = Calendar.name;  }

  ngOnInit(): void {
  //INIZIALIZING THE CALENDER SETTING THE DEFUAL OPTIONS
  this.CalendarOptions = {
    //CALENDER HEADERS
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek',
    } ,
    //CALENDER INITIAL VIEWS
    height: 550,
    initialView: 'timeGridWeek',
     weekends: true,
     allDaySlot: false,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    droppable: true,
   //DISPLAY FROM TO ONLY BUSSNIESS HOURS
   slotMinTime: '08:00:00',
   slotMaxTime: '19:00:00',

    //CALENDER EVENTS
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2021-02-21T00:00:00' },
      { title: 'event 2', date: '2021-02-21T00:01:00' }
    ] ,
    //SET DRAGGABLE DRAG SUBJECTS INTO THE CALENDER
    businessHours: {
      // days of week. an array of zero-based day of week integers (0=Sunday)
      daysOfWeek: [ 1, 2, 3, 4 ,5 , 6 , 7], // Monday - Thursday
    
      startTime: '08:00', // a start time (10am in this example)
      endTime: '18:00', // an end time (6pm in this example)

    } , 

    

      //ON THE USER STARTS DRUGGING 
  eventDragStop( ) {
    console.log("STOPED ");
  } ,


  eventDragStart( ){
    console.log("STARTED ");
  }

    
   };


  }
  
  ngAfterViewInit(){
    //DRAGG TJE EXTERNAL EVENTS INTO THE CALENDAR PROPERLY
    new Draggable(this.subjectElementReference.nativeElement, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText
        };
      }, 
   
  });
  
  }
 //NG AFTER VIEW INIT ENDS
 
  //ONCLICK EVENT
  handleDateClick(arg:any) {
    alert('date click! ' + arg.dateStr)
  }

  //SHOW THE SUBJECTS
  showSubjectsElement(){
   if(!this.subjectElmIsShown){
    this.subjectElmIsShown = true;
   }else{
    this.subjectElmIsShown = false;
   }
    console.log(this.subjectElementReference.nativeElement);
  }

  //HIDE BUTTON ELEMENT
  hideSubjectsElement(){
    this.subjectElmIsShown = false;   
  }


}
