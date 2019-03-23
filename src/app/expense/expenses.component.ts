import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../expense';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

    constructor(private expenseService: ExpenseService) {
    }

    expenses: Expense[];

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes(): void {
        this.expenseService.getExpenses()
        .subscribe(expenses => this.expenses = expenses);
    }

    add(title: string, amount: number, type: string): void {
        title = title.trim();
        type = type.trim();
        if (!title || !type || amount <= 0) { return; }
        this.expenseService.addExpense({ title, amount, type } as Expense)
          .subscribe(expense => {
            this.expenses.push(expense);
          });
    }

    delete(expense: Expense): void {
        this.expenses = this.expenses.filter(e => e !== expense);
        this.expenseService.deleteExpense(expense).subscribe();
      }

}
