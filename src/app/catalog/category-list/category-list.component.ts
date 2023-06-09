import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ListResponse } from 'src/app/core/interfaces/ListResponse';
import { Category } from 'src/app/core/interfaces/category';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['categoryName', 'actions'];
  categories: Category[];
  categoryResponse: ListResponse<Category>;
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
    this.getAllCategories(this.params);
  }

  getAllCategories(params = null) {
    this.spinner.show();
    this.catalogService.getAllCategories(params).subscribe({
      next: (result: ListResponse<Category>) => {
        this.spinner.hide();
        //this.categories = result.data;
        this.categoryResponse = result;
      },
      error: () => {},
    });
  }

  handlePageEvent(event: any) {
    const newParam = {
      ...this.params,
      pageNumber: event?.pageIndex + 1,
      pageSize: event?.pageSize,
    };
    this.getAllCategories(newParam);
  }

  onDeleteButtonClick(element: Category): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        if (element && element.id) {
          this.spinner.show();
          this.catalogService.deleteCategoryById(element.id).subscribe({
            next: () => {
              this.toastr.success('Category has been deleted successfully.');
              this.dialog.closeAll();
              this.spinner.hide();
              this.getAllCategories(this.params);
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
