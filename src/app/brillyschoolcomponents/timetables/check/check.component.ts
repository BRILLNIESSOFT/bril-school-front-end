import { Component, OnInit } from '@angular/core';

//FULL CALENDER IMPORTS 
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking


@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {

  //INIZIALIZING THE CALENDER SETTING THE DEFUAL OPTIONS
  timeTableCalendarOptions: CalendarOptions = {
    //CALENDER HEADERS
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay',
    } ,
    //CALENDER INITIAL VIEWS
    height: 550,
    initialView: 'dayGridWeek',
     weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    //CALENDER EVENTS
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2021-02-21T00:00:00' },
      { title: 'event 2', date: '2021-02-21T00:01:00' }
    ] ,

    //SET DRAGGABLE DRAG SUBJECTS INTO THE CALENDER

  };

  constructor() { }

  ngOnInit(): void {
  }


  //ONCLICK EVENT
  handleDateClick(arg:any) {
    alert('date click! ' + arg.dateStr)
  }
}
