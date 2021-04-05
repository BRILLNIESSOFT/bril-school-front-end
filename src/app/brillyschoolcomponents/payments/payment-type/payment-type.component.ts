import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

//IMPORT SERVICES
import { PaymenttypeService } from '../../../brillyschoolservices/payment/paymenttype.service';


@Component({
  selector: 'app-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.scss']
})
export class PaymentTypeComponent implements OnInit {

    //ALL PAYMENT CATEGORY ARRAY
    public PaymnetCategoriesArray:any[] = [];
    //ALL PAYMENT TYPES ARRAY
    public allPaymnetTypesArray:any[] = [];


  constructor(private FB: FormBuilder, private paymentTypeService: PaymenttypeService) { }

  ngOnInit(): void {

            // GET ALL PAYMENT TYPES
            this.paymentTypeService.getAllPaymentTypes()
            .subscribe(
              (data:any) => this.allPaymnetTypesArray = data.data,
              error => console.log("ERROR OCCURS" , error)
            );

            // GET ALL PAYMENT CATEGORIES
            this.paymentTypeService.getAllPaymentCategories()
            .subscribe(
              (data:any) => this.PaymnetCategoriesArray = data.data,
              error => console.log("ERROR OCCURS" , error)
            );

  }


//NEW PAYMENT TYPE FOMR DATA OBJECT
paymentTypeForm = this.FB.group({
  fee_type: this.FB.group({
      fee_category_id: [],
             name: [''],
             code: [''],
             description: [''],
             note: ['']
          })
 });


    //submit new payment 
    onSubmitNewPaymentType(){
       this.paymentTypeService.addNewPaymentType(this.paymentTypeForm.value)
       .subscribe(
         (data:any) => console.log("ADDED SUCCESSFULYY", data.data),
         error => console.log("ERROR" , error)
       )


    }

}
