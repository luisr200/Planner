import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Expense } from '../expense';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const expenses = [
      {
          id: 1,
          amount: 15000,
          title: 'Rent',
          type: 'monthly'
        },
        {
          id: 2,
          amount: 1500,
          title: 'Gasolina',
          type: 'monthly'
        },
        {
          id: 3,
          amount: 2000,
          title: 'Renta',
          type: 'monthly'
        },
        {
          id: 4,
          amount: 500000,
          title: 'Comida',
          type: 'monthly'
        }
      ];
    return {expenses};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(expenses: Expense[]): number {
    return expenses.length > 0 ? Math.max(...expenses.map(expense => expense.id)) + 1 : 11;
  }
}