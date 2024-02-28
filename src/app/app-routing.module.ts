import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReportListingComponent } from './pages/report-listing/report-listing.component';
import { PowerbiComponent } from './pages/dashboard/powerbi/powerbi.component';
import { SsrsComponent } from './pages/dashboard/ssrs/ssrs.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/powerbi', component: PowerbiComponent },
  { path: 'dashboard/ssrs', component: SsrsComponent },
  { path: 'report-listing', component: ReportListingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
