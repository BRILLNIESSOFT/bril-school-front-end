import { Component, ElementRef, ViewChild,OnInit , AfterViewInit} from '@angular/core';
import { SubjectsElement } from './../timetable-animation'
//IMPRTO JQUERY TYPE DEFINATION DOLLAR SIGN 
 declare var $:any;


//FULL CALENDER IMPORTS 
import { Calendar } from '@fullcalendar/core';
import * as moment from 'moment';

 import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

 //IMPORTING ALL SERVICES
 import { SubjectService } from './../../../brillyschoolservices/subject.service';
 import { StaffService } from './../../../brillyschoolservices/staff.service';
 import { ClassroomService } from './../../../brillyschoolservices/classroom.service';
 import { TimetableService } from './../../../brillyschoolservices/timetable.service';
import { data } from 'jquery';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss'],
  animations:[SubjectsElement]
})
export class CheckComponent implements OnInit {

  //GETTING THE NECCESSARY APIs
  public allStaffsArray:any[] = [];
  //ALL CLASSROOM ARRAY
  public allClassRoomsLess:any[] = [];
 
  //GET ALL DUBJECTS
  public allSubjectsArray:any[] = [];

  //IS SUBJECT DIV ELEMENT SHOWN
  public subjectElmIsShown:boolean = false;

  public CalendarOptions = {};

  //OBJECT OF A NEW TIMETABLE
    //NEW TIMETABLE EVENT 
    //NEW EVENT OBJECT SELECTION
    public NewTimeTableEventData = {
         dayIndex:null,
         teacherId: null,
         subjectId: null,
         roomId: null,
         duration: null,
         date:null,
         startTime: null,
         endTime: null
      }


  //ADD EVENT HEADER STATIC INFO
  public addEventHeaderStaticInfo = {
    day : moment().format("dddd") ,
    class : "CLASS 1" ,
    classSection : "AB3"
  }     
   
   //ARRAY FOR CONTROLLING ADD NEW TIME TABKE EVENT SUBJECT ATTACH
   //AND HIDED AND SHOW BUTTON BY OPACITY
   public newEventAssignSubject:any[] = [];   



 //NEW EVENT DATA INITIALIZING
 public NewEventSelectTeacher?:number;
  

  //BINDING REFERENCES
  @ViewChild('SubjectsElmRef') subjectElementReference!:ElementRef; 

     constructor(private subjectSerice: SubjectService, private timeTableService:TimetableService
      , private staffService:StaffService , private classRoomService: ClassroomService) { 
         const name = Calendar.name;         

    }

  ngOnInit(): void {
  //CLEARING THE LOCAL STORAGE
  localStorage.clear();  
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

              select : (currentTimes:any) => {
                //ASIGMING DATA TO THE OBJECT OF NEW EVENT
                this.NewTimeTableEventData.date = <any>moment(currentTimes.startStr).format('dd-mm-yyyy');
                this.NewTimeTableEventData.dayIndex = <any>moment(currentTimes.startStr).day();
                this.NewTimeTableEventData.duration = <any>moment.duration(moment(currentTimes.endStr).diff(moment(currentTimes.startStr))).asMinutes();
                this.NewTimeTableEventData.startTime = <any>moment(currentTimes.startStr).format('hh:mm');
                this.NewTimeTableEventData.endTime = <any>moment(currentTimes.endStr).format('hh:mm');
                console.log(this.NewTimeTableEventData);
                 // localStorage.setItem('eventStartTime',<any>currentTimes.startStr);
                // localStorage.setItem('eventEndTime',<any>currentTimes.endStr);
                  //console.log(moment.duration(moment(currentTimes.endStr).diff(moment(currentTimes.startStr))).asMinutes());
                 (<any>$('#brill_modal_create_new_timetable_event')).modal('show');
              } ,

              eventDragStop( ) {
                console.log("STARTED ");
                (<any>$('#brill_modal_resize_timetable_event')).modal('show');
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

    //THE END OF CALENDAR OPTIONAL OPTIIONS

    //GET ALL STAFFS SUBSCRIPTION
    this.staffService.getAllStaffs()
     .subscribe(
       (data:any) => this.allStaffsArray = data.data,
       error => console.log("ERROR", error)
     );
    

  //GETTING ALL THE SUJECTS
  this.subjectSerice.getAllSubjects()
   .subscribe(
     (data:any) => this.allSubjectsArray = data.data,
     error => console.log("THIS IS ERROR", error)
   )

      //GET CLASS ROOM LESS INFO
      this.classRoomService.getClassRoomsLes()
      .subscribe(
        (data: any) => this.allClassRoomsLess = data.data,
        error => console.log("error", error)
      );
  

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
  onSetSubjectToNewEvent(allSubjectParent:any,subjectRef:any, id:number){
    document.getElementById("new_event_select_subject_placer")!.style.backgroundColor = subjectRef.style.backgroundColor;
    document.getElementById("new_event_select_subject_placer")!.innerHTML = subjectRef.innerHTML;
    document.getElementById("new_event_select_subject_placer")!.style.color = "#ffffff";
    this.NewTimeTableEventData.subjectId = <any>id;
  }

  //ON SELECT TEACHER TO BE ADDED TO THE TIME TABLE 
  onSelectTeacherAddNewTimeTable(){
    console.log(this.NewTimeTableEventData);
  }

  //ON ADD THE TIMETABLE
  onAddTimeTableEvent(){
   //Reconstracting new Single event Object
    let timetable = {
              timetable:{
                class_id: 2,
                section_id : 1,
                 subject_id: this.NewTimeTableEventData.subjectId,
                teacher_id: this.NewTimeTableEventData.teacherId,
                timetable_type_id: null,
                timetable_day: this.NewTimeTableEventData.dayIndex,
                timetable_date: "1994-04-04",
                start_time: this.NewTimeTableEventData.startTime,
                end_time: this.NewTimeTableEventData.endTime,
                classroom_id: this.NewTimeTableEventData.roomId,
                priority: null,
                note: "no note"
              }
     }

     console.log(timetable);

 

     //SUBSCRIE TO TIMETABLE SERVICE TO ADD NEW TIMETABKLE EVENT SINGLER
     this.timeTableService.addNewSingleEventTimeTable(timetable)
     .subscribe(
       (data:any) => console.log("SUCCESS", data),
        error => console.log("ERROR" , error)
     )


  }

}
//addNewSingleEventTimeTable