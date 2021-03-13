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

@Component({
  selector: 'app-registration',
  animations: [
    fingerPrint, lunchCam, SnapImage, StepHolder
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

 
export class RegistrationComponent implements OnInit {

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
                        roll_no:  ['', Validators.minLength(5)],
                        admission_no:  ['', Validators.minLength(5)],
                        admission_date:  [''],
                        birth_date:  ['', Validators.minLength(5)],
                        birth_place:  ['', Validators.minLength(5)],
                        cne:  ['222233', Validators.minLength(5)] ,    
                        phone:  ['', Validators.minLength(5)],
                        mobile:  ['', Validators.minLength(5)],
                        email:  ['', Validators.minLength(5)] , 
                        special_care:  ['', Validators.minLength(5)] ,           
                        health_problems:  ['', Validators.minLength(5)] ,           
                        height:  ['', Validators.minLength(5)] ,           
                        weight:  ['', Validators.minLength(5)] ,           
                        measurement_date:  ['', Validators.minLength(5)] ,           
                        photo:  ['', Validators.minLength(5)] ,           
                        gender:  ['', Validators.minLength(5)] ,   
                        previous_school:  ['', Validators.minLength(5)] ,          
                        blood_group:  ['', Validators.minLength(5)] ,          
                        note:  ['', Validators.minLength(5)] ,          
                        class_section_id:  ['', Validators.minLength(5)] ,          
                        address : {
                          line1:  ['', Validators.minLength(5)] ,
                          line2:  ['', Validators.minLength(5)] ,
                          country:  ['', Validators.minLength(5)] ,
                          state:  ['', Validators.minLength(5)] ,
                          city:  ['', Validators.minLength(5)] ,
                          zip:  ['', Validators.minLength(5)] ,
                          latitude:  ['', Validators.minLength(5)] ,
                          longitude:  ['', Validators.minLength(5)] ,
                          note:  ['', Validators.minLength(5)] 
                        }          
              
                      }),

                             //FATHER NASTED FORM GROUP
                             father: this.FB.group({
                              first_name: ['', Validators.minLength(5)],
                              mid_name: ['', Validators.minLength(5)],
                              last_name: ['', Validators.minLength(5)],
                              first_name_ara: ['', Validators.minLength(5)],
                              mid_name_ara: ['', Validators.minLength(5)],
                              last_name_ara: ['', Validators.minLength(5)],
                              phone: ['', Validators.minLength(5)],
                              phone2: ['', Validators.minLength(5)],
                              mobile: ['', Validators.minLength(5)],
                              email: ['', Validators.minLength(5)],
                              alt_email: [''],
                              birth_date: [''],
                              birth_place: [''],
                              occupation: [''],
                              familial_status: [''],
                              relationship_type: [''],
                              contact_type: [''],
                              gender: [''],
                              cin: [''],
                              website: [''],
                              facebook: [''],
                              twitter: [''],
                              linkedin: [''],
                              instagram: [''],
                              image: [''],
                            }) ,                       

                             //GUARDIAN NASTED FORM GROUP
                             mother: this.FB.group({
                              first_name: ['', Validators.minLength(5)],
                              mid_name: ['', Validators.minLength(5)],
                              last_name: ['', Validators.minLength(5)],
                              first_name_ara: ['', Validators.minLength(5)],
                              mid_name_ara: ['', Validators.minLength(5)],
                              last_name_ara: ['', Validators.minLength(5)],
                              phone: ['', Validators.minLength(5)],
                              phone2: ['', Validators.minLength(5)],
                              mobile: ['', Validators.minLength(5)],
                              email: ['', Validators.minLength(5)],
                              alt_email: [''],
                              birth_date: [''],
                              birth_place: [''],
                              occupation: [''],
                              familial_status: [''],
                              relationship_type: [''],
                              contact_type: [''],
                              gender: [''],
                              cin: [''],
                              website: [''],
                              facebook: [''],
                              twitter: [''],
                              linkedin: [''],
                              instagram: [''],
                              image: [''],
                            }) , 

                             //GUARDIAN NASTED FORM GROUP
                             guardian: this.FB.group({
                              first_name: ['', Validators.minLength(5)],
                              mid_name: ['', Validators.minLength(5)],
                              last_name: ['', Validators.minLength(5)],
                              first_name_ara: ['', Validators.minLength(5)],
                              mid_name_ara: ['', Validators.minLength(5)],
                              last_name_ara: ['', Validators.minLength(5)],
                              phone: ['', Validators.minLength(5)],
                              phone2: ['', Validators.minLength(5)],
                              mobile: ['', Validators.minLength(5)],
                              email: ['', Validators.minLength(5)],
                              alt_email: [''],
                              birth_date: [''],
                              birth_place: [''],
                              occupation: [''],
                              familial_status: [''],
                              relationship_type: [''],
                              contact_type: [''],
                              gender: [''],
                              cin: [''],
                              website: [''],
                              facebook: [''],
                              twitter: [''],
                              linkedin: [''],
                              instagram: [''],
                              image: [''],
                            }) , 
 
        });


      constructor(public drafttedStudent: RegistrationService, private FB:FormBuilder) { 
          console.log(drafttedStudent);
          
        //GETTING ALL SERVICES
        this.drafttedStudent.getDrafttedStudents() 
        .subscribe(RecentDrafftedStudents => this.drafftedStudentArray = RecentDrafftedStudents);
      } 

      ngOnInit(): void {
          WebcamUtil.getAvailableVideoInputs()
            .then((mediaDevices: MediaDeviceInfo[]) => {
              this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
            });

         }


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
        if(this.startWebcam !== undefined) { this.startWebcam = undefined }       
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
        this.webcamImage = undefined;       
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
         if(this.stepIndexNum <= 7){
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
