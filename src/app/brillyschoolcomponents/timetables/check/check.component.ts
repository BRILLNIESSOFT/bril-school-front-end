import { Component, ElementRef, ViewChild,OnInit , AfterViewInit} from '@angular/core';
import { SubjectsElement } from './../timetable-animation'
//FULL CALENDER IMPORTS 
import { Calendar } from '@fullcalendar/core';

 import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

 //IMPORTING ALL SERVICES
 import { SubjectService } from './../../../brillyschoolservices/subject.service';
 


@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss'],
  animations:[SubjectsElement]
})
export class CheckComponent implements OnInit {

  //GET ALL DUBJECTS
  public allSubjectsArray:any[] = [];

  //IS SUBJECT DIV ELEMENT SHOWN
  public subjectElmIsShown:boolean = false;

  public CalendarOptions = {};

  //BINDING REFERENCES
  @ViewChild('SubjectsElmRef') subjectElementReference!:ElementRef; 

  constructor(private subjectSerice: SubjectService) {  const name = Calendar.name;  }

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
        //ON EVENT DRAGGING OR DROPPING
              eventDragStart( ){
                console.log("STARTED ");
              } ,

              select(){
                (<any>$('#brill_modal_create_new_timetable_event')).modal('show');
              } ,

              eventDragStop( ) {
                console.log("STARTED ");
              } ,

              drop(elem:any){
                elem = <any>document.querySelector('.subjects-list-draggable');
                elem.style.opacity = "1";
              } , 

              eventResizeStop(){
                
                console.log("RESIZED FIXED ");
                (<any>$('#brill_modal_resize_timetable_event')).modal('show');

              } 

                
    };

  //GETTING ALL THE SUJECTS
  this.subjectSerice.getAllSubjects()
   .subscribe(
     (data:any) => this.allSubjectsArray = data.data,
     error => console.log("THIS IS ERROR", error)
   )

 }
  

 //NG AFTER INITIALIZING CALL
  ngAfterViewInit(){
    //DRAGG TJE EXTERNAL EVENTS INTO THE CALENDAR PROPERLY
    new Draggable(this.subjectElementReference.nativeElement, {
      itemSelector: '.fc-event',
      eventData: function(eventEl:any) {
        eventEl.parentNode.style.opacity = "0.0001";
         return {
          title: eventEl.innerText,
          color: eventEl.childNodes[0].style.backgroundColor
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


  //ASSIGN SUBJECT TO THE NEW EVENT
  onSetSubjectToNewEvent(subjectRef:any, id:number){
    subjectRef.style.opacity = "1";
    console.log(  + " " + id);
  }

}
