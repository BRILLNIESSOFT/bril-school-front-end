import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

//IMPORTING SERVICES
import { VehicleService } from '../../../brillyschoolservices/transportation/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

   
    //CLASS ROOM PHOTO PICKER
    public imageSrc?: any;
    
    /*
    * THE NECCERY APIs TO BE LOADED
    * WRITE AND READ THE APIs AVALIABLE
    */
    public allVehicles:any[] = [];


    constructor(private FB:FormBuilder , private vehicleService: VehicleService) { }

    ngOnInit(): void {
      //GET ALL AVALIABLE VEICLES
       this.vehicleService.getAllVeicles()
        .subscribe(
          (data:any) => this.allVehicles = data.data,
          error => console.log('ERROR', error)
        );
    }

    //TRANSPORTATION VEHICLE FORM GROUP
    transVehicleFormGroup = this.FB.group({
      vehicle: this.FB.group({
        vehicle_no: [''],
        model_name: [''],
        model_sub_name: [''],
        manufacture_year: [''],
        manufacturer:[''],
        seats: [],
        fuel_type: [''],
        image: [''],
        init_mileage: [''],
        current_mileage: [''],
        mileage_date_update:  [''],
        width:  [''],
        height:  [''],
        weight: [''],
        engine:  [''],
        power: [''],
        license: [''],
        registration_document: [''],
        note:  ['']       
      })
    });

    //GET THE IMAGE TO SHOW A PREVIEW FOR THE ADD NEW CLASS ROOM
    readURL(event: any): void {
      if (event.target?.files && event.target.files[0]) {
          const file = event.target.files[0];
  
          const reader = new FileReader();
          reader.onload = e => this.imageSrc = reader.result;
  
          reader.readAsDataURL(file);
      }
  }

  //SUBMIT NEW TRANSPORTATION VEHICLE
  onSubmitNewTransVehicle(){
     this.vehicleService.addNewVehicle(this.transVehicleFormGroup.value)
      .subscribe(
        (data:any) => console.log("THE DATA HAS BEEN ADDED", data),
        error => console.log("FAILED", error)
      );
  }
  

  
}
