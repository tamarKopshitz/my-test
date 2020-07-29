import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { SymbolModel, StockModel } from '../models/stock.model'

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  getSymbolsByName(params): Observable<SymbolModel[]> {
    console.log("getStocksByName", params);
    const url = 'https://mobiledev.ordernet.co.il/api/stocks?';
    return this.http.get<any>(url, { params: params });
  }

  getStocksByName(symbol): Observable<StockModel> {

    const prms = { symbols: symbol.id };
    console.log("getStocksByName", prms);
    const url = 'https://mobiledev.ordernet.co.il/api/stocks?';
    return this.http.get<StockModel>(url, { params: prms });
  }

  updateStocks(symbols: Observable<any>, updateId: Observable<any>) {

    let selectedSymbols;
    let selectedUpdateId;

    symbols.subscribe(
      data => selectedSymbols = data.join()
    )

    updateId.subscribe(
      data => selectedUpdateId = data
    )
    if (selectedSymbols === "" || selectedUpdateId <= 0) {
      return of([]);
    }
    const prms = { symbols: selectedSymbols, updateid: selectedUpdateId };
    const url = 'https://mobiledev.ordernet.co.il/api/stocks?';
    return this.http.get<any[]>(url, { params: prms });


  }

}

