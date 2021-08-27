import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExchangeApiService } from '../exchange-api.service';

@Component({
  selector: 'app-currency-exchange-rate',
  templateUrl: './currency-exchange-rate.component.html',
  styleUrls: ['./currency-exchange-rate.component.scss']
})
export class CurrencyExchangeRateComponent implements OnInit, AfterViewInit {
  symbols: any[] = [];
  date = new FormControl(new Date());
  symbolsMap: any = {};

  exchangeRates: any[] = [];
  baseCurrency: any = 'EUR';

  displayedColumns: string[] = ['symbol', 'currency', 'rate'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private exchangeService: ExchangeApiService, private route: Router) { }

  ngOnInit(): void {
    this.exchangeService.getSupportedCurrencies().subscribe((data: any) => {
      if (data && data.symbols) {
        this.symbolsMap = data.symbols;
        for (let key of Object.keys(data.symbols)) {
          this.symbols.push({ symbol: key, name: data.symbols[key] })
        }
        this.loadExchangeRate();
      }
    });


  }

  /**
   * 
   */
  loadExchangeRate() {
    this.exchangeService.getExchangeRateFor(this.baseCurrency, this.date.value).subscribe((data: any) => {
      if (data && data.rates) {
        this.exchangeRates = [];
        for (let key of Object.keys(data.rates)) {
          this.exchangeRates.push({ symbol: key, rate: data.rates[key] });
        }
        this.dataSource.data = this.exchangeRates;
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openHistoticalData(to: string) {
    this.route.navigate(['/historical'], { queryParams: { base: this.baseCurrency, to }, queryParamsHandling: 'merge' });
  }

}
