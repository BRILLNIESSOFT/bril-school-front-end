import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { from } from 'rxjs';
import { StudentsService } from '../../../brillyschoolservices/students.service';
import { IStudentBrief } from './../../../brillyschoolservices/students/IStudent-brief';

@Component({
  selector: 'app-student-payment',
  templateUrl: './student-payment.component.html',
  styleUrls: ['./student-payment.component.scss']
})
export class StudentPaymentComponent implements OnInit {

  //GET ELEMENT STUDENT PREVIEW
  //@ViewChild('studentInfoPreview') studentPreviewElement?: ElementRef;
  //@ViewChild('studentInfoPreviewNull') studentPreviewElementNull?: ElementRef;


  //all student array 
  public allStudentArray:any[] = [];
  public selectSrudentName?: number;
  //SET DATA FOR STUDENT
 // public StudentCard:object = {};

  //SHWING AND HIDING ELEMENT STUDENT PREVIEW
  public isPreiwed:boolean = false;
  public isNullPrivied:boolean = true;
  //SET  BRIEFINFORMATION TO SHOW AFTER  INITIALIZING
   public studentBriefInfoArray:any[]= [];

  
  constructor(private studentServices:StudentsService) { }

    ngOnInit(): void {
      //HIDING STUDDNT ELEMENT REF FOR STUDENT PREVIEW INFORMATION
       //GETT ALL STUDENTS
      this.studentServices.getAllStudents()
       .subscribe(
         (data:any) => this.allStudentArray = data.data,
         error => console.log(error)
       )
    }



    //studentNameInputChanged FIRE AN EVENT
    studentNameInputChanged(){      
      this.isNullPrivied = true;
      console.log("CHANGED" , this.selectSrudentName);
      this.studentServices.getStudentBriefInfo(<number>this.selectSrudentName)
       .subscribe(
          (data:any) => {
            if(this.isNullPrivied){
              this.studentBriefInfoArray = data.data;
            }else{
              this.studentBriefInfoArray = []
            }
          } ,
          error => console.log(error) , 
          () => {
            //RETRIEVING THE STTUDENT PRIVIEW CARD TRUE TO FALSE
            this.isPreiwed = true;
            this.isNullPrivied = false;
           },
       );

      if(this.selectSrudentName != null){
         //SHOW THE STUDENT BRIEF PREVIW INFORMATIONS
         this.showStudentPreview();
      }else{
            //RETRIEVING THE STTUDENT PRIVIEW CARD TRUE TO FALSE
           this.isPreiwed = false;
           this.isNullPrivied = true;
           this.studentBriefInfoArray = [];
      }

    }


    //SHOW STUDENT PREVIEW
    showStudentPreview(){
       //CHECK IF ARRAY IS NOT EMPTY
           if(this.selectSrudentName != undefined || this.selectSrudentName != null){
            console.log("NOT NULL" , this.selectSrudentName);
            console.log("NOT NULL" , typeof this.selectSrudentName);

           }else{
            console.log(" NULL" , this.selectSrudentName);

           }

     }
  

}
