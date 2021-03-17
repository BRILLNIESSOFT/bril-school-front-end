import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../brillyschoolservices/roles.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.scss']
})
export class DesignationsComponent implements OnInit {

  constructor(private roleService:RolesService, private FB:FormBuilder) { }

  public allRoles:any [] = [];

      ngOnInit(): void {
        //GET ALL ROLES AVALIABLE
        this.roleService.getAllRoles()
          .subscribe( 
            (data:any) => this.allRoles = data.data,
            error => console.log("ERROR" , error)
          );

      }

      //ROLE FORM GROUP
      addRoleForm = this.FB.group({
           role: this.FB.group({
            name: [''] ,
            code: [''] ,
            description: [''] ,
            note: [''] 
           })
      });


   onSubmitNewRole(){
    this.roleService.addNewRole(this.addRoleForm.value)
     .subscribe(
       (data:any) => console.log("Error",) , 
       error => console.log("ERROR" , error)
     );
      

  }

}
