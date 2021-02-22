import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  public classesURL:string = "http://127.0.0.1:8000/api/classes/";
  public sectionsURL:string = "http://127.0.0.1:8000/api/sections/";
  constructor(private http:HttpClient) { }


    //GET ALL CLASSES id s and names
    getAllClass(){
      return this.http.get(this.classesURL);
    }

    //ADD NEW CLASS FUNCTION
    addNewClassService(classData:any){
      return this.http.post(this.classesURL ,classData);
    }

    //ADD NEW SECCTION 
    addNewSectionService(sectionData:any){
      return this.http.post(this.sectionsURL ,sectionData);
    }

}
