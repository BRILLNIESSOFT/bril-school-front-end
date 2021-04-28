import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { toggleFixedBottomMenu } from './../../../global-animation';
import { showClassDetails } from './../classess/classess-animations';

 import { FormBuilder } from '@angular/forms';


 
//IMPORTING BRILL SERVICES
import { ClassService } from './../../../brillyschoolservices/classes/class.service';
import { SubjectService } from './../../../brillyschoolservices/subject.service';


@Component({
  selector: 'app-classess',
  templateUrl: './classess.component.html',
  styleUrls: ['./classess.component.scss'] ,
  animations: [toggleFixedBottomMenu,showClassDetails]

})
export class ClassessComponent implements OnInit {
  public bottomFixedMenuCase:boolean = true;

  //CURRENT SELECTED CLASS INFO
  public CurrentselectedClass:any = {};

  //GETTING ALL THE NESSESERY APIS TO FETCH
   public ClassesArray:any = [];
  //GET ALL SECTIONS 
  public allSubjectsList: any [] = [];
    //SECTIONS SUBJECT ASSIGNER
    public sectionSubjectsAssiner = [];

    //ON CLASS DETAILS IS SHOWN
    public classDetailsShown:boolean = false;

 //CONSTRUCTION FUBCTIONS
  constructor(private FB:FormBuilder, private addNewClassSer: ClassService ,
    public subjectsService: SubjectService) {
        //GIDE THE CLASS DETAILS ALL INCLUDING CLASS SECTION ON DUCEMENT CLICKED
 
     }

  ngOnInit(): void {
    //ASSIGN ALL SECTION TO THE MEMBER VARIABKE
      this.subjectsService.getAllSubjects()
      .subscribe(
        (data:any) => this.allSubjectsList = data.data,
        Error => console.log('ERROR', Error)
      );

      //FETCHING CLASSES
      this.addNewClassSer.getAllClass()
        .subscribe(
          (data :any) => this.ClassesArray = data.data ,
          error => console.log('error', error)
        ) 


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
          seats: [''] ,
          subjects: []
        })
  });



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
          this.addNewSectionForm.get('section.subjects')?.setValue(this.sectionSubjectsAssiner);
          // console.log(this.addNewSectionForm.get('section.subjects')?.setValue(this.sectionSubjectsAssiner));
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

  OnshowClassDetails(classId: number | string){
    if( this.classDetailsShown === false){

      this.addNewClassSer.getClassById(classId)
       .subscribe(
          (data: any) => this.CurrentselectedClass = data,
           error => console.log("ERROR", error) ,
           () => {
            const slideMP3 = new Audio();
            slideMP3.src = "../../../assets/sounds/slidebutton.wav";
            slideMP3.load();
            slideMP3.play();
            this.classDetailsShown = true;
            console.log(this.CurrentselectedClass);
           }
       );


    }
  }

    //GIDE THE CLASS DETAILS ALL INCLUDING CLASS SECTION ON DUCEMENT CLICKED

  onHideTheClassDetails(){
     if( this.classDetailsShown === true){
      this.CurrentselectedClass = {};
      this.classDetailsShown = false;
    }
  }
  

 


}
