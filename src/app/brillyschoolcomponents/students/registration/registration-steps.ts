export class RegistrationStepsCongs{

    public stepTitle?: string;
    public stepDescription?: string;
    public stepIsSkipable?: boolean;

    constructor(){}

    //SET ALL THE CASES OF THE REGISTRATION
    public getStepsCongs(stepInex:number){
        switch (stepInex) {
            case 1:
                this.stepTitle = "STUDENT FINGER PRINT";
                this.stepDescription = "Ask the student to properly insert his/her fingerprint or skip to next step";
                this.stepIsSkipable = true;
                break;
            case 2:
            this.stepTitle = "TAKE STUDENT PHOTO";
            this.stepDescription = "Ask the student to take a proper position and click take photo";
            this.stepIsSkipable = true;           
            break;
                
                case 3:
                this.stepTitle = "GUARDIAN INFORMATIONS";
                this.stepDescription = "Enter the guardian informations, you can add multiple guardians";
                this.stepIsSkipable = true;           
                break;
                    case 4:
                        this.stepTitle = "STUDENT INFORMATIONS";
                        this.stepDescription = "Enter the student informations, some field can be set later";
                        this.stepIsSkipable = true;           
                        break;   
                case 5:
                    this.stepTitle = "SPECIFYING THE STUDENT CLASS ";
                    this.stepDescription = "Take a look at the list at the bottom to see which classes are empty";
                    this.stepIsSkipable = true;           
                break;       
               
          case 6:
             this.stepTitle = "ADD THE STUDENT CONTACT INFORMATION ";
             this.stepDescription = "Please add the student information and alternative phone number";
             this.stepIsSkipable = true;           
           break;     
        }
        
            return {
                CurrentStepTitle: this.stepTitle,
                CurrentStepDesc: this.stepDescription,
                CurrentStepSlipable: this.stepIsSkipable                
            }   

    }

 
 }