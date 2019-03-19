import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExpensesComponent} from './expense/expenses.component';
import {ExpenseComponent} from './expense/expense.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { IncomesComponent } from './incomes/incomes.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'expense/:id', component: ExpenseComponent },
  { path: 'expense', component: ExpensesComponent },
  { path: 'income', component: IncomesComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
