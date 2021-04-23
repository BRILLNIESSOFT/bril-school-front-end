import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

//IMPORTING SERVICES
import { RoutesService } from '../../../brillyschoolservices/transportation/routes.service';


@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {

  //GET ALL THE TRANSPORTATION ROUTES ARRAY
  public allTransRoutes:any[] = [];

  constructor(private FB: FormBuilder , private transRouteSevice: RoutesService) { }

  ngOnInit(): void {
    //GET ALL THE ROUTES
     this.transRouteSevice.getAllTransRoutes()
      .subscribe(
        (data:any) => this.allTransRoutes = data.data,
        error => console.log("ERROR", error)
      );
  }


  //route FORM GROUP 
      //TRANSPORTATION VEHICLE FORM GROUP
      transRouteFormGroup = this.FB.group({
        transport_route : this.FB.group({
          name: [''],
          code: [''],
          description: [''],
          color: ['#fff'],
          note: ['']    
        })
      });


    //ADD NEW TRANSPORTATIONS ROUTE
    onSubmitNewTransRoute(){
     // console.log(this.transRouteFormGroup.value);
         this.transRouteSevice.addNewTransRoute(this.transRouteFormGroup.value)
          .subscribe(
            (data: any) => console.log("SUCCESS" , data),
            error => console.log("ERROR", error)
          );
    }

}
