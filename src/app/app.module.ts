import { NgModule, APP_INITIALIZER } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { ClipboardModule } from "ngx-clipboard";
import { TranslateModule } from "@ngx-translate/core";
import { InlineSVGModule } from "ng-inline-svg";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthService } from "./modules/auth/_services/auth.service";
import { FakeAPIService } from "./_helpers/fake/fake-api.service";
import { environment } from "src/environments/environment";
import { AuthInterceptorService } from "../app/modules/auth/_services/auth-interceptor.service";
// Highlight JS
import { HighlightModule, HIGHLIGHT_OPTIONS } from "ngx-highlightjs";
import highlight from "highlight.js/lib/highlight";
import xml from "highlight.js/lib/languages/xml";
import json from "highlight.js/lib/languages/json";
import scss from "highlight.js/lib/languages/scss";
import typescript from "highlight.js/lib/languages/typescript";
import { SplashScreenModule } from "./_metronic/partials/layout/splash-screen/splash-screen.module";
import { RegistroComponent } from "./pages/registros/registro/registro.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { ToastrModule } from "ngx-toastr";
import { MostrarComponent } from "./pages/registros/mostrar/mostrar.component";
import { LlamadaComponent } from "./pages/registros/llamada/llamada.component";
import { IndicadoresComponent } from "./pages/indicadores/indicadores.component";
import { ExportarComponent } from "./pages/exportar/exportar.component";
import { RegllamadaComponent } from "./pages/registros/mostrar/regllamada/regllamada.component";
import { MatDialogModule } from "@angular/material/dialog";
import { RegistrosComponent } from "./pages/registros/registros.component";
import { IndicadoresModule } from "./pages/indicadores/indicadores.module";
import { NgApexchartsModule } from "ng-apexcharts";
function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

/**
 * Import specific languages to avoid importing everything
 * The following will lazy load highlight.js core script (~9.6KB) + the selected languages bundle (each lang. ~1kb)
 */
export function getHighlightLanguages() {
  return [
    { name: "typescript", func: typescript },
    { name: "scss", func: scss },
    { name: "xml", func: xml },
    { name: "json", func: json },
  ];
}

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    RegistrosComponent,
    MostrarComponent,
    LlamadaComponent,
    IndicadoresComponent,
    ExportarComponent,
    RegllamadaComponent,
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-top-center",
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    SplashScreenModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    HighlightModule,
    ClipboardModule,
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        })
      : [],
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    MatDialogModule,
    IndicadoresModule,
    NgApexchartsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: getHighlightLanguages,
      },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
