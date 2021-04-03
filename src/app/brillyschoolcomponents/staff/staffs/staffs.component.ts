import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { toggleFixedBottomMenu } from './../../../global-animation';
import { FormBuilder } from '@angular/forms';
//import services 
import { StaffService } from './../../../brillyschoolservices/staff.service';
import { RolesService } from '../../../brillyschoolservices/roles.service';
import { ClassService } from './../../../brillyschoolservices/classes/class.service';
import { SubjectService } from './../../../brillyschoolservices/subject.service';
 

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.scss'],
  animations: [toggleFixedBottomMenu]
})
export class StaffsComponent implements OnInit {

  //GETTING ELEMENTS REFRENCES
  //GET TEACHER SELECT SECTION
 //@ViewChild('sectionNameRef') teacherSectionRef?:ElementRef;

  //ALL STAFFS 
  public allStaffs:any[] = [];

  //GET ALL CLASSES
  public allClasses:any[] = [];

  //ALL ROLES
  public allRolesArray:any[] = [];

  //ALL SUBJECTS ARRAY
  public allSubjectsArray:any[] = [];

  //BUTTOM FIXED BUTTON
  public bottomFixedMenuCase:boolean = true;


  //SHOW IF THE ROLE IS TEACHER SHOW THE OTHER OPTIONS
  public showOptionIfTeacher = false;
  //SHOW THE BUTTON TO ADD SINGLE SUBJECT OF SECTIONS
  public addSingleSubjectButton = false;
  //TEACHER ARRAY TO CHECK IF A SUJECT SELECTED BEFOR SELECTING SECTIONS
  public TeachersubjectSelected = null;

  //SINGLE ARRAY OF SECTIONS
  public SingleArrayOfSections:any[] = [];

  //AN ARRAY HOLDING THE TEACHER SUBJECTS AND ITS SECTIONS
  public selectedTecherSubjectAndItsSections:any[] = [];

  constructor(private FB:FormBuilder, private subjectService:SubjectService ,private classesService:ClassService ,private roleServices:RolesService ,private _staffServices:StaffService) { }

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

             //GET ALL SUBJECTS
             this.subjectService.getAllSubjects()
             .subscribe(
                (data:any) => this.allSubjectsArray = data.data,
                error => console.log("ERROR", error)
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
        },
        caseTeacher : []
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
    this.AddNewStaffFormGroup.get('staff.caseTeacher')?.setValue(this.selectedTecherSubjectAndItsSections);
    console.log(this.AddNewStaffFormGroup.value);
    // this._staffServices.addNewStaff(this.AddNewStaffFormGroup.value)
    //  .subscribe(
    //    response => console.log("Response", response),
    //    error => console.log("Error occurs, try to enter the data again", error)
    //  );
}



//ON SELECT THE SUBJECT FOR THE TEACHER
onSelectTeacherSubject(teacherSubjectRef:any, subjectId:any){

//GET THE CHILDREN OF THIS REF PARENT
let childrenSubjects = teacherSubjectRef.parentNode.childNodes;
// console.log(childrenSubjects.length);
// childrenSubjects[2].style.opacity = "0.4";
  if(this.TeachersubjectSelected === null){
    this.TeachersubjectSelected = subjectId;
    teacherSubjectRef.style.opacity = "1";
    teacherSubjectRef.style.borderRight = "8px solid #474d5e";
   }else{

    for(let i = 0; i <= childrenSubjects.length; i++){
      try{
       childrenSubjects[i].style.opacity = "0.4";
      }catch(e){
        console.log("ERROR IS  UNDLED");
      }
    }
    
    //DISPLAYING SECTON WITH WHITE BACKGROUND
   // this.teacherSectionRef!.nativeElement.style.backgroundColor = "#ffffff";
    //TEACHER SUBJECT STYLING
     teacherSubjectRef.style.opacity = "1";
     teacherSubjectRef.style.borderRight = "8px solid #474d5e";
     this.TeachersubjectSelected = subjectId;

     //ENABLING THE USER TO SELECT SECTIONS
     //<ElementRef>this.teacherSectionRef!.nativeElement.disabled;
 
  }
   console.log(this.TeachersubjectSelected);
   // console.log(subjectId);
}


