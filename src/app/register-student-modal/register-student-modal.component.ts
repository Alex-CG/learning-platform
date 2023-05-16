import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-register-student-modal',
  templateUrl: './register-student-modal.component.html',
  styleUrls: ['./register-student-modal.component.scss']
})
export class RegisterStudentModalComponent implements OnInit {

  form: FormGroup;

  firstName: FormControl = new FormControl('', [Validators.required]);
  lastName: FormControl = new FormControl('', [Validators.required]);
  address: FormControl = new FormControl('', [Validators.required]);
  phoneNumber: FormControl = new FormControl('', [Validators.required]);
  dob: FormControl = new FormControl('', [Validators.required]);
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(public dialogRef: MatDialogRef<RegisterStudentModalComponent>, private formBuilder: FormBuilder, private registrationService: RegistrationService) {
    this.form = this.formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      phoneNumber: this.phoneNumber,
      dob: this.dob,
      email: this.email
    });
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    if (this.form.invalid) {
      return;
    }

    const data = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      address: this.address.value,
      phoneNumber: this.phoneNumber.value,
      dob: this.dob.value,
      email: this.email.value
    }

    this.registrationService.register(data).subscribe({
      next: (response) => {
        this.dialogRef.close();
      },
      error: (response) => {
        if (!response.error.code) {
          alert('Unknown error ocurred!');
          return;
        }
        this.form.get(response.error.field)?.setErrors({ serverError: response.error.message });
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
