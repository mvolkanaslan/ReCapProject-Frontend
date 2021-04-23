import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { CustomerDetails } from 'src/app/models/customerDetails';
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
    if (this.storageServise.getToken()) return true;
    else return false;
  }
  logout() {
    this.storageServise.deleteItem('token');
    this.storageServise.deleteActiveUser();
    this.router.navigate(['']);
  }

  userIsAdmin(): boolean {
    return this.getActiveUser().claims.includes('admin');
  }
  getActiveUser(): CustomerDetails {
    this.activeUser = this.storageService.getActiveUser();
    return this.activeUser;
  }
}
