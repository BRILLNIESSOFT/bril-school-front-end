import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SubjectService } from './../../../brillyschoolservices/subject.service'

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  constructor(private FB:FormBuilder, private subjectService:SubjectService) { }

  //ALL SUBJJECTS 
  private allSubjects: any[] = [];
  //CREATE NEW FORM GROUP FOR THE SUBJECT OBJECT
  newSubjectForm = this.FB.group({
    subject: this.FB.group({
      name: ['nameeee'],
      code: ['codeeee'],
      description: ['desccc'],
      subject_type: ['not s'],
      color: ['#ffffff'],
      note: ['no notes']
    })
  });

  ngOnInit(): void {

    //GET ALL SUBJECTS 
    this.subjectService.getAllSubjects()
    .subscribe(
      (data:any) => this.allSubjects = data.data ,
      Error => console.log('ERROR', Error)
    );
  }

//SUBMIT NEW SUBJECT --- ONSUBMIT THE SUBJECT FORMGROUP
submitNewSubject(){
   this.subjectService.addNewSubject(this.newSubjectForm.value)
   .subscribe(
     Response => console.log("Response" , Response),
     error => console.log("ERROR", error)
   );
}

}
