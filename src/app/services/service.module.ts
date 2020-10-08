import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  SettingsService,
  SharedService,
  SidebarService,
  UsuarioService,
  SubirArchivosService,
  EdificioService,
  PersonaService,
  RegistrosService,
} from "./settings.service.index";
import { LoginGuardGuard } from "./guards/login-guard.guard";
import {
  Form0800Service,
  ExporterService,
  Reg0800Service,
} from "./settings.service.index";
//Web Services
import { RenaperService, RRHHService } from "./settings.service.index";
import { SectoresService, AccesosService } from "./settings.service.index";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivosService,
    EdificioService,
    PersonaService,
    RenaperService,
    RRHHService,
    AccesosService,
    SectoresService,
    RegistrosService,
    Form0800Service,
    Reg0800Service,
    ExporterService,
  ],
})
export class ServiceModule {}
