import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private baseUrl: string = 'http://127.0.0.1:8000/api/subjects/';

  constructor(private req:HttpClient) { }

  //ADD NEW SUBJECT
  addNewSubject(subjectData:any){
    return this.req.post(this.baseUrl, subjectData);
  }
}
