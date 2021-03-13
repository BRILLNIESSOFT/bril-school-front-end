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
                this.stepTitle = "FATHER INFORMATIONS";
                this.stepDescription = "Enter the father informations";
                this.stepIsSkipable = true;           
                break;

                case 4:
                    this.stepTitle = "MOTHER INFORMATIONS";
                    this.stepDescription = "Enter the mother informations";
                    this.stepIsSkipable = true;           
                    break;
                
                case 5:
                this.stepTitle = "GUARDIAN INFORMATIONS";
                this.stepDescription = "Enter the guardian informations, you can use the father/mother as guardians";
                this.stepIsSkipable = true;           
                break;
                    case 6:
                        this.stepTitle = "STUDENT INFORMATIONS";
                        this.stepDescription = "Enter the student informations, some field can be set later";
                        this.stepIsSkipable = true;           
                        break;   
                case 7:
                    this.stepTitle = "STUDENT ADRESS ";
                    this.stepDescription = "Enter the student address ";
                    this.stepIsSkipable = true;           
                break;       

                case 8:
                    this.stepTitle = "SPECIFYING THE STUDENT CLASS ";
                    this.stepDescription = "Take a look at the list at the bottom to see which classes are empty";
                    this.stepIsSkipable = true;           
                break;     
               
          case 9:
             this.stepTitle = "SET A APAYMENT ";
             this.stepDescription = "You can ask the student if he wants to pay now or leter";
             this.stepIsSkipable = true;           
           break;     

           case 10:
            this.stepTitle = "PRINT DOCUMENTS ";
            this.stepDescription = "Print the ID card for the student and the payment reciept if exist";
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