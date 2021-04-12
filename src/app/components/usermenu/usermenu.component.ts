import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerDetails } from 'src/app/models/customerDetails';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.css'],
})
export class UsermenuComponent implements OnInit {
  constructor(
    private storageServise: StorageService,
    private router: Router,
    private storageService: StorageService
  ) {}
  activeUser: CustomerDetails;

  ngOnInit(): void {
    this.getActiveUser();
  }
  userIsLogined() {
    if (this.storageServise.getItem('token')) return true;
    else return false;
  }
  logout() {
    this.storageServise.deleteItem('token');
    this.storageServise.deleteActiveUser();
    this.router.navigate(['']);
  }
  getActiveUser(): CustomerDetails {
    return this.storageServise.getActiveUser();
  }
  userIsAdmin(): boolean {
    return this.getActiveUser().claims.includes('admin');
  }
  showuser() {
    console.log(environment.activeUser);
  }
}
