import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

//IMPORTIN SERVICES
//IMPORT EXAMINATION TYPE SERVICE
import { TypeService } from '../../../brillyschoolservices/examination/type.service';
import { ExamService } from '../../../brillyschoolservices/examination/exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})

export class ExamComponent implements OnInit {
  

  //ALL THE EXAMS TYPE ARAAY FROM EXAM TYPE SERVICE
  public allExamTypes:any[] = [];
  //ALL AVALIABLE EXAMS ARE STORED IN THIS ARRAY
  public allExamsArr:any[] = [];

  constructor( private examTypeService: TypeService , private FB: FormBuilder, 
               private examExamService: ExamService) { }

  ngOnInit(): void {
      //GET ALL EXAMINATION TYPES
      this.examTypeService.getAllExamTypes()
        .subscribe(
          (data: any) => this.allExamTypes = data.data ,
          error => console.log("ERROR", error)
        );

        //GET ALL AVALIBALE EXAMS
        this.examExamService.getAllAvaliableExams()
        .subscribe(
          (data:any) => this.allExamsArr = data.data,
          error => console.log("ERROR", error)
        );
  }

   //EXAMINATION EXAM FORM GROUP
   ExaminationExamFormGroup = this.FB.group({
       exam : this.FB.group({
        exam_type_id : [''],
        name : [''] ,
        code: [''],
        color: [''],
        description: [''],
        note: ['']
      })   
   });

   
    //ADD NEW EXAMINATION
    submitNewExaminationExam(){
      this.examExamService.addNewExam(this.ExaminationExamFormGroup.value)
        .subscribe(
            (data: any) => console.log("SUCCESS", data) ,
            error => console.log("ERROE", error)
        );
    }

}
