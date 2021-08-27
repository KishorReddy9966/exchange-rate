import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {  MatSortModule } from '@angular/material/sort';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [],
  exports: [
    HttpClientModule,
    MatTooltipModule,
    MatSelectModule,
    MatSortModule,
    FormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatTableModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class SharedModule { }
