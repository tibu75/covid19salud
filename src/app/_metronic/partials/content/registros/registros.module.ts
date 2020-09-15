import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroFormComponent } from './registroform/registroform.component';
import { RegistroWrapperComponent } from './registro-wrapper/registro-wrapper.component';
import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  declarations: [RegistroFormComponent, RegistroWrapperComponent],
  imports: [CommonModule, WidgetsModule],
  exports: [RegistroWrapperComponent],
})
export class RegistrosModule {}
