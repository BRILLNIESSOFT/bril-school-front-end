import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ClassroomService {

  //CLASS ROOM BASE URL
  public baseURL:string = 'http://127.0.0.1:8000/api/classrooms'; 
  //GET CLASS ROOM LESS APIs
  public classRoomsLess: string = 'http://127.0.0.1:8000/api/classrooms/all/less';

  constructor(private req:HttpClient) { }

  //ADD NEW CLASS ROOM 
  addNewClassRoom(data:any){
   return this.req.post(this.baseURL,data);
  }

  //GET ALL CLASSROOMS LESS INFO
  getClassRoomsLes(){
    return this.req.get(this.classRoomsLess);
  }
}
