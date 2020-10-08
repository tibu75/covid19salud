import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  SettingsService,
  SharedService,
  SidebarService,
  PersonaService,
  RegistrosService
} from "./settings.service.index";
import { Form0800Service, ExporterService } from "./settings.service.index";
//Web Services
import { RenaperService, RRHHService } from "./settings.service.index";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    PersonaService,
    RenaperService,
    RRHHService,
    RegistrosService,
    Form0800Service,
    ExporterService,
  ],
})
export class ServiceModule {}
