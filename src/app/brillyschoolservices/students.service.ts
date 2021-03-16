import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {


  //BASE URL
  public baseURL:string = "http://127.0.0.1:8000/api/students/";

  constructor(private req:HttpClient) { }

  //GET ALL STUDENTS
   getAllStudents(){
      return this.req.get(this.baseURL);
   }
}
