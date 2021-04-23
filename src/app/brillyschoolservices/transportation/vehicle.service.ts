import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class VehicleService {

  private baseUrl:string = 'http://127.0.0.1:8000/api/vehicles';

  constructor( private req:HttpClient ) { }


    //ADD NEW VEHICLE
    addNewVehicle(data:any){
      return this.req.post(this.baseUrl,data);
    }

    //GET ALL VEICLE AVALIABLE
    getAllVeicles(){
      return this.req.get(this.baseUrl);
    }


}
