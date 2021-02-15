import { Component, OnInit } from '@angular/core';
import { toggleFixedBottomMenu } from './../../../global-animation';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.scss'],
  animations: [toggleFixedBottomMenu]
})
export class StaffsComponent implements OnInit {

  public bottomFixedMenuCase:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }


  onMouseOverTheFixedMenu(){
     this.bottomFixedMenuCase = false;
  }

  onMouseOutTheFixedMenu(){
    this.bottomFixedMenuCase = true;
  }

}
