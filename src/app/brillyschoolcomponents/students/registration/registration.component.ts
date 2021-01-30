import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public showAllDraffts = document.querySelector('#show_all_draffts');

  constructor() { 
    console.log(this.showAllDraffts);  
    
  }

  ngOnInit(): void {
  }
  
  
}
