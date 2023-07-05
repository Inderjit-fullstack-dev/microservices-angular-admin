import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [DeleteDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    DeleteDialogComponent,
    NgxEditorModule,
  ],
})
export class SharedModule {}
