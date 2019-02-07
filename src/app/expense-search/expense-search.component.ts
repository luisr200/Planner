import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
 import { Expense } from '../expense'
 import { ExpenseService } from '../services/expense.service'

@Component({
  selector: 'app-expense-search',
  templateUrl: './expense-search.component.html',
  styleUrls: ['./expense-search.component.css']
})
export class ExpenseSearchComponent implements OnInit {
  expenses$: Observable<Expense[]>;
  private searchTerms = new Subject<string>();
 
  constructor(private expenseService: ExpenseService) {}
 
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
 
  ngOnInit(): void {
    this.expenses$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.expenseService.searchExpenses(term)),
    );
  }
}
