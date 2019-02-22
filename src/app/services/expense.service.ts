import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Expense } from '../expense'
import { EXPENSES } from '../mock-expenses'
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, empty } from 'rxjs';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ExpenseService {

  private expensesUrl = 'api/expenses';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.expensesUrl)
    .pipe(
      //tap(_ => this.log('fetched expenses')),
      catchError(this.handleError('getExpenses', []))
    );
  }

  getExpense(id: number): Observable<Expense> {
    const url = `${this.expensesUrl}/${id}`;
    return this.http.get<Expense>(url).pipe(
      //tap(_ => this.log(`fetched expense id=${id}`)),
      catchError(this.handleError<Expense>(`getExpense id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateExpense (expense: Expense): Observable<any> {
    return this.http.put(this.expensesUrl, expense, httpOptions).pipe(
      //tap(_ => this.log(`updated expense id=${expense.id}`)),
      catchError(this.handleError<any>('updateExpense'))
    );
  }
  
  /** POST: add a new hero to the server */
  addExpense (expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.expensesUrl, expense, httpOptions).pipe(
      //tap((newExpense: Expense) => this.log(`added expense w/ id=${newExpense.id}`)),
      catchError(this.handleError<Expense>('addExpense'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteExpense (expense: Expense | number): Observable<Expense> {
    const id = typeof expense === 'number' ? expense : expense.id;
    const url = `${this.expensesUrl}/${id}`;

    return this.http.delete<Expense>(url, httpOptions).pipe(
      //tap(_ => this.log(`deleted expense id=${id}`)),
      catchError(this.handleError<Expense>('deleteExpense'))
    );
  }

  /* GET heroes whose name contains search term */
  searchExpenses(term: string): Observable<Expense[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Expense[]>(`${this.expensesUrl}/?title=${term}`).pipe(
      //tap(_ => this.log(`found expenses matching "${term}"`)),
      catchError(this.handleError<Expense[]>('searchExpenses', []))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ExpenseService: ${message}`);
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
