import { Injectable } from '@angular/core';
import {EXPENSES} from './mock-expenses'
import {Expense} from './expense'
import { Observable, of, empty } from 'rxjs';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private messageService: MessageService) { }

  getExpenses(): Observable<Expense[]> {
    return of(EXPENSES);
  }

  getExpense(id: number): Observable<Expense> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(EXPENSES.find(exp => exp.id === id))
  }
}
