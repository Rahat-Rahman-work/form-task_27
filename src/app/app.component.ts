import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { forbiddenNameValidator } from './shared/name.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  form: FormGroup;
  get firstName(){
    return this.profileForm.get('firstName');
  }

  constructor(private fb: FormBuilder) {}
    // let formBuilder = new FormBuilder();
    // this.form = formBuilder.group({
    //   'userName': [''],
    //   'password':['']

    // });
    profileForm = this.fb.group({
       firstName: ['', [Validators.required, Validators.minLength(3),forbiddenNameValidator]],
       lastName: ['', Validators.required],
       email: [''],
       address: this.fb.group({
         house: [''],
         area: ['']
       })
    });

  //   profileForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   email: new FormControl(''),
  //   address: new FormGroup({
  //          house: new FormControl(''),
  //          area: new FormControl('')
  //   })
  // });

  load() {
    this.profileForm.setValue({
       firstName: 'Rahat',
       lastName: 'Rahman',
       email: 'rahatrm13@gmail.com',
       address: {
         house: '32/d',
         area: 'Khilgoan'
       }
    });
   }

}
