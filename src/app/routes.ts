import { AppComponent } from './app.component'
import { OcrComponent, DashboardGroupComponent } from './components/ocr/ocr.component'

import { Routes } from '@angular/router'

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
  { path: 'dash', component: DashboardGroupComponent },
  { path: 'ocr', component: OcrComponent }
];
