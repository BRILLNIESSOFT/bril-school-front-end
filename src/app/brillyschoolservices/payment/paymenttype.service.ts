import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymenttypeService {


 //ADD PAYMENT AND TYPE ... ETC ROUTES
  private feeTypeURL:string = 'http://127.0.0.1:8000/api/fee_types';
  private feeCategoryURL:string = 'http://127.0.0.1:8000/api/fee_categories/';


  constructor(private req:HttpClient) { }

  //ADD NEW PAYMENT CATEGORY
  addNewPaymentCategory(data:any){
    return this.req.post(this.feeCategoryURL, data);
   }

  //ADD NEW PAYMENT TYPE
  addNewPaymentType(data:any){
   return this.req.post(this.feeTypeURL, data);
  }


  //GET ALL PAYMENT CATEGORIES FROM THE START TIME 
  getAllPaymentCategories(){
    return this.req.get(this.feeCategoryURL);
  }

  //GET ALL PAYMENT TYPES
  getAllPaymentTypes(){
    return this.req.get(this.feeTypeURL);
  }
  
}
