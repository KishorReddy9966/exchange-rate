import { Component, OnInit } from '@angular/core';
import { ExchangeApiService } from '../exchange-api.service';

@Component({
  selector: 'app-currency-exchange-rate',
  templateUrl: './currency-exchange-rate.component.html',
  styleUrls: ['./currency-exchange-rate.component.scss']
})
export class CurrencyExchangeRateComponent implements OnInit {
  symbols: any[] = [];
  date: any[] = [];

  constructor(private exchangeService: ExchangeApiService) { }

  ngOnInit(): void {
    this.exchangeService.getSupportedCurrencies().subscribe((data: any) => {
      if (data && data.symbols) {
        for (let key of Object.keys(data.symbols)) {
          this.symbols.push({ symbol: key, name: data.symbols[key]})
        }
      }
     
            
    });

    
   
  }

   

  getExchangeRate() {
    

  }


  // exchange rate service
  // 

}
