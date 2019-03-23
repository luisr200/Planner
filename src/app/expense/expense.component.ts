import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../expense';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expense: Expense;

  constructor(
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getExpense();
  }

  getExpense(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.expenseService.getExpense(id)
    .subscribe(expense => this.expense = expense);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.expenseService.updateExpense(this.expense)
      .subscribe(() => this.goBack());
  }

}
