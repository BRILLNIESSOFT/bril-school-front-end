import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { StudentsService } from '../../../brillyschoolservices/students.service';

@Component({
  selector: 'app-student-payment',
  templateUrl: './student-payment.component.html',
  styleUrls: ['./student-payment.component.scss']
})
export class StudentPaymentComponent implements OnInit {

  //all student array 
  public allStudentArray:any[] = [];
  public selectSrudentName?: number;
  //SET DATA FOR STUDENT
 // public StudentCard:object = {};
  
  constructor(private studentServices:StudentsService) { }

    ngOnInit(): void {
      //GETT ALL STUDENTS
      this.studentServices.getAllStudents()
       .subscribe(
         (data:any) => this.allStudentArray = data.data,
         error => console.log(error)
       )
    }



    //studentNameInputChanged FIRE AN EVENT
    studentNameInputChanged(){
      console.log("CHANGED" , this.selectSrudentName);
     
    }

}
