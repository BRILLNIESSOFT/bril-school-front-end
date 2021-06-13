import { Component, OnInit , ViewChild , ElementRef} from '@angular/core';
import { fingerPrint, lunchCam,SnapImage, StepHolder } from './registration-animations'
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { RegistrationStepsCongs } from './registration-steps'
//HANDLIGN ALL THE EXISTING FORMS
import { FormGroup , FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';


 
//importing services
import { RegistrationService } from './../../../brillyschoolservices/students/registration.service';
import { ClassService } from './../../../brillyschoolservices/classes/class.service';

@Component({
  selector: 'app-registration',
  animations: [
    fingerPrint, lunchCam, SnapImage, StepHolder
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

 
export class RegistrationComponent implements OnInit {

    
   //THE NECCESSARY APIs LIKE CLASSES AND GROUPS ...ETC
   public allClasses:any[] = [];

    //STUDENT SERVICES THAT MUST COME FROM THE SERVER
     drafftedStudentArray?:Array<any>;
  
   //BINDING THE NOTIFICATION VALIDATION
    // @ViewChild('validateInRegistration') brillNotifier?: ElementRef;
    
    //HERE IS THE WHOLE FORM DATA WHICH IS CONTAINTS EVERYTHING
    studentRegistrationEntireData:any = [];
    //DEFIGNING THE GLOBAL STEP INDEXES AND NAMES
     public  stepIndexNum: number = 1;
   //CREATING AN INSTANCE FROM THR REGISTRATION STEP WITH A STEP TO THE CONSTRUCTOR
    stepIndexHandler = new RegistrationStepsCongs(); 
    // STEPS TEXT 
    stepIndex = {
      stepHeaderTitle: this.stepIndexHandler.getStepsCongs(this.stepIndexNum).CurrentStepTitle,
      stepDescription: this.stepIndexHandler.getStepsCongs(this.stepIndexNum).CurrentStepDesc      
    }

    //TAKING CARE OF THE ANIMATION FOR THE HOLDER OF THE STEPS
    public isJustSkiped = true;

   //INITIALIZING THE VIDEO STREAMER TO SNAP PHOTOS
     // toggle webcam on/off
      public showWebcam = true;
      public allowCameraSwitch = true;
      public multipleWebcamsAvailable = false;
      public deviceId: string = '';

      //HANDLING ERROS
      public errors = [];
   
      //Tracking the webCam containeer
      public startWebcam?:boolean = false;
      //Animation lunch webcam
      public isLanchedAnimate = false;

   //WEBCAM STUDENT IMAGE
   public webcamImage?: WebcamImage;
   public studentPhotoInLocal = null;

     // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
   

    //TAKING CONTROL OF THE NOTES ANIMATION AND SWITCHING BETWEEN MESSAGES
    NotesFingerPrint = {
      message: 'Waiting for the student to try his/her finger print, please ask the student to properly try !',
      status: 0
    };

    //FINGERPRINT TOKEN OR WHATEVER WILLBE RETURNED AND ITS CONFIRMATION
    studentFingerPrint =  {
      stepName: 'Finger print',
      firstTry: 'moh',
      secondTry: 'moh'
    };
    
     
      //HANDLING ANYTHING HAS TO DO WITH FORM GROUPS
      RegistrationFormGroup =  this.FB.group({
                      //STUDENT NASTED FORM GROUP
                      student: this.FB.group({
                        first_name:  [' mohssine', Validators.minLength(5)],
                        mid_name:  ['abo hsien', Validators.minLength(5)],
                        last_name:  ['Khaloufi', Validators.minLength(5)],
                        first_name_ara:  ['محسن', Validators.minLength(5)],
                        mid_name_ara:  ['ابة حصين', Validators.minLength(5)],
                        last_name_ara:  ['خلوفي', Validators.minLength(5)],
                        roll_no:  ['mohssine', Validators.minLength(5)],
                        admission_no:  ['mohssine', Validators.minLength(5)],
                        admission_date:  [''],
                        birth_date:  ['', Validators.minLength(5)],
                        birth_place:  ['mohssine', Validators.minLength(5)],
                        cne:  ['222233', Validators.minLength(5)] ,    
                        phone:  ['mohssine', Validators.minLength(5)],
                        mobile:  ['mohssine', Validators.minLength(5)],
                        email:  ['', Validators.minLength(5)] , 
                        special_care:  ['mohssine', Validators.minLength(5)] ,           
                        health_problems:  ['mohssine', Validators.minLength(5)] ,           
                        height:  ['mohssine', Validators.minLength(5)] ,           
                        weight:  ['mohssine', Validators.minLength(5)] ,           
                        measurement_date:  ['', Validators.minLength(5)] ,           
                        photo:  ['mohssine', Validators.minLength(5)] ,           
                        gender:  ['mohssine', Validators.minLength(5)] ,   
                        previous_school:  ['mohssine', Validators.minLength(5)] ,          
                        blood_group:  ['mohssine', Validators.minLength(5)] ,          
                        note:  ['mohssine', Validators.minLength(5)] ,          
                        class_section_id:  ['mohssine', Validators.minLength(5)] ,  
                         address : {
                          line1:  '' ,
                          line2:  '' ,
                          country:  '' ,
                          state:  '' ,
                          city:  '' ,
                          zip:  '' ,
                          latitude:  '' ,
                          longitude:  '' ,
                          note:  '' 
                        }
              
                      }),

                             //FATHER NASTED FORM GROUP
                             father: this.FB.group({
                              first_name: ['mohssine', Validators.minLength(5)],
                              mid_name: ['mohssine', Validators.minLength(5)],
                              last_name: ['mohssine', Validators.minLength(5)],
                              first_name_ara: ['mohssine', Validators.minLength(5)],
                              mid_name_ara: ['mohssine', Validators.minLength(5)],
                              last_name_ara: ['mohssine', Validators.minLength(5)],
                              phone: ['mohssine', Validators.minLength(5)],
                              phone2: ['mohssinemohssine', Validators.minLength(5)],
                              mobile: ['mohssine', Validators.minLength(5)],
                              email: ['mohssine', Validators.minLength(5)],
                              alt_email: [''],
                              birth_date: [''],
                              birth_place: ['mohssine'],
                              occupation: ['mohssine'],
                              familial_status: ['mohssine'],
                              relationship_type: ['mohssine'],
                              contact_type: ['mohssine'],
                              gender: ['mohssine'],
                              cin: ['mohssine'],
                              website: ['mohssine'],
                              facebook: ['mohssine'],
                              twitter: ['mohssine'],
                              linkedin: ['mohssine'],
                              instagram: ['mohssine'],
                              image: ['mohssine'],
                              note: [''],
                            }) ,                       

                             //GUARDIAN NASTED FORM GROUP
                             mother: this.FB.group({
                              first_name: ['mmohssine', Validators.minLength(5)],
                              mid_name: ['mmohssine', Validators.minLength(5)],
                              last_name: ['mmohssine', Validators.minLength(5)],
                              first_name_ara: ['mmohssine', Validators.minLength(5)],
                              mid_name_ara: ['mmohssine', Validators.minLength(5)],
                              last_name_ara: ['mmohssine', Validators.minLength(5)],
                              phone: ['mmohssine', Validators.minLength(5)],
                              phone2: ['mmohssine', Validators.minLength(5)],
                              mobile: ['mmohssine', Validators.minLength(5)],
                              email: ['', Validators.minLength(5)],
                              alt_email: [''],
                              birth_date: [''],
                              birth_place: ['mmohssine'],
                              occupation: ['mmohssine'],
                              familial_status: ['mmohssine'],
                              relationship_type: ['mmohssine'],
                              contact_type: ['mmohssine'],
                              gender: ['mmohssine'],
                              cin: ['mmohssine'],
                              website: ['mmohssine'],
                              facebook: ['mmohssine'],
                              twitter: ['mmohssine'],
                              linkedin: ['mmohssine'],
                              instagram: ['mmohssine'],
                              image: ['mmohssine'],
                              note: [''],
                            }) , 

                             //GUARDIAN NASTED FORM GROUP
                             guardian: this.FB.group({
                              first_name: ['mmohssine', Validators.minLength(5)],
                              mid_name: ['mmohssine', Validators.minLength(5)],
                              last_name: ['mmohssine', Validators.minLength(5)],
                              first_name_ara: ['mmohssine', Validators.minLength(5)],
                              mid_name_ara: ['mmohssine', Validators.minLength(5)],
                              last_name_ara: ['mmohssine', Validators.minLength(5)],
                              phone: ['mmohssine', Validators.minLength(5)],
                              phone2: ['mmohssine', Validators.minLength(5)],
                              mobile: ['mmohssine', Validators.minLength(5)],
                              email: ['', Validators.minLength(5)],
                              alt_email: [''],
                              birth_date: [''],
                              birth_place: ['mmohssine'],
                              occupation: ['mmohssine'],
                              familial_status: ['mmohssine'],
                              relationship_type: ['mmohssine'],
                              contact_type: ['mmohssine'],
                              gender: ['mmohssine'],
                              cin: ['mmohssine'],
                              website: ['mmohssine'],
                              facebook: ['mmohssine'],
                              twitter: ['mmohssine'],
                              linkedin: ['mmohssine'],
                              instagram: ['mmohssine'],
                              image: ['mmohssine'],
                              note: [''],
                            }) , 
 
 
        });
        

      //CONSTRACTION FUNCTION   
      constructor(public drafttedStudent: RegistrationService, private classService: ClassService ,private FB:FormBuilder) { 
          console.log(drafttedStudent);
          
        //GETTING ALL SERVICES
        this.drafttedStudent.getDrafttedStudents() 
        .subscribe(RecentDrafftedStudents => this.drafftedStudentArray = RecentDrafftedStudents);
      } 

      ngOnInit(): void {
        //INITIALIZING THE CAMERA
          WebcamUtil.getAvailableVideoInputs()
            .then((mediaDevices: MediaDeviceInfo[]) => {
              this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
            });

            //FETCHING ALL CLASSES
              this.classService.getAllClass()
              .subscribe(
                      (data: any) =>  this.allClasses = data.data,
                      error => console.log('error', error)
                    );
                }


      //LUNCHING THE CAMERA FUNCTION          
      lunchWebcamToUser(){
            this.startWebcam = true;
            this.isLanchedAnimate = true;
      }

     //METHODS OF THE CAMERA INITIALIZING 
      public triggerSnapshot(): void {
        let audio = new Audio();
         audio.src = "../../../../assets/sounds/camshot.mp3";
         audio.load();
         audio.play();         
         this.trigger.next();
      }
      
    
      public toggleWebcam(): void {
        // if(this.startWebcam !== undefined) { this.startWebcam = undefined }       
        this.isLanchedAnimate = false;
        this.showWebcam = !this.showWebcam;
      }
    
      // public handleInitError(error: WebcamInitError): void {
      //   this.errors.push(error);
      // }
    
      public showNextWebcam(directionOrDeviceId: boolean|string): void {
        // true => move forward through devices
        // false => move backwards through devices
        // string => move to device with given deviceId
        this.nextWebcam.next(directionOrDeviceId);
      }
    
      public handleImage(webcamImage: WebcamImage): void {
        console.info('received webcam image', webcamImage);
        this.webcamImage = webcamImage;
      }
    
      public cameraWasSwitched(deviceId: string): void {
        console.log('active device: ' + deviceId);
        this.deviceId = deviceId;
      }
    
      public get triggerObservable(): Observable<void> {
        return this.trigger.asObservable();
      }
    
      public get nextWebcamObservable(): Observable<boolean|string> {
        return this.nextWebcam.asObservable();
      }

      //TAKE ANOTHER PHOTO
      takeAnotherPhoto(){
        //this.webcamImage = undefined;       
        this.startWebcam = true;
        this.isLanchedAnimate = true;
      }

      //SAVE SNAPPED PHOTO TO THE STUDENT DATA
      saveSnappedPhotot(){
        this.startWebcam = false;
        this.isLanchedAnimate = false;
        this.showWebcam = !this.showWebcam;
        if(this.webcamImage!.imageAsDataUrl !== undefined){ 
            this.studentRegistrationEntireData['Studentfiles'] = {
              StudentImgURL: this.webcamImage!.imageAsDataUrl
            } 
        }

        console.log(this.studentRegistrationEntireData);
      }

        //BACK TO THE PRIEVIEWS STEP
        backToStep(){
          this.isJustSkiped = false;     
          if(this.stepIndexNum >= 1){
            console.log(this.stepIndexNum);
              this.stepIndexNum -= 1;
              this.stepIndex = {
                stepHeaderTitle: this.stepIndexHandler.getStepsCongs(this.stepIndexNum).CurrentStepTitle,
                stepDescription: this.stepIndexHandler.getStepsCongs(this.stepIndexNum).CurrentStepDesc      
              }
          }
        }  

      //CHOOSE STUDENT PHOTO
      // chooseStudentPhoto(){
      //    return document.querySelector('#student_local_photo').click();
      // }

      //   //STudentIMAGEuPLOAD cHANGED 
      //   uploadStudentImg(evt: any){
      
      //     const readStudentUploadedPhoto = new FileReader();
      //     this.studentPhotoInLocal = readStudentUploadedPhoto.readAsDataURL(evt.target.files[0]); 
      //     console.log(this.studentPhotoInLocal);
      //   }
    //PROCCED TO THE NEXT STEP  
    Procced(){
         if(this.stepIndexNum <= 9){
              this.stepIndexNum += 1;
                  this.stepIndex = {
                  stepHeaderTitle: this.stepIndexHandler.getStepsCongs(this.stepIndexNum).CurrentStepTitle,
                  stepDescription: this.stepIndexHandler.getStepsCongs(this.stepIndexNum).CurrentStepDesc      
               }  
        }else{
          console.log(this.RegistrationFormGroup.value);
        }
  
    
    }


    //SUBMIT THE FORM DATA / REGISTERNEW STUDENT PREQUEST
    registareNewStudent(){
      console.log(this.RegistrationFormGroup.value);
       this.drafttedStudent.submitToRegisterNewStudent(this.RegistrationFormGroup.value)
         .subscribe(
           response => console.log("seccess" , response),
           error => console.log("error occurs" , error)
        );
     }
  
}
