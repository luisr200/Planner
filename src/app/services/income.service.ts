import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Income } from '../Income'
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, empty } from 'rxjs';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class IncomeService {

  private incomesUrl = 'https://nzzdpl7p63.execute-api.us-west-2.amazonaws.com/Stage/Income';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getIncomes(): Observable<Income[]> {
    return this.http.get<Income[]>(this.incomesUrl)
    .pipe(
      catchError(this.handleError('getIncomes', []))
    );
  }

  getIncome(id: number): Observable<Income> {
    const url = `${this.incomesUrl}/${id}`;
    return this.http.get<Income>(url).pipe(
      //tap(_ => this.log(`fetched Income id=${id}`)),
      catchError(this.handleError<Income>(`getIncome id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateIncome (income: Income): Observable<any> {
    return this.http.put(this.incomesUrl, income, httpOptions).pipe(
      //tap(_ => this.log(`updated Income id=${Income.id}`)),
      catchError(this.handleError<any>('updateIncome'))
    );
  }

  /** POST: add a new hero to the server */
  addIncome (income: Income): Observable<Income> {
    return this.http.post<Income>(this.incomesUrl, income, httpOptions).pipe(
      //tap((newIncome: Income) => this.log(`added Income w/ id=${newIncome.id}`)),
      catchError(this.handleError<Income>('addIncome'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteIncome (income: Income | number): Observable<Income> {
    const id = typeof income === 'number' ? income : income.id;
    const url = `${this.incomesUrl}/${id}`;

    return this.http.delete<Income>(url, httpOptions).pipe(
      //tap(_ => this.log(`deleted Income id=${id}`)),
      catchError(this.handleError<Income>('deleteIncome'))
    );
  }

  /* GET heroes whose name contains search term */
  searchIncomes(term: string): Observable<Income[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Income[]>(`${this.incomesUrl}/?title=${term}`).pipe(
      //tap(_ => this.log(`found Incomes matching "${term}"`)),
      catchError(this.handleError<Income[]>('searchIncomes', []))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`IncomeService: ${message}`);
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
