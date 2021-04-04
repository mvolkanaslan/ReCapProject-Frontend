import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          this.router.navigate(['/']);
          this.toastrService.success(response.message);
          localStorage.setItem('token', response.data.token);
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    }
  }
}
