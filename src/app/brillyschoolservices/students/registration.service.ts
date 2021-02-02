import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IDrafftedStudent } from './draffted-students';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private req:HttpClient) { }

  getDrafttedStudents(): Observable<IDrafftedStudent[]>{
    return this.req.get<IDrafftedStudent[]>('/assets/server-demo/getDrafft.json');
  }
}
