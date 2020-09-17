import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegistroComponent } from './registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegistroComponent,
      },
    ]),
  ]
})
export class RegistroModule { }
