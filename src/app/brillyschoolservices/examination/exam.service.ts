import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private baseURL:string = 'http://127.0.0.1:8000/api/';
  private examType:string = 'exams';

  constructor(private req: HttpClient) { }

  //GET ALL AVALIABLE EXAMS
  getAllAvaliableExams(){
    return this.req.get(this.baseURL + this.examType);
  }

  //ADD NEW EXAM 
  addNewExam(data:any){
       return this.req.post(this.baseURL + this.examType,data);
  }
}
