import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IncomeService } from '../services/income.service';
import { Income } from '../income';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  income: Income;
  incomeService: IncomeService;
  constructor(incomeService: IncomeService
    , private route: ActivatedRoute
    , private location: Location) {
    this.incomeService = incomeService;
   }

  ngOnInit() {
    this.getExpense();
  }

  getExpense(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.incomeService.getIncome(id)
    .subscribe(income => this.income = income);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.incomeService.updateIncome(this.income)
      .subscribe(() => this.goBack());
  }

}
