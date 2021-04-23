declare var $: any;
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetails } from 'src/app/models/customerDetails';
import { RentalDetails } from 'src/app/models/rentalDetails';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';
import { RentalService } from 'src/app/services/rental.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  activeUser: CustomerDetails;
  rentals: RentalDetails[];
  userUpdateForm: FormGroup;
  passwordUpdateForm: FormGroup;
  constructor(
    private storageService: StorageService,
    private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}
  ngOnInit(): void {
    this.activeUser = this.storageService.getActiveUser();
    this.createUserUpdateForm();
    this.createPasswordForm();
    this.getRentalsOfCustomer(this.activeUser.customerId);
  }
  getRentalsOfCustomer(customerId: number) {
    this.rentalService
      .getRentalsByCustomerId(customerId)
      .subscribe((response) => {
        this.rentals = response.data;
      });
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      id: [this.activeUser.userId],
      customerId: [this.activeUser.customerId],
      firstName: [this.activeUser.firstName, Validators.required],
      lastName: [this.activeUser.lastName, Validators.required],
      email: [this.activeUser.email, Validators.required],
      companyName: [this.activeUser.companyName],
      findexScore: this.activeUser.findexScore,
    });
  }
  createPasswordForm() {
    this.passwordUpdateForm = this.formBuilder.group({
      id: [this.activeUser.userId, Validators.required],
      Password: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  rentalStatus(rental: RentalDetails) {
    let returnDate = new Date(rental.returnDate);
    if (returnDate.valueOf() < Date.now().valueOf()) {
      return 'Delivered';
    } else {
      return 'In Use';
    }
  }

  updateUser() {
    if (this.userUpdateForm.valid) {
      let userToUpdate = Object.assign({}, this.userUpdateForm.value);

      this.authService.updateUser(userToUpdate).subscribe(
        (response) => {
          delete userToUpdate['id'];
          this.activeUser = Object.assign({ ...this.activeUser }, userToUpdate);
          this.storageService.setActiveUser(JSON.stringify(this.activeUser));
          $('#userUpdateModal').modal('hide');
          this.toastrService.success(response.message);
          //window.location.replace('/account');
          this.getRentalsOfCustomer(this.activeUser.customerId);
          this.router.navigate(['/account']);
        },
        (responseError) => {
          this.errorService.getError(responseError);
        }
      );
    } else {
      this.toastrService.warning('Please Fill The Form !');
    }
  }
  changeUserPassword() {
    if (this.passwordUpdateForm.valid) {
      let passwordToUpdate = Object.assign({}, this.passwordUpdateForm.value);
      if (
        this.passwordUpdateForm.controls['newPassword'].value !==
        this.passwordUpdateForm.controls['confirmPassword'].value
      ) {
        this.toastrService.warning('Passwords Do Not Match !');
        return;
      }

      this.authService.updateUserPassword(passwordToUpdate).subscribe(
        (responseSuccess) => {
          $('#passwordUpdateModal').modal('hide');
          this.passwordUpdateForm.reset();
          this.toastrService.success(responseSuccess.message);
        },
        (responseError) => {
          typeof responseError.error != 'string'
            ? this.errorService.getError(responseError)
            : this.toastrService.error(responseError.error);
        }
      );
    } else {
      this.toastrService.warning('Please Fill the Form !');
    }
  }
}
