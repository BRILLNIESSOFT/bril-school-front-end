import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
//import services 
  import { ClassService } from './../../../brillyschoolservices/classes/class.service';


@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {


  //PAYMENT MASTER FEE
    //GET ALL CLASSES
    public allClasses:any[] = [];
    //ALL SECTIONS TO THE ARRAY
    public allSectionsToTheFee:any[] = [];




  constructor(private FB:FormBuilder, private classesService:ClassService) { }

      ngOnInit(): void {
                          //GET ALL THE AVALIABLE CLASSES
              this.classesService.getAllClass()
                  .subscribe(
                    (data:any) => this.allClasses = data.data,
                    error => console.log("error", error)
                    );    
      }

  //NEW MASTER FEE FORM DATA
  paymentMasterForm = this.FB.group({
    fee_master: this.FB.group({
       class_section_id: [''],
       fee_type_id: [''],
       amount: [''],
       due_date: [''],
       due_date_max: [''], 
       sections_id: []
    })
  });



// SELECT MASTER SECTION 
    seectMasterSection(id:any,secRef:any,classNameRef:any){
      console.log(id + secRef + classNameRef);
      if(this.allSectionsToTheFee.includes(id,1)){
        this.allSectionsToTheFee.pop();
        console.log(this.allSectionsToTheFee);
      }else{
        this.allSectionsToTheFee.push(id);
        console.log(this.allSectionsToTheFee);
      }

      this.paymentMasterForm.get('fee_master.sections_id')?.setValue(this.allSectionsToTheFee);

    }

    
  //ON SUBMIT NEW FEE MASTER
  onSubmitNewpaymentMaster(){
    console.log(this.paymentMasterForm.value);
  }

}
