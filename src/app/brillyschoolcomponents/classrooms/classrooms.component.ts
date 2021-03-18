import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit {

  //CLASS ROOM PHOTO PICKER
  public imageSrc?: any;

  constructor() { }

  ngOnInit(): void {

    
  }

  //GET THE IMAGE TO SHOW A PREVIEW FOR THE ADD NEW CLASS ROOM
  readURL(event: any): void {
    if (event.target?.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(file);
    }
}

}
