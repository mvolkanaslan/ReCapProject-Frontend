import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  register() {
    if (this.registerForm.valid) {
      if (
        this.registerForm.value['password'] !=
        this.registerForm.value['confirmPassword']
      ) {
        this.toastrService.error('Passwords do not Match !');
        return;
      }
      let registerForm = Object.assign({}, this.registerForm.value);
      this.authService.register(registerForm).subscribe(
        (response) => {
          this.router.navigate(['login']);
          this.toastrService.success('Register Successful !');
        },
        (responseError) => {
          this.errorService.getError(responseError);
        }
      );
    } else {
      this.toastrService.info('Please Fill the Form !');
    }
  }
}