//SELECT A NEW SECTION 
onSelectSection(secId:number,secRef:any,classRef:any){
  // console.log(secId);
  // console.log(secRef);
  // console.log(classRef);

  //STYLING THE SELECTED SECTIONS
  if(this.TeachersubjectSelected){
    this.onSelectedSectionStyling(secId,secRef,classRef);
  }
}

//STYLING THE ONSELECTED SECTIONS
onSelectedSectionStyling(secId:any,sectionRef:any,classRef:any){


if(this.SingleArrayOfSections.includes(secId)){
   let checkIfArrayExist = this.SingleArrayOfSections;
      this.SingleArrayOfSections.splice(checkIfArrayExist.indexOf(secId,1));
      // classRef.style.backgroundColor = "#009ab3";
      // classRef.style.color = "#ffffff";
      sectionRef.style.backgroundColor = "#ffffff";
      sectionRef.style.color = "#000000";
      console.log("already exits ");

}else{
     this.SingleArrayOfSections.push(secId);
     if(this.SingleArrayOfSections.includes(secId)){
      sectionRef.style.backgroundColor = "#028dad";
      sectionRef.style.color = "#ffffff";
      console.log("SELECTED ");
     }else{
      sectionRef.style.backgroundColor = "#ebebeb";
      sectionRef.style.color = "#000000";
     }
}

if(this.SingleArrayOfSections.length >= 1){  
 
  this.addSingleSubjectButton = true;
}


if(this.SingleArrayOfSections.length === 0){
 
    this.addSingleSubjectButton = false;
}


    // if(!this.SingleArrayOfSections.includes(secId)){
    //   classRef.style.backgroundColor = "#009ab3";
    //   classRef.style.color = "#ffffff";
    //   sectionRef.style.backgroundColor = "#028dad";
    //   sectionRef.style.color = "#ffffff";
    //   this.SingleArrayOfSections.push(secId);
    // } 

 console.log(this.SingleArrayOfSections);

}


onStoreSingleSubjectSects(){
  
  console.log(document.getElementById('teacher_prestored_subjects_holder'));
  //ADD NEW SET OF SECTIONS
  try{
      this.selectedTecherSubjectAndItsSections.push({
      subjectId: this.TeachersubjectSelected ,
      sectionsIds: this.SingleArrayOfSections
    });
    this.TeachersubjectSelected = null;
    this.SingleArrayOfSections = [];
     let subjectsItemsRefs = <any>document.getElementById('teacher_subjects_section')?.getElementsByTagName('button');

                       //LOOP TO SET THE BACKGROUND COLOR OF THE ITEMS
                       for(let j = 0; j <= subjectsItemsRefs.length ; j++){
                           subjectsItemsRefs[j].style.opacity = "0.4";
                           subjectsItemsRefs[j].style.border = "none";
                         }
          }catch(e){

 }

      try{
        let sectsItemsRefs = <any>document.getElementById('teacher_sections')?.getElementsByTagName('button');
                 //LOOP TO SET THE BACKGROUND COLOR OF THE ITEMS
                 for(let i = 0; i <= sectsItemsRefs?.length ;i++){
                  sectsItemsRefs[i].style.backgroundColor = "#ffffff";
                  sectsItemsRefs[i].style.color = "#000000";
                 }
      }catch(e){

      }        

  

  console.log(this.selectedTecherSubjectAndItsSections);
}
 

//BUTTOM MENU OPTIONS BAR
  onMouseOverTheFixedMenu(){
     this.bottomFixedMenuCase = false;
  }

  onMouseOutTheFixedMenu(){
    this.bottomFixedMenuCase = true;
  }

}
