import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ListResponse } from 'src/app/core/interfaces/ListResponse';
import { Product } from 'src/app/core/interfaces/product';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = [
    'productName',
    'category',
    'parentProduct',
    'actions',
  ];
  categories: Product[];
  productResponse: ListResponse<Product>;
  pageSizeOptions = [5, 10, 25];
  currentPage: number;
  params = {
    page: 1,
    pageSize: 10,
  };
  constructor(
    private catalogService: CatalogService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllProducts(this.params);
  }

  getAllProducts(params = null) {
    this.spinner.show();
    this.catalogService.getAllProducts(params).subscribe({
      next: (result: ListResponse<Product>) => {
        this.spinner.hide();
        this.productResponse = result;
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'An error occurred');
      },
    });
  }

  handlePageEvent(event: any) {
    const newParam = {
      ...this.params,
      pageNumber: event?.pageIndex + 1,
      pageSize: event?.pageSize,
    };
    this.getAllProducts(newParam);
  }

  onDeleteButtonClick(element: Product): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        if (element && element.id) {
          this.spinner.show();
          this.catalogService.deleteProduct(element.id).subscribe({
            next: () => {
              this.toastr.success('Product has been deleted successfully.');
              this.dialog.closeAll();
              this.spinner.hide();
              this.getAllProducts(this.params);
            },
            error: (err) => {
              this.toastr.error(err?.error?.message || 'An error occurred');
              this.spinner.hide();
            },
          });
        }
      } else {
        this.dialog.closeAll();
      }
    });
  }
}
