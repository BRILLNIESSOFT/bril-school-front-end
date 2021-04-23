import { Component, OnInit } from '@angular/core';

//IMPORTING SERVICES
import { ClassService } from '../../../brillyschoolservices/classes/class.service';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

 
  constructor(private classService: ClassService) { }

  ngOnInit(): void {

  }


    //REGISTER THE TRANS ATTENDANCE BUTTON ACTIONS BTNS FUNTIONS
    onTransStudentP(){
        console.log("STUDENT ATTENDANCE PRESENT")
      }

    //REGISTER THE TRANS ATTENDANCE BUTTON ACTIONS BTNS FUNTIONS
    onTransStudentL(){
        console.log("STUDENT ATTENDANCE LATE")
    }

      //REGISTER THE TRANS ATTENDANCE BUTTON ACTIONS BTNS FUNTIONS
      onTransStudentA(){
          console.log("STUDENT ATTENDANCE ABSENTSE")
      }

}
