declare var $: any;
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-color-management',
  templateUrl: './color-management.component.html',
  styleUrls: ['./color-management.component.css'],
})
export class ColorManagementComponent implements OnInit {
  colors: Color[];
  colorEditForm: FormGroup;
  icons = {
    faTrash: faTrash,
    faEdit: faEdit,
  };
  colorToDelete: Color;
  constructor(
    private colorService: ColorService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.createColorForm();
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  setColorToDelete(id: number) {
    this.colorToDelete = Object.assign({ id: id });
  }

  deleteColor() {
    this.colorService.deleteColor(this.colorToDelete).subscribe(
      (response) => {
        $('#colorDeleteModal').modal('hide');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['colormanage']));
        this.toastrService.success(response.message);
      },
      (responseError) => {
        this.errorService.getError(responseError);
      }
    );
  }

  getUpdateModal(color: Color) {
    this.colorEditForm.setValue({
      id: color.id,
      colorName: color.colorName,
    });
  }

  updateColor() {
    if (this.colorEditForm.valid) {
      this.colorEditForm.patchValue({
        id: Number(this.colorEditForm.controls['id'].value),
      });
      let colorToUpdate = Object.assign({}, this.colorEditForm.value);
      this.colorService.updateColor(colorToUpdate).subscribe(
        (response) => {
          this.colorEditForm.reset();
          $('#colorUpdateModal').modal('hide');
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['colormanage']));
          this.toastrService.success(response.message);
        },
        (responseError) => {
          this.errorService.getError(responseError);
        }
      );
    } else {
      this.toastrService.warning('Please Fill the Form !');
    }
  }
  addColor() {
    if (this.colorEditForm.valid) {
      this.colorEditForm.removeControl('id');
      let colorToAdd = Object.assign({}, this.colorEditForm.value);
      this.colorService.addColor(colorToAdd).subscribe(
        (response) => {
          this.colorEditForm.reset();
          $('#colorAddModal').modal('hide');
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['colormanage']));
          this.toastrService.success(response.message);
        },
        (responseError) => {
          this.errorService.getError(responseError);
        }
      );
    } else {
      this.toastrService.warning('Please Fill the Form !');
    }
  }

  createColorForm() {
    this.colorEditForm = this.fb.group({
      id: new FormControl(''),
      colorName: new FormControl('', Validators.required),
    });
  }
}
