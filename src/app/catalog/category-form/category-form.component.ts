import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/core/interfaces/category';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { getUserData } from 'src/app/core/utility';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  categoryForm: FormGroup;
  file: any;
  category: Category;
  constructor(
    private formBuilder: FormBuilder,
    private catalogService: CatalogService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        const id = +params['id'];
        this.getCategoryById(id);
      }
      this.renderForm();
    });
  }

  renderForm(data = null) {
    this.categoryForm = this.formBuilder.group({
      categoryName: [
        data?.categoryName ? data?.categoryName : '',
        Validators.required,
      ],
      image: [null],
    });
  }

  get formControls() {
    return this.categoryForm.controls;
  }

  getCategoryById(id: number) {
    this.spinner.show();
    this.catalogService.getCategoryById(id).subscribe({
      next: (response) => {
        this.spinner.hide();
        this.category = response;
        this.renderForm(this.category);
      },
      error: (err) => {
        this.toastr.error(err?.error?.message);
        this.spinner.hide();
      },
    });
  }

  handleFileInput(event: any) {
    const files = event.target.files;
    this.file = files[0];
  }

  resetForm() {
    this.categoryForm.reset();
    this.fileInput.nativeElement.value = null;
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      return;
    }

    const userData = getUserData();
    if (!userData) return;

    const formData = new FormData();
    formData.append(
      'categoryName',
      this.categoryForm.get('categoryName').value
    );

    formData.append('companyCode', userData.companyCode);

    if (this.file) {
      formData.append('image', this.file);
    }

    this.spinner.show();
    console.log(this.category);
    const methodRef = !this.category
      ? this.catalogService.addCategory(formData)
      : this.catalogService.updateCategory(this.category.id, formData);

    console.log(methodRef);

    methodRef.subscribe({
      next: (_) => {
        this.spinner.hide();
        this.toastr.success('Category saved successfully.');
        this.resetForm();
        this.router.navigateByUrl('/category');
      },
      error: (err) => {
        this.spinner.hide();
        this.toastr.error(err?.error?.message || 'An error occurred');
      },
    });
  }
}
