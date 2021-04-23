import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
//import services 
  import { ClassService } from './../../../brillyschoolservices/classes/class.service';
  import { PaymenttypeService } from '../../../brillyschoolservices/payment/paymenttype.service';

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
        //ALL PAYMENT MASTERS ARRAY
        public allPaymentMaster:any[] = [];
        //ALL PAYMENT MASTER
        public allPaymentTypesArray:any[] = [];



  constructor(private FB:FormBuilder, private classesService:ClassService,
              private paymentService :PaymenttypeService) { }

      ngOnInit(): void {
            //GET ALL THE AVALIABLE CLASSES
                this.classesService.getAllClass()
                    .subscribe(
                      (data:any) => this.allClasses = data.data,
                      error => console.log("error", error)
                      );    
          
          //GET ALL PAYMENT MASTERS
          this.paymentService.getAllPaymentMasters()
          .subscribe(
            (data:any) => this.allPaymentMaster = data.data,
            error => console.log("ERROR", error)
          );      
          
          //GET ALL PAYMENT TYPES
          this.paymentService.getAllPaymentTypes()
            .subscribe(
              (data:any) => this.allPaymentTypesArray = data.data,
              error => console.log("ERROR", error)
            );
      }



  //NEW MASTER FEE FORM DATA
  paymentMasterForm = this.FB.group({
    fee_master: this.FB.group({
        class_section_id: [66],
        fee_type_id: [''],
        amount: [''],
        due_date: [''],
       due_date_max: [''], 
       note: [''],
       sections: []
    })
  });



// SELECT MASTER SECTION 
    seectMasterSection(id:any,secRef:any,classNameRef:any){
      console.log(id + secRef + classNameRef);
      if(this.allSectionsToTheFee.includes(id,0)){
        this.allSectionsToTheFee.splice(this.allSectionsToTheFee.indexOf(id),1);
        secRef.style.backgroundColor = "#ffffff";
        secRef.style.color = "#000000";
        console.log(this.allSectionsToTheFee);
      }else{
        this.allSectionsToTheFee.push(id);
        secRef.style.backgroundColor = "#01a2d2";
        secRef.style.color = "#ffffff";
        console.log(this.allSectionsToTheFee);
        
      }

      this.paymentMasterForm.get('fee_master.sections_id')?.setValue(this.allSectionsToTheFee);

    }

    
  //ON SUBMIT NEW FEE MASTER
  onSubmitNewpaymentMaster(){
      console.log(this.paymentMasterForm.value);
      this.paymentService.addNewPaymentMaster(this.paymentMasterForm.value)
      .subscribe(
        (data:any) => console.log(data),
        error => console.log("ERROR", error)
      );    

      console.log(this.allPaymentMaster);
  }



}
