 export const CalendarOptions = {
        //CALENDER HEADERS
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek',
        } ,
          //CALENDER INITIAL VIEWS
          height: 550,
          lazyFetching: false,
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
          eventClick: () => {
           //console.log();
            (<any>$('#brill_modal_show_single_timetable_event')).modal('show');
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
            eventDragStart( ){
              console.log("STARTED ");
            } ,

            select : (currentTimes:any) => {
              //ASIGMING DATA TO THE OBJECT OF NEW EVENT
              this.NewTimeTableEventData.date = <any>moment(currentTimes.startStr).format('HH:MM-yyyy');
              this.NewTimeTableEventData.dayIndex = <any>moment(currentTimes.startStr).day();
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

 