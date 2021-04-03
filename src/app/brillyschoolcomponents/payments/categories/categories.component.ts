import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PaymenttypeService } from '../../../brillyschoolservices/payment/paymenttype.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  //ALL CATEGORIES 
  public allPaymnetCategoriesArray:any[] = [];

  constructor(private FB: FormBuilder, private paymentTypeService: PaymenttypeService) { }


  //ON NG ONIT
  ngOnInit(): void {
     // GET ALL PAYMENT CATEGORIES
      this.paymentTypeService.getAllPaymentCategories()
       .subscribe(
         (data:any) => this.allPaymnetCategoriesArray = data.data,
         error => console.log("ERROR OCCURS" , error)
       );
  }

    
  //NEW PAYMENT TYPE FOMR DATA OBJECT
  paymentCategoryForm = this.FB.group({
    fee_category: this.FB.group({
         name: [''],
          code: [''],
          description: [''],
          note: ['']
        })
  });

 
  //ADDNEW CATEGORIE
  onSubmitNewPaymentCategory(){
    this.paymentTypeService.addNewPaymentCategory(this.paymentCategoryForm.value)
     .subscribe(
       (data: any) => console.log("SUCCESS", data),
       error => console.log("ERROR HAPPNED", error)
     );
  }
  

 }
