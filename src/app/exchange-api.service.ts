import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APIConstants } from './constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class ExchangeApiService {

  private params = {}

  constructor(private http: HttpClient) {
    this.params = { 'access_key': environment.apikey };
    // this.params.('access_key', environment.apikey);
  }

  getSupportedCurrencies() {
    return this.http.get(APIConstants.BASE_URL + APIConstants.SUPPORTED_CURRENCIES, { params: this.params });
  }

  getExchangeRateFor(base?: any, time?: any) {
    return this.http.get(APIConstants.BASE_URL + APIConstants.EXCHANGE_RATE, { params: this.params });
  }

  getTimeSeries(base: any, start: any, end: any, course: any) {

  }

}
