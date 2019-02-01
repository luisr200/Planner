import { Component, OnInit } from '@angular/core';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.getExpenses();
  }

  getExpenses(): void {
    this.expenseService.getExpenses()
      .subscribe(expense => this.expenses = expense.slice(1, 5));
  }
}