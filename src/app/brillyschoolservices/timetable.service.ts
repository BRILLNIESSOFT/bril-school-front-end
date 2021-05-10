import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  //ADD NEW TIMETABLE EVENT URL
  private addNewURL: string = 'http://127.0.0.1:8000/api/timetables/';
  private sectionEventURL: string = 'http://127.0.0.1:8000/api/timetables/data/class_section/6';

  constructor(private req: HttpClient) { }


  //ADD NEW TIMETABLE SINGLE EVENT
  addNewSingleEventTimeTable(data:any){
    return this.req.post(this.addNewURL,data);
  }


  //GETTING EVENTS OF A GIVEN SECTION
  getEventsOfSection(){
    return this.req.get(this.sectionEventURL);
  }
}
