import { Component, OnInit, Input } from '@angular/core';
import { Expense } from '../expense';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  @Input() expense: Expense;

  constructor() { }

  ngOnInit() {
  }

}
