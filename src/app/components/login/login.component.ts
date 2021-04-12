import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetails } from 'src/app/models/customerDetails';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  activeUser: CustomerDetails;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private storageService: StorageService,
    private customerService: CustomerService
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
      this.setActiveUser(this.loginForm.controls['email'].value);
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          this.router.navigate(['']);
          this.toastrService.success(response.message);
          this.storageService.setItem('token', response.data.token);
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    }
  }
  setActiveUser(email: string) {
    this.customerService
      .getCustomerDetailsByEmail(email)
      .subscribe((response) => {
        this.activeUser = Object.assign({
          email: response.data[0].email,
          customerName: response.data[0].customerName,
          customerId: response.data[0].customerId,
          userId: response.data[0].userId,
          findexScore: response.data[0].findexScore,
          claims: response.data[0].claims,
        });

        this.storageService.setActiveUser(JSON.stringify(this.activeUser));
      });
  }
}
