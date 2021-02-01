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
        }
        
            return {
                CurrentStepTitle: this.stepTitle,
                CurrentStepDesc: this.stepDescription,
                CurrentStepSlipable: this.stepIsSkipable                
            }   

    }

 
 }