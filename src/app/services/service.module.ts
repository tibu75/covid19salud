import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  SettingsService,
  SharedService,
  SidebarService,
  PersonaService,
  RegistrosService
} from "./settings.service.index";
import { LoginGuardGuard } from "./guards/login-guard.guard";
import {
  Form0800Service,
  ExporterService,
  Reg0800Service,
  FiltroService,
} from "./settings.service.index";
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
    Reg0800Service,
    ExporterService,
    FiltroService,
  ],
})
export class ServiceModule {}
