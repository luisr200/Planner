import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Expense } from './expense'
import { EXPENSES } from './mock-expenses'
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, empty } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private expensesUrl = 'api/expenses';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.expensesUrl)
    .pipe(
      catchError(this.handleError('getHeroes', []))
    );
  }

  getExpense(id: number): Observable<Expense> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(EXPENSES.find(exp => exp.id === id))
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
