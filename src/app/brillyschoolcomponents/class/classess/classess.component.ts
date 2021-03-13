import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { toggleFixedBottomMenu } from './../../../global-animation';
import { FormBuilder } from '@angular/forms';

//IMPORTING BRILL SERVICES
import { ClassService } from './../../../brillyschoolservices/classes/class.service';
import { SubjectService } from './../../../brillyschoolservices/subject.service';


@Component({
  selector: 'app-classess',
  templateUrl: './classess.component.html',
  styleUrls: ['./classess.component.scss'] ,
  animations: [toggleFixedBottomMenu]

})
export class ClassessComponent implements OnInit {
  public bottomFixedMenuCase:boolean = true;

  //GET ALL SECTIONS 
  public allSubjectsList: any [] = [];

  constructor(private FB:FormBuilder, private addNewClassSer: ClassService ,
    public subjectsService: SubjectService) { }

  ngOnInit(): void {
    //ASSIGN ALL SECTION TO THE MEMBER VARIABKE
      this.subjectsService.getAllSubjects()
      .subscribe(
        (data:any) => this.allSubjectsList = data.data,
        Error => console.log('ERROR', Error)
      );


   }

  
  

  //NEW CLASS FORM DATA OBJECT
  newClassForm = this.FB.group({
        class: this.FB.group({
          name: ['fddsf'] ,
          code: ['fdsdfdf'] ,
          description : ['dsfsdf'] ,
          note: ['fsdfsfs'] 
        })
  });

  //NEW SECTION FOMR DATA OBJECT
  addNewSectionForm = this.FB.group({
    section: this.FB.group({
          class_id: [''],
          name: [''],
          code: [''],
          description: [''],
          note: [''],
          seats: ['']
        })
  });

  //SECTIONS SUBJECT ASSIGNER
  public sectionSubjectsAssiner = [];

  //HIDE AND SHOW THE BOTTOM RIGHT MENU BAR 
     onMouseOverTheFixedMenu(){
        this.bottomFixedMenuCase = false;
          }
     onMouseOutTheFixedMenu(){
      this.bottomFixedMenuCase = true;
        }
 //HIDE AND SHOW THE BOTTOM RIGHT MENU BAR  ENDS


 //ADD NEW CLASS SUBMIT BUTTON
 submitNewClass(){
    this.addNewClassSer.addNewClassService(this.newClassForm.value) 
    .subscribe(
      response => console.log('RESPONSE', response),
      error => console.log("ERROR OCCURS", error)
    );
 }

 //GET ALL CLASSS AND FILTER TO GET ID AND NAME
 //getAllClass{}
 getClassesIdName(){
   let classesIdAndNames; 
    this.addNewClassSer.getAllClass()
      .subscribe(
           Response => classesIdAndNames = Response,
           error => console.log("error occurs", error)
      );

      console.log(classesIdAndNames);
 }

 //ADD NEW SECTION SUBMIT BUTTON
 submitNewSction(){
    console.log(this.addNewSectionForm.value);
    this.addNewClassSer.addNewSectionService(this.addNewSectionForm.value)
    .subscribe(
      response => console.log('RESPONSE', response),
      error => console.log("ERROR OCCURS", error)
    );
  }

  // ON CHECK SELECT BUTTON
  onCheckSubject(subjictRef:any,subId:number):void{
       if(!this.sectionSubjectsAssiner.includes(<never>subId)){
          this.onStyleSelectedSubjects(subjictRef);
          this.sectionSubjectsAssiner.push(<never>subId);
          console.log(this.sectionSubjectsAssiner);
       }else{
         const subIndex =  this.sectionSubjectsAssiner.indexOf(<never>subId);
        this.sectionSubjectsAssiner.splice(subIndex, 1);
        this.onStyleUnSelectedSubjects(subjictRef);
        console.log(this.sectionSubjectsAssiner);
       }

  }

  //STyling the SELECCTED SUBJECTS
  onStyleSelectedSubjects(objRef:any){
    objRef.style.borderRight = "12px solid #474d5e";
    objRef.style.height = "50px";
    objRef.style.fontWeight = "700";
    objRef.style.opacity = "1";
  }

  //RESETTING AND UNSTYLING UNSELECTED ITEMS
  onStyleUnSelectedSubjects(objRef:any){
    objRef.style.borderRight = "1px solid #ffffff";
     objRef.style.opacity = "0.4";
  }


}
