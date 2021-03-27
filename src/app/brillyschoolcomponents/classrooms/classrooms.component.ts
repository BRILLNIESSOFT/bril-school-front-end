import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { error } from 'selenium-webdriver';
import { ClassroomService } from './../../brillyschoolservices/classroom.service';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit {

  //GET ALL CLASS ROOM LESS INFO
  public allClassRoomsLess:any[] = [];

  //CLASS ROOM PHOTO PICKER
  public imageSrc?: any;

  constructor(private FB:FormBuilder, private classRoomService:ClassroomService) { }

  ngOnInit(): void {

    //GET CLASS ROOM LESS INFO
    this.classRoomService.getClassRoomsLes()
     .subscribe(
       (data: any) => this.allClassRoomsLess = data.data,
       error => console.log("error", error)
     )

  }


  // FORM GROUP TO ADD A NEW CLASSROOM
  classRoomFormGroup = this.FB.group({
    classroom: this.FB.group({
      number: [''], 
      name: [''], 
      code: [''], 
      description: [''], 
      color: [''], 
      seats: [''], 
      Image: [''] ,
      note: ['']

    })
  });

  //GET THE IMAGE TO SHOW A PREVIEW FOR THE ADD NEW CLASS ROOM
  readURL(event: any): void {
    if (event.target?.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(file);
    }
}

//ADD NEW CLASS ROOM TO THE DATABASE
  onSubmitNewClassRoom(){
        this.classRoomService.addNewClassRoom(this.classRoomFormGroup.value)
          .subscribe(
            (data:any) => console.log("success",data),
             error => console.log("SUCCEDED", error)
          )
    }

}
