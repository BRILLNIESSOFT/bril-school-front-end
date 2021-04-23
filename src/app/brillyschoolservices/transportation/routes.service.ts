import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  //BASE URL OF THE ROUTING MODULE
  public baseURL:string = 'http://127.0.0.1:8000/api/transport_routes';

  constructor(private req:HttpClient) { }

    //ADD NEW ROUTE
    addNewTransRoute(data:any){
      return this.req.post(this.baseURL, data);
    }

    //GET ALL TRANSPORTATION ROUTES
    getAllTransRoutes(){
      return this.req.get(this.baseURL);
    }

}
