import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SearchModule { }
