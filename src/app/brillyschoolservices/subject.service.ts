import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISubjets } from './ISubjects';
import { Observable } from 'rxjs';

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

  //GET ALL SUBJECTS 
  public getAllSubjects(){
    return this.req.get(this.baseUrl);
  }
}
