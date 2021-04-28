import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class TypeService {

  private baseURL:string = 'http://127.0.0.1:8000/api/';
  private examType:string = 'exam_types';

  constructor( private req: HttpClient ) { }

    // ADD NEW EXAMINATION TYPE
    addNewExaminationType(data:any){
      return this.req.post(this.baseURL + this.examType, data)
    }

    //GET ALL EXAM TYPES
    getAllExamTypes(){
      return this.req.get(this.baseURL + this.examType);
    }


}
