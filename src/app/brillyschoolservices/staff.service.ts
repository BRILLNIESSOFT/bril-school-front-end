import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StaffService {

  //BASE URL
  public baseURL = 'http://127.0.0.1:8000/api/staffs/';


  

  constructor(private req:HttpClient) { }


  //ADD NEW STAFF FUNCTION
  addNewStaff(staffData:any){
    return this.req.post(this.baseURL, staffData);
  }

  //GET ALL STAFFS
  getAllStaffs(){
    return this.req.get(this.baseURL);
  }


  //GET ALL STAFFS BRIEF INFORMATION
  // getAllStaffsBried(){

  // }
}
