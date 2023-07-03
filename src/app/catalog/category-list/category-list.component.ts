import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListResponse } from 'src/app/core/interfaces/ListResponse';
import { Category } from 'src/app/core/interfaces/category';
import { CatalogService } from 'src/app/core/services/catalog.service';

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
  constructor(
    private catalogService: CatalogService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.spinner.show();
    this.catalogService.getAllCategories().subscribe({
      next: (result: ListResponse<Category>) => {
        this.spinner.hide();
        //this.categories = result.data;
        this.categoryResponse = result;
      },
      error: () => {},
    });
  }

  editCategory(element: any) {}
  deleteCategory(element: any) {
    console.log(element);
  }

  handlePageEvent(event: any) {
    
  }
}
