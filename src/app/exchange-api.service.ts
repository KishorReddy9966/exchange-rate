import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APIConstants } from './constants/api.constants';
import * as _moment from 'moment';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TimeSeriesData, TimseSeriesResponse } from './constants/mock.data';

@Injectable({
  providedIn: 'root'
})
export class ExchangeApiService {

  private params: any = {}

  constructor(private http: HttpClient) {
    this.params = { 'access_key': environment.apikey };
    // this.params.('access_key', environment.apikey);
  }

  getSupportedCurrencies() {
    return this.http.get(APIConstants.BASE_URL + APIConstants.SUPPORTED_CURRENCIES, { params: this.params });
  }

  getExchangeRateFor(base?: any, time?: Date) {
    let params: any = Object.assign({}, this.params);
    let url = APIConstants.BASE_URL + APIConstants.EXCHANGE_RATE;
    if (time) {
      url = APIConstants.BASE_URL + APIConstants.HISTORIC_RATE + this.getFormattedDate(time);
    }
    if (base) {
      url = url + '? base = '+ base;
    }
    return this.http.get(url, { params: params });
  }

  getTimeSeries(base: any, start: any, end: any, to: any) {
    let params: any = Object.assign({}, this.params);
    params.base=base;
    params.start=start;
    params.end=end;
    params.to=to;
     return this.http.get(APIConstants.BASE_URL + APIConstants.TIMESERIES,  { params: params }).pipe(map(result => {
      return result;
    }), 
    catchError(err => {
      console.log('Caught in CatchError. Returning mock')
      return of(TimseSeriesResponse);
    }));
  }

  getFormattedDate(time: Date) {
    return _moment(time).format('YYYY-MM-DD');
  }

}
