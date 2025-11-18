import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { authGuard } from "../../core/guards/Auth/auth.guard";

export const dashboardRoute : Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [authGuard]
    }

]