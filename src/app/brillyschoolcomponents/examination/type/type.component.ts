import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

//IMPORTIN SERVICES
//IMPORT EXAMINATION TYPE SERVICE
import { TypeService } from '../../../brillyschoolservices/examination/type.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {

  public allExamTypes:any[] = [];

  constructor( private FB: FormBuilder , private examTypeService: TypeService) { }

  ngOnInit(): void {
    //GET ALL PAYMENT TYPES
    this.examTypeService.getAllExamTypes()
     .subscribe(
       (data:any) => this.allExamTypes = data.data,
       error => console.log("error", error)
     );
  }


  // THE ADD NEW EXAMANATION TYPE FORM GROUP
  ExaminationTypeFormGroup = this.FB.group({
    exam_type : this.FB.group({
       name : [''],
       code : [''] ,
       description: [''],
       color: [''],
       note: ['']
    })      
  });


  //ADD NEW EXAMINATION TYPR
  submitNewExaminationType(){
    // console.log(this.ExaminationTypeFormGroup.value);
    this.examTypeService.addNewExaminationType(this.ExaminationTypeFormGroup.value)
     .subscribe(
       (data: any) => console.log("SUCCESS", data), 
       error => console.log("ERROE", error)
     )
  }



}
