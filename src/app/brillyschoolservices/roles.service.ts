import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RolesService {

  //ROLL BASE URL for post and get all roles
  private baseURL:string = "http://127.0.0.1:8000/api/roles";
  //ONE SINGLE ROLL

  constructor(private http:HttpClient) { }

  //GET ALL ROLES 
   getAllRoles(){
     return this.http.get<any>("http://127.0.0.1:8000/api/roles/");
   }

   //GET A ROLE BY ID

  //ADD NEW ROLE
  addNewRole(data:any){
    return this.http.post(this.baseURL,data);
  }
}
