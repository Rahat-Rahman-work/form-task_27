import { RegistrationService } from './registration.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { forbiddenNameValidator } from './shared/name.validator';
import { PasswordValidator } from './shared/password.validator';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  //form: FormGroup;
  submitted = false;
  errorMsg='';
  profileForm: FormGroup;
  get firstName(){
    return this.profileForm.get('firstName');
  }
  get email(){
    return this.profileForm.get('email');
  }

  get alternateEmail(){
    return this.profileForm.get('alternateEmail') as FormArray;
  }

  addAlternateEmail(){
    this.alternateEmail.push(this.fb.control(''));
  }
// private _registrationService: RegistrationService
  constructor(private fb: FormBuilder, private _registrationService: RegistrationService) {}

    ngOnInit(){
      this.profileForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3),forbiddenNameValidator]],
        lastName: ['', Validators.required],
        email: [''],
        subscribe: [false],
        password: [''],
        confirmPassword: [''],
        address: this.fb.group({
          house: [''],
          area: ['']
        }),
        alternateEmail: this.fb.array([])
     },{validator: PasswordValidator });

     this.profileForm.get('subscribe').valueChanges.subscribe(checkedvalue=>{
       const email= this.profileForm.get('email');
       if(checkedvalue){
         email.setValidators(Validators.required);
       } else {
         email.clearValidators();
       }
       email.updateValueAndValidity();
     });
    }

    onSubmit(){
      this.submitted=true;
      console.log(this.profileForm.value);
      this._registrationService.register(this.profileForm.value).subscribe(
        response => console.log('Success', response),
        //error => console.log('Error!', error),
        error => this.errorMsg= error.ststusText
      );
    }


}
