import { Component, OnInit } from '@angular/core';
import { toggleFixedBottomMenu } from './../../../global-animation';
import { FormBuilder } from '@angular/forms';
//import services 
import { StaffService } from './../../../brillyschoolservices/staff.service';
import { RolesService } from '../../../brillyschoolservices/roles.service';
import { ClassService } from './../../../brillyschoolservices/classes/class.service';


@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.scss'],
  animations: [toggleFixedBottomMenu]
})
export class StaffsComponent implements OnInit {

  //ALL STAFFS 
  public allStaffs:any[] = [];

  //GET ALL CLASSES
  public allClasses:any[] = [];

  //ALL ROLES
  public allRolesArray:any[] = [];

  //BUTTOM FIXED BUTTON
  public bottomFixedMenuCase:boolean = true;

  //SHOW IF THE ROLE IS TEACHER SHOW THE OTHER OPTIONS
  public showOptionIfTeacher = false;

  constructor(private FB:FormBuilder, private classesService:ClassService ,private roleServices:RolesService ,private _staffServices:StaffService) { }

  ngOnInit(): void {
            //GET ALL ROLES AVALIABLE
            this.roleServices.getAllRoles()
            .subscribe( 
              (data:any) => this.allRolesArray = data.data,
              (error:any) => console.log("ERROR" , error)
            );

            //ALL STAFFS
            this._staffServices.getAllStaffs()
             .subscribe(
               (data:any) => this.allStaffs = data.data,
               error =>console.log("ERROR", error) 
             );
             
  }

  //ADDSTAFF FORM GROUP
  AddNewStaffFormGroup = this.FB.group({
      staff: this.FB.group({
        first_name: ['MOhssine khaloufi'] ,
        last_name: ['Khaloufi'] ,
        mid_name: ['El sahriano'] ,
        mid_name_ara: [''] ,
        first_name_ara: ['محسن '] ,
        last_name_ara: ['خلوفي'] ,
        phone: ['0670909856'] ,
        phone2: [''] ,
        mobile: [''] ,
        alt_email: [''] ,
        email: ['gmxtrr@gmail.com'] ,
        birth_date: ['1994/11/04'] ,
        birth_place: ['Laayoune'] , 
        occupation: ['Mathematech teacher'] , 
        familial_status: ['Celebatier'] ,
        relationship_type: ['Relebent'] ,
        contact_type: ['Fulltime'] ,
        gender: ['male'] ,
        cin: ['sh19934'] ,
        website: ['www.mohssine.com'] ,
        facebook: ['mohssine.fb.cm'] ,
        linkedin: ['linked.moh.com'] ,
        twitter: ['twitter.co.mnoh'] ,
        instagram: ['instagram.co.com'] ,
        image: ['moh.png'] ,
        note: ['The given staff is responsibile for testing data'] ,
        employee_id: ['34'] ,
        qualification: ['Phd'] ,
        work_exp: ['almost six years'] ,
        father_name: ['AbdelMalek'] ,
        mother_name: ['Hadha'] ,
        date_of_joining: [''] ,
        date_of_leaving: [''] ,
        basic_salary: ['4443'] ,
        work_shift: ['switch'] ,
        location: ['1234556,1224444'] ,
        resume: ['hamo.pdf'] ,
        joining_letter: ['joining.pdf'] ,
        resignation_letter: ['resigning.pdf'] ,
        department_id: [] ,
        salutation_id: [],
        role_id : [''],
        address: {
          line1: '' ,
          line2: '' ,
          country: '' ,
          state: '' ,
          city: '' ,
          zip: '' ,
          latitude: '' ,
          longitude: '' ,
          note: '' ,
        } 
      }),
  });


 //CHECK THE SELECTED ROLE
 onWhichRoleSelected(){
  // console.log("SELECTED ROLE IS", this.AddNewStaffFormGroup.get('staff.role_id')?.value);
      if(this.AddNewStaffFormGroup.get('staff.role_id')?.value != null && this.showOptionIfTeacher == false){
                       //GET ALL THE AVALIABLE CLASSES
                       this.classesService.getAllClass()
                       .subscribe(
                         (data:any) => this.allClasses = data.data,
                         error => console.log("error", error),
                         () => this.showOptionIfTeacher = true
                       );
      }

      console.log(this.allClasses);
 } 



  //ADD NE STAFF SUBMIT BUTTON 
  onAddNewStaff(){
    console.log(this.AddNewStaffFormGroup.value);
    this._staffServices.addNewStaff(this.AddNewStaffFormGroup.value)
     .subscribe(
       response => console.log("Response", response),
       error => console.log("Error occurs, try to enter the data again", error)
     );

  }

  onMouseOverTheFixedMenu(){
     this.bottomFixedMenuCase = false;
  }

  onMouseOutTheFixedMenu(){
    this.bottomFixedMenuCase = true;
  }

}
