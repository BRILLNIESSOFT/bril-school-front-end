import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-attandance',
  templateUrl: './attandance.component.html',
  styleUrls: ['./attandance.component.scss']
})
export class AttandanceComponent implements OnInit {

  //ATTENDANCE ARRAY TO HOLD THE USER ARRAY LISTS
  public checkedStudentsIds:number[] = [];

  constructor() { }

  ngOnInit(): void {
  }



  //STUDENT ONCLICK THE BTN PRESENT
  onStudentP(studentCardRef:any){
    //STYLE THE CARD BEFOR SUBMITING IT
    this.styleTheStudentCardCard("P", studentCardRef);
    console.log(studentCardRef);
  }

    //STUDENT ONCLICK THE BTN PRESENT
    onStudentL(studentCardRef:any){
      //STYLE THE CARD BEFOR SUBMITING IT
      this.styleTheStudentCardCard("L", studentCardRef);
      console.log(studentCardRef);
    }

      //STUDENT ONCLICK THE BTN PRESENT
  onStudentA(studentCardRef:any){
    //STYLE THE CARD BEFOR SUBMITING IT
    this.styleTheStudentCardCard("A", studentCardRef);
    console.log(studentCardRef);
  }



  //STYLING THE STUDENT CARD ACCORDING TO WHICH BTN THE USER CLICKED
  styleTheStudentCardCard(status:string,studentCardRef:any){
    if(status === 'P'){
      studentCardRef.style.border = "8px solid #12dc96";
      
    }

    if(status === 'L'){
      studentCardRef.style.border = "8px solid #00b4cc";
      
    }

    if(status === 'A'){
      studentCardRef.style.border = "8px solid #c40454";
      
    }
    
  }




}
