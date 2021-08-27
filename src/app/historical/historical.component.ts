import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { utcSundays } from 'd3';
import { ExchangeApiService } from '../exchange-api.service';


@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit {
  symbols: any[] = [];
  range = new FormGroup({
    start: new FormControl(new Date('2021-01-01')),
    end: new FormControl(new Date())
  });
  symbolsMap: any = {};

  exchangeRates: any[] = [];
  baseCurrency: any = 'EUR';
  toCurrency: any = 'USD';

  displayedColumns: string[] = ['symbol', 'currency', 'rate'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  data = [];

  constructor(private exchangeService: ExchangeApiService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((data: any) => {
      if (data.base) {
        this.baseCurrency = data.base;
      }
      if (data.to) {
        this.toCurrency = data.to;
      }

      this.exchangeService.getSupportedCurrencies().subscribe((data: any) => {
        if (data && data.symbols) {
          this.symbolsMap = data.symbols;
          for (let key of Object.keys(data.symbols)) {
            this.symbols.push({ symbol: key, name: data.symbols[key] })
          }
          this.loadChart();
        }
      });

    });

  }

  ngOnInit(): void {

  }

  loadChart() {
    this.exchangeService.getTimeSeries(this.baseCurrency, this.range.value.start, this.range.value.end, this.toCurrency).subscribe(
      (data: any) => {
        this.data = data;
      }
    )
  }

}



