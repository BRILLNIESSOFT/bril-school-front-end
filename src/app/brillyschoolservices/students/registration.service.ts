import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IDrafftedStudent } from './draffted-students';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private req:HttpClient) { }

  //  GET ALL THE DRAFFTED STUDENTS
  getDrafttedStudents(): Observable<IDrafftedStudent[]>{
    return this.req.get<IDrafftedStudent[]>('/assets/server-demo/getDrafft.json');
  }

  //REGISTARE NEW STUDENT (Submit the entire form data)
   submitToRegisterNewStudent(AllstudentData: any){
       return this.req.post('http://127.0.0.1:8000/api/students',AllstudentData);
   }

}
