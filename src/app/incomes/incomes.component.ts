import { Component, OnInit } from '@angular/core';
import { IncomeService } from '../services/income.service';
import { Income } from '../income';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.css']
})
export class IncomesComponent implements OnInit {
  incomes: Income[];
  incomeService: IncomeService;
  incomeSum: number;
  constructor(incomeService: IncomeService) {
    this.incomeService = incomeService;
  }

  ngOnInit() {
    this.getIncome();
  }

  getIncome(): void {
    this.incomeService.getIncomes()
    .subscribe(s => {
      this.incomes = s;
      this.getSum();
    });
  }

  getSum(): void {
    this.incomeSum = this.incomes.reduce((prev, curr) => prev + curr.amount, 0);
    //this.incomes.forEach((i) => { this.incomeSum += i.amount; });
  }

}
