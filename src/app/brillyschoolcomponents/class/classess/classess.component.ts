import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { toggleFixedBottomMenu } from './../../../global-animation';
import { FormBuilder } from '@angular/forms';

//IMPORTING BRILL SERVICES
import { ClassService } from './../../../brillyschoolservices/classes/class.service';


@Component({
  selector: 'app-classess',
  templateUrl: './classess.component.html',
  styleUrls: ['./classess.component.scss'] ,
  animations: [toggleFixedBottomMenu]

})
export class ClassessComponent implements OnInit {
  public bottomFixedMenuCase:boolean = true;



  constructor(private FB:FormBuilder, private addNewClassSer: ClassService) { }

  ngOnInit(): void {
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

}
