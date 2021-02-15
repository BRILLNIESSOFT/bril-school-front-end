import { Component, OnInit } from '@angular/core';
import { toggleFixedBottomMenu } from './../../../global-animation';


@Component({
  selector: 'app-classess',
  templateUrl: './classess.component.html',
  styleUrls: ['./classess.component.scss'] ,
  animations: [toggleFixedBottomMenu]

})
export class ClassessComponent implements OnInit {
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
