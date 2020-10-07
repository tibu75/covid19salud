import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminGuard } from "../modules/auth/_services/admin.guard";
import { LayoutComponent } from "./_layout/layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "builder",
        loadChildren: () =>
          import("./builder/builder.module").then((m) => m.BuilderModule),
      },
      {
        path: "registro",
        loadChildren: () =>
          import("../pages/registros/registro/registro.module").then(
            (m) => m.RegistroModule
          ),
      },
      {
        path: "mostrar",
        loadChildren: () =>
          import("../pages/registros/mostrar/mostrar.module").then(
            (m) => m.MostrarModule
          ),
      },
      {
        path: "llamada",
        loadChildren: () =>
          import("../pages/registros/llamada/llamada.module").then(
            (m) => m.LlamadaModule
          ),
      },
      {
        path: "registros",
        loadChildren: () =>
          import("../pages/registros/registros.module").then(
            (m) => m.RegistrosModule
          ),
      },
      {
        path: "indicadores",
        canActivate: [AdminGuard],
        loadChildren: () =>
          import("../pages/indicadores/indicadores.module").then(
            (m) => m.IndicadoresModule
          ),
      },
      {
        path: "exportar",
        canActivate: [AdminGuard],
        loadChildren: () =>
          import("../pages/exportar/exportar.module").then(
            (m) => m.ExportarModule
          ),
      },

      {
        path: "user-management",

        loadChildren: () =>
          import("../modules/user-management/user-management.module").then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: "ngbootstrap",
        loadChildren: () =>
          import("../modules/ngbootstrap/ngbootstrap.module").then(
            (m) => m.NgbootstrapModule
          ),
      },
      {
        path: "material",
        loadChildren: () =>
          import("../modules/material/material.module").then(
            (m) => m.MaterialModule
          ),
      },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "**",
        redirectTo: "errors/404",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
