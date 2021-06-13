import { Component, ElementRef, ViewChild,OnInit , AfterViewInit} from '@angular/core';
import { SubjectsElement } from './../timetable-animation'
import { ToastrService } from 'ngx-toastr';

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

//CALENDER COMPONENT
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss'],
  animations:[SubjectsElement]
})
export class CheckComponent implements OnInit {

  //CURRENT SECTION EVENTS
  public currentSectionEvent:any[] = [];

  //GETTING THE NECCESSARY APIs
  public allStaffsArray:any[] = [];
  //ALL CLASSROOM ARRAY
  public allClassRoomsLess:any[] = [];
 
  //GET ALL DUBJECTS
  public allSubjectsArray:any[] = [];

  //IS SUBJECT DIV ELEMENT SHOWN
  public subjectElmIsShown:boolean = false;

  //CALENDAR ELEMENT REFRENCE
   //CALENDER OPTION OBJECTS
  public CalendarOptions = {};
  // calender events
  public refetshedAllSectionEvents:any[] = [];
 

  //CALENDAR EVENTS
  //@ViewChild('calendarElementRef') calendarComponent!: FullCalendarComponent;

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
         endTime: null,
         dayName: null
      }

    //PUBLIC OBJECT OF CHANGE EVENT DURATION MODEL DATA
    //CHANGE EVENT DURATION OR DATE
    public timetableDurationChange = {
        id: null,
        daysOfTheWeek:NaN,
        oldDayOfTheWeek:null ,
        NewDayOfTheWeek: null,
        oldSartTime: null,
        oldEndTime: null,
        NewSartTime: null,
        NewEndTime: null ,
        oldDuration : null ,
        NewDuration : null
    }


    //SHOW SINGLE EVENT INFORMATION 
      public timeTableShowClickedEventData = {
          id: 5,
          daysOfTheWeek:0,
          startTime: '08:11:2010',
          endTime: '10:10:2018' ,
          duration : '30 min' ,
          teacher : 'ahmed' ,
          classRoom : '5AB', 
          subject : 'MATHEMATHIC'
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
  //BINDING SUBJECT ELEMENTS
  @ViewChild('SubjectsElmRef') subjectElementReference!:ElementRef; 
  //binding callender cmponent
  @ViewChild('calendarElementRef') fullcalendarRef?: FullCalendarComponent;
  //@ViewChild('calendarElementRef') fc: FullCalendar;



   constructor(private subjectSerice: SubjectService, private timeTableService:TimetableService
          ,private staffService:StaffService , private classRoomService: ClassroomService, private toastr: ToastrService) { 
          const name = Calendar.name;         
    }


//ON NG INITIALIZIED    
//ON NG INITIALIZIED    
//ON NG INITIALIZIED    
  ngOnInit(): void {    
    
        //GETTING THE NESSESARRY APIs FOR EVENTS AND OTHER PURPOSES
        this.timeTableService.getEventsOfSection()
        .subscribe(
          (data: any) => this.currentSectionEvent = data.data,
          error => console.log('error', error) , 
          () => {
          }
 
        );
    // console.log("NG ON INTT", this.currentSectionEvent);
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

            this.settingPrimaryCalSettiings();
            this.calRefreshEvent(this.refetshedAllSectionEvents);

        //CLEARING THE LOCAL STORAGE
       // localStorage.clear();  
        //SET TIMETABLEEVENTS
        //this.timetableEvents = this.fetchingAndConfiiguringCalendarEvents(this.currentSectionEvent);
 

        //INIZIALIZING THE CALENDER SETTING THE DEFUAL OPTIONS
      //THE END OF CALENDAR OPTIONAL OPTIIONS
       //FETCHING AND PREPARING EVENTS
       //events:this.currentSectionEvent,
       //CALENDER LOADING
        //CALENDAR REFRESH EVENT
        //this.calRefreshEvent();
       // console.log(this.fetchingAndConfiiguringCalendarEvents(this.currentSectionEvent));
   }
  

 //NG AFTER INITIALIZING CALL
  ngAfterViewInit(){
   // console.log('REFETCHED EVENTS after NG INITIAL', this.fetchingAndConfiiguringCalendarEvents(this.currentSectionEvent));
       console.log("NG AFTER VIEW INTT", this.currentSectionEvent);
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

          //this.fetchingAndConfiiguringCalendarEvents(this.currentSectionEvent);
                 //CALENDER LOADING
                 //CALENDAR REFRESH EVENT
   }

 
 //NG AFTER VIEW INIT ENDS
  //   ngAfterContentInit(){
  //     console.log("NG AFTER CONTENT INTT", this.currentSectionEvent);
  //   }
  // //NG AFTER VIEW INIT ENDS
   

 
  //ONCLICK EVENT
  handleDateClick(arg:any) {
   // this.settingPrimaryCalSettiings(this.currentSectionEvent);
   //this.settingPrimaryCalSettiings();
 
    // this.CalendarOptions = {
    //   events: this.currentSectionEvent,
    // }
     // (<any>)this.CalendarOptions.events = this.currentSectionEvent;
   // this.fetchingAndConfiiguringCalendarEvents(this.currentSectionEvent);
      //this.settingPrimaryCalSettiings();
      this.calRefreshEvent(this.currentSectionEvent);
 
  }

  //SHOW THE SUBJECTS
  showSubjectsElement(){
      if(!this.subjectElmIsShown){
        this.subjectElmIsShown = true;
      }else{
        this.subjectElmIsShown = false;
      }
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
                      class_id: 1,
                      section_id : 5,
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
                (data:any) => this.showSuccess(data),
                  error => this.showError(error),
              )
        }


        //ONSUBMOIT DURATION CHANGE BY DRAGGING THE EVENT 
        onSubmitDurationChangeByDragging(){
          console.log(this.timetableDurationChange);
        }



      //CALENDAR REFRESH EVENTS, REFRESH EVENT 
       calRefreshEvent(originalEvnts:any) {
         //this.fullcalendarRef?.getApi().render();
          this.fullcalendarRef?.getApi().removeAllEventSources();
          this.fullcalendarRef?.getApi().addEventSource(originalEvnts);
          this.fullcalendarRef?.getApi().refetchEvents();
       }
      //SETTING CALENDAR SETTINGS
      //SETTING CALENDAR SETTINGS
      //SETTING CALENDAR SETTINGS
      //SETTING CALENDAR SETTINGS
      settingPrimaryCalSettiings(){
                  this.CalendarOptions = {
                    //CALENDER HEADERS
                    headerToolbar: {
                      left: 'prev,next today',
                      center: 'title',
                      right: 'timeGridWeek',
                    } ,
                      //CALENDER INITIAL VIEWS
                      height: 550,
                      lazyFetching: true,
                      nowIndicator: true,
                      refetchResourcesOnNavigate: true,
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

                      //EVENT CLICK 
                      eventClick: (info:any) => {
                        //INITIALIZING THE OBJECT OF SHOW SINGLE EVENT
                        this.timeTableShowClickedEventData.id = info.event.id;
                        this.timeTableShowClickedEventData.startTime = <any>moment(info.event.start).format('HH:MM:SS');
                        this.timeTableShowClickedEventData.endTime = <any>moment(info.event.end).format('HH:MM:SS');
                        this.timeTableShowClickedEventData.duration = <any>moment.duration(moment(info.event.end).diff(moment(info.event.start))).asMinutes();
                        this.timeTableShowClickedEventData.teacher = 'The Houssam';
                        this.timeTableShowClickedEventData.subject = 'Geographic';
                        this.timeTableShowClickedEventData.classRoom = info.event.classroom_id;

                       //console.log();
                        (<any>$('#brill_modal_show_single_timetable_event')).modal('show');
                        console.log(info.event);
                      },
                      // events:this.currentSectionEvent,
                      //SET DRAGGABLE DRAG SUBJECTS INTO THE CALENDER
                      businessHours: {
                      // days of week. an array of zero-based day of week integers (0=Sunday)
                      daysOfWeek: [ 1, 2, 3, 4 ,5 , 6 , 7], // Monday - Thursday
                    
                      startTime: '08:00', // a start time (10am in this example)
                      endTime: '18:00', // an end time (6pm in this example)

                    } , 


                  //ON THE USER STARTS DRUGGING 
                  //ON EVENT DRAGGING OR DROPPING
                        eventDragStart(info:any){
                          console.log(info.event.id);
                        } ,

                        select : (currentTimes:any) => {
                          //ASIGMING DATA TO THE OBJECT OF NEW EVENT
                          this.NewTimeTableEventData.date = <any>moment(currentTimes.startStr).format('HH:MM-yyyy');
                          this.NewTimeTableEventData.dayIndex = <any>moment(currentTimes.startStr).day() + 1;
                          this.NewTimeTableEventData.duration = <any>moment.duration(moment(currentTimes.endStr).diff(moment(currentTimes.startStr))).asMinutes();
                          this.NewTimeTableEventData.startTime = <any>moment(currentTimes.startStr).format('HH:MM');
                          this.NewTimeTableEventData.endTime = <any>moment(currentTimes.endStr).format('HH:MM');
                          this.NewTimeTableEventData.dayName = <any>moment(currentTimes.endStr).format('dddd');

                          
                         // console.log(this.NewTimeTableEventData);
                          // localStorage.setItem('eventStartTime',<any>currentTimes.startStr);
                          // localStorage.setItem('eventEndTime',<any>currentTimes.endStr);
                            //console.log(moment.duration(moment(currentTimes.endStr).diff(moment(currentTimes.startStr))).asMinutes());
                          (<any>$('#brill_modal_create_new_timetable_event')).modal('show');
                        } ,

                        eventDragStop : (info:any) => {
 
                        } ,

                        //ON EVENT DROPPED AND READY TO HOLD NEW INFO
                        eventDrop : (info:any) => {
                         //console.log(info.event);
                          // let eventId = (<number | any>$('#timetable_change_duration_input_event_id')).val();
                          this.timeTableService.getSingleEvent(info.event.id)
                            .subscribe(
                              (data:any) => {
                                this.timetableDurationChange.id = info.event.id,
                                this.timetableDurationChange.daysOfTheWeek = NaN;
                                this.timetableDurationChange.oldDayOfTheWeek = <any>this.getDayNameByNumber(data.data[0].daysOfWeek[0] + 1);
                                this.timetableDurationChange.NewDayOfTheWeek = <any>moment(info.event.end).format('dddd');;
                                //this.timetableDurationChange.oldDayOfTheWeek = <any>moment.weekdays()
                                this.timetableDurationChange.oldDuration = <any>moment.duration(moment('2021-05-11T' + data.data[0].endTime).diff(moment('2021-05-11T' + data.data[0].startTime))).asMinutes();
                                this.timetableDurationChange.NewDuration = <any>moment.duration(moment(info.event.end).diff(moment(info.event.start))).asMinutes();
                                this.timetableDurationChange.oldSartTime = data.data[0].startTime;
                                this.timetableDurationChange.oldEndTime = data.data[0].endTime;
                                this.timetableDurationChange.NewSartTime = <any>moment(info.event.start).format('HH:MM:SS'),
                                this.timetableDurationChange.NewEndTime = <any>moment(info.event.end).format('HH:MM:SS');
                                console.log('TESTING TIME AND DATE', moment('2021-05-11T' + data.data[0].endTime).format('YY:MM:SS HH:MM:SS'));
                                 
                                } , 
                              error => console.log('error', error)
                            );  

                          (<any>$('#brill_modal_resize_timetable_event')).modal('show');
                        },

                        drop(elem:any){
                          elem = <any>document.querySelector('.subjects-list-draggable');
                          elem.style.opacity = "1";
                        } , 

                        eventResizeStop(){
                          console.log("RESIZED FIXED ");
                          (<any>$('#brill_modal_resize_timetable_event')).modal('show');
                        }           
              };
              
      }



        //FETCHING AND ORGANIZING CALENDAR EVENTS
          // fetchingAndConfiiguringCalendarEvents(calEvents:any[]){
          //     //console.log(calEvents);
          //       let calInRendredEvnts = calEvents;
          //       let calOutRendredEvents:any[] = [];
          //         for(let i = 0; i < calInRendredEvnts.length ; i++){
          //             let event = {
          //               id : calInRendredEvnts[i].id | 1,
          //               title : calInRendredEvnts[i].subject + calInRendredEvnts[i].teacher,
          //               daysOfWeek : calInRendredEvnts[i].daysOfWeek, 
          //               classroom : calInRendredEvnts[i].classroom ,
          //               start_time : calInRendredEvnts[i].start_time ,
          //               end_time : calInRendredEvnts[i].end_time ,
          //               color : calInRendredEvnts[i].color ,
          //               timetable_day : calInRendredEvnts[i].timetable_day ,
          //               timetable_date : calInRendredEvnts[i].timetable_date
          //             }
          //           calOutRendredEvents.push(event);
          //         }
          //     this.refetshedAllSectionEvents = calOutRendredEvents;
          //    // this.calRefreshEvent(this.currentSectionEvent);
          // }

          //GET DAY NAME BY NUMBER FOR THE TIMRTABLE
          getDayNameByNumber(dayIndex:number | string):number | string{
               switch(dayIndex){
                 case 1 :
                    return "Sunday";
                    break;

                    case 2 :
                      return "monday";
                      break;  
                      case 3 :
                        return "tuesday";
                        break;
                        case 4 :
                          return "wedensday";
                          break;
                          case 5 :
                            return "thursday";
                            break;
                            case 6 :
                              return "friday";
                              break;
                              case 7 :
                                return "saturDay";
                                break;     
                                default: 
                                return NaN;                      

               }

          }

            //ENDS OF SETTING CALENDAR SETTINGS
            //ENDS OF SETTING CALENDAR SETTINGS
            //ENDS OF SETTING CALENDAR SETTINGS
            //ENDS OF SETTING CALENDAR SETTINGS
            //TOASTER TOASTER NOTIFICATION
            //SHOW SUCCESS
              showSuccess(msg: any) {
                console.log(msg);
              this.toastr.success(msg.message , 'Action Success!');
              
              }
              //SHOW SUCCESS
              showError(msg: any) {
                this.toastr.error( msg.error.message , 'Action Failed!');
                //console.log(this.fullcalendarRef);
              }

}
//addNewSingleEventTimeTable