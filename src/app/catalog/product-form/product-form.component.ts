import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { getUserData } from 'src/app/core/helpers/utility';
import { ParentProduct, Product } from 'src/app/core/interfaces/product';
import { Editor, Toolbar } from 'ngx-editor';
import { Category } from 'src/app/core/interfaces/category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  @ViewChild('image1Ref') image1Ref: any;
  @ViewChild('image2Ref') image2Ref: any;
  @ViewChild('specRef') specRef: any;
  @ViewChild('installationRef') installationRef: any;
  form: FormGroup;
  image1: any;
  image2: any;
  specFile: any;
  installationFile: any;
  product: Product;
  categories: Category[];
  parentProducts: ParentProduct[];

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  sdEditor: Editor;
  descriptionEditor: Editor;
  productDetailEditor: Editor;
  accessoryEditor: Editor;
  airMessageEditor: Editor;
  waterMessageEditor: Editor;
  modelEditor: Editor;

  constructor(
    private formBuilder: FormBuilder,
    private catalogService: CatalogService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCategoresDropDown();
    this.getProductDropdown();

    this.sdEditor = new Editor();
    this.descriptionEditor = new Editor();
    this.productDetailEditor = new Editor();
    this.accessoryEditor = new Editor();
    this.airMessageEditor = new Editor();
    this.waterMessageEditor = new Editor();
    this.modelEditor = new Editor();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        const id = +params['id'];
        this.getProductById(id);
      }
      this.renderForm();
    });
  }

  getCategoresDropDown() {
    this.spinner.show();
    this.catalogService.getCategoryDropdown().subscribe({
      next: (result: Category[]) => {
        this.spinner.hide();
        this.categories = result;
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'An error occurred');
      },
    });
  }

  getProductDropdown() {
    this.spinner.show();
    this.catalogService.getProductDropdown().subscribe({
      next: (result: ParentProduct[]) => {
        this.spinner.hide();
        this.parentProducts = result;
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'An error occurred');
      },
    });
  }

  ngOnDestroy(): void {
    this.sdEditor.destroy();
    this.descriptionEditor.destroy();
    this.productDetailEditor.destroy();
    this.accessoryEditor.destroy();
    this.airMessageEditor.destroy();
    this.waterMessageEditor.destroy();
    this.modelEditor.destroy();
  }

  getProductById(id: number) {
    this.spinner.show();
    this.catalogService.getProductById(id).subscribe({
      next: (response) => {
        this.spinner.hide();
        this.product = response;
        this.renderForm(this.product);
      },
      error: (err) => {
        this.toastr.error(err?.error?.message);
        this.spinner.hide();
      },
    });
  }

  renderForm(data = null) {
    this.form = this.formBuilder.group({
      productName: [
        data?.productName ? data?.productName : '',
        Validators.required,
      ],
      productSubTitle: [data?.productSubTitle ? data?.productSubTitle : ''],
      shortDescription: [data?.shortDescription ? data?.shortDescription : ''],
      parentProductId: [data?.parentProductId ? data?.parentProductId : null],
      categoryId: [
        data?.categoryId ? data?.categoryId : null,
        Validators.required,
      ],
      description: [data?.description ? data?.description : ''],
      productDetail: [data?.productDetail ? data?.productDetail : ''],
      acessories: [data?.acessories ? data?.acessories : ''],
      airMessage: [data?.airMessage ? data?.airMessage : ''],
      waterMessage: [data?.waterMessage ? data?.waterMessage : ''],
      models: [data?.models ? data?.models : ''],
      specSheettTitle: [data?.specSheettTitle ? data?.specSheettTitle : ''],
      installationTitle: [
        data?.installationTitle ? data?.installationTitle : '',
      ],
      // isNew: [data?.isNew ? data?.isNew : false],
      image1: [null],
      image2: [null],
      specSheetFile: [null],
      installationFile: [null],
    });
  }

  // file input handling

  handleImage1Input(event: any) {
    const files = event.target.files;
    this.image1 = files[0];
  }

  handleImage2Input(event: any) {
    const files = event.target.files;
    this.image2 = files[0];
  }

  handleSpecFileInput(event: any) {
    const files = event.target.files;
    this.specFile = files[0];
  }

  handleInstallationFileInput(event: any) {
    const files = event.target.files;
    this.installationFile = files[0];
  }

  resetForm() {
    this.form.reset();
    this.image1Ref.nativeElement.value = null;
    this.image2Ref.nativeElement.value = null;
    this.specRef.nativeElement.value = null;
    this.installationRef.nativeElement.value = null;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const userData = getUserData();
    if (!userData) return;

    const {
      acessories,
      airMessage,
      categoryId,
      description,
      installationTitle,
      models,
      parentProductId,
      productDetail,
      productName,
      productSubTitle,
      shortDescription,
      specSheettTitle,
      waterMessage,
      isNew,
    } = this.form.value;

    const formData = new FormData();

    formData.append('productName', productName);
    formData.append('productSubTitle', productSubTitle);
    formData.append('shortDescription', shortDescription);
    formData.append('categoryId', categoryId);

    if (this.form.get('parentProductId').value) {
      formData.append('parentProductId', parentProductId);
    }

    formData.append('description', description);
    formData.append('acessories', acessories);
    formData.append('airMessage', airMessage);
    formData.append('models', models);
    formData.append('specSheettTitle', specSheettTitle);
    formData.append('installationTitle', installationTitle);
    formData.append('productDetail', productDetail);
    formData.append('waterMessage', waterMessage);
    formData.append('companyCode', userData.companyCode);
    // formData.append('isNew', isNew);

    if (this.image1) {
      formData.append('image1', this.image1);
    }

    if (this.image2) {
      formData.append('image2', this.image2);
    }

    if (this.specFile) {
      formData.append('specSheetFile', this.specFile);
    }

    if (this.installationFile) {
      formData.append('installationFile', this.installationFile);
    }

    this.spinner.show();
    const methodRef = !this.product
      ? this.catalogService.addProduct(formData)
      : this.catalogService.updateProduct(this.product.id, formData);

    methodRef.subscribe({
      next: (_) => {
        this.spinner.hide();
        this.toastr.success('Product saved successfully.');
        this.resetForm();
        this.router.navigateByUrl('/catalog/products');
      },
      error: (err) => {
        this.spinner.hide();
        this.toastr.error(err?.error?.message || 'An error occurred');
      },
    });
  }
}
