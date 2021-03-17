import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class StudentsService {


  //BASE URL
  public baseURL:string = "http://127.0.0.1:8000/api/students/";

  //FIND STUDENT BRIEF INFORMAATION
  public studentBriefInfo:string = "http://127.0.0.1:8000/api/students/find/less/";

  constructor(private req:HttpClient) { }

  //GET ALL STUDENTS
   getAllStudents(){
      return this.req.get(this.baseURL);
   }
   
   //GET STUDENT BRIEF INFORMATION
   getStudentBriefInfo(id:number){
     return this.req.get(this.studentBriefInfo + id)
   }
}
