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
  myDate = new Date();
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
    this.incomeSum = this.incomes.reduce((prev, curr) => prev + Number(curr.amount), 0);
    // this.incomes.forEach((i) => { this.incomeSum += i.amount; });
  }

  delete(id: Income | number): void {
    this.incomes = this.incomes.filter(e => e !== id);
    this.incomeService.deleteIncome(id).subscribe();
  }

  add(title: string, amount: string, type: string): void {
    title = title.trim();
    type = type.trim();
    if (!title || !type) { return; }
    this.incomeService.addIncome({ title, amount, type, id : "5", email:"luisrb200@gmail.com", dateCreated:this.myDate.toString(), currency:"USD" } as Income)
      .subscribe(income => {
        this.incomes.push(income);
    });
  }

}
