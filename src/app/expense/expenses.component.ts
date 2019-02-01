import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

    constructor(private expenseService: ExpenseService) { 
    }

    expenses: Expense[];
    selectedExpense: Expense;
    onSelect(expense: Expense): void {
        this.selectedExpense = expense;
    }

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes(): void{
        this.expenseService.getExpenses()
        .subscribe(expenses => this.expenses = expenses)
    }

}
