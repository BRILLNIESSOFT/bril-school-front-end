import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private req:HttpClient) { }


  //ADD NEW STAFF FUNCTION
  addNewStaff(staffData:any){
    return this.req.post('http://127.0.0.1:8000/api/staffs/', staffData);
  }
}
