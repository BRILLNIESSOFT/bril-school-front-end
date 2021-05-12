import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  //ADD NEW TIMETABLE EVENT URL
  private baseURL: string = 'http://127.0.0.1:8000/api/timetables/';
   private sectionEventURL: string = 'data/class_section/5';
  private singleEventURL: string = 'data/';

  constructor(private req: HttpClient) { }


  //ADD NEW TIMETABLE SINGLE EVENT
  addNewSingleEventTimeTable(data:any){
    return this.req.post(this.baseURL,data);
  }


  //GETTING EVENTS OF A GIVEN SECTION
  getEventsOfSection(){
    return this.req.get(this.baseURL + this.sectionEventURL);
  }

    //GET A SINGLE EVENT BY ID
    getSingleEvent(eventId:number | string){
      return this.req.get(this.baseURL + this.singleEventURL + eventId);
    }

}
