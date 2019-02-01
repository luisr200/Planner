import { Injectable } from '@angular/core';
import {EXPENSES} from './mock-expenses'
import {Expense} from './expense'
import { Observable, of } from 'rxjs';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private messageService: MessageService) { }

  getExpenses(): Observable<Expense[]> {
    this.messageService.add('Message Service: fetched expenses')
    return of(EXPENSES);
  }
}
