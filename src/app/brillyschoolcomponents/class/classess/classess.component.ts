import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { toggleFixedBottomMenu } from './../../../global-animation';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-classess',
  templateUrl: './classess.component.html',
  styleUrls: ['./classess.component.scss'] ,
  animations: [toggleFixedBottomMenu]

})
export class ClassessComponent implements OnInit {
  public bottomFixedMenuCase:boolean = true;



  constructor(private FB:FormBuilder) { }

  ngOnInit(): void {
  }

  //NEW CLASS FORM DATA OBJECT
  newClassForm = this.FB.group({

  });

  //HIDE AND SHOW THE BOTTOM RIGHT MENU BAR 
  onMouseOverTheFixedMenu(){
    this.bottomFixedMenuCase = false;
 }
 onMouseOutTheFixedMenu(){
   this.bottomFixedMenuCase = true;
 }
   //HIDE AND SHOW THE BOTTOM RIGHT MENU BAR  ENDS


}
