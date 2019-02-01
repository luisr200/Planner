import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExpensesComponent} from './expense/expenses.component'
import {DashboardComponent} from './dashboard/dashboard.component'

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
