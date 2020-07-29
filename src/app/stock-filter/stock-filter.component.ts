import { Component, OnInit, OnDestroy } from '@angular/core';
import { StockService } from '../services/stock.service';
import { SymbolModel } from '../models/stock.model';
import { Observable, timer, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { addStock, getStock, updateStocks } from '../store/global-state.actions';
import * as fromReducer from "../store/global-state.reducer";

@Component({
  selector: 'app-stock-filter',
  templateUrl: './stock-filter.component.html',
  styleUrls: ['./stock-filter.component.scss']
})
export class StockFilterComponent implements OnInit, OnDestroy {

  public symbols: Observable<any>;
  symbolsList: any[] = [];
  symbols$ = this.store.pipe(select(fromReducer.getSelectedSymbols));
  timer = timer(0, 500);
  isTimerSubscribed: boolean = false;
  isExistsSymbol: boolean;
  subscribe: Subscription;
  selectedSymbol;

  constructor(private stockService: StockService, private store: Store<fromReducer.State>) { }

  ngOnInit(): void {

    this.stockService.getSymbolsByName({ query: 'GO' }).subscribe(
      symbols => {
        symbols.forEach(symbol => {
          this.symbolsList.push({ id: symbol.Symbol, name: symbol.Symbol + " " + symbol.Name })
        });
      });
  }

  filterChange(filterValue: string) {
    console.log("filterChange", filterValue);
    this.symbolsList = [];
    this.stockService.getSymbolsByName({ query: filterValue }).subscribe(
      symbols => {
        symbols.forEach(symbol => {
          this.symbolsList.push({ id: symbol.Symbol, name: symbol.Symbol + " - " + symbol.Name })
        });

      }
    );
  }

  valueChange(valueChange: string) {
    if (!valueChange && valueChange === "") { return; }

    this.symbols$.subscribe(
      symbols => {
     this.selectedSymbol = this.symbolsList.filter(s => s.name == valueChange);
        if (this.selectedSymbol && this.selectedSymbol.length > 0)
          this.isExistsSymbol = symbols.some(s => s == this.selectedSymbol[0].id);
      });

    if (this.isExistsSymbol) {
      alert("already subscribed");
    }
    else {
      this.store.dispatch(getStock({symbol: this.selectedSymbol[0]}));
    }

    if (!this.isTimerSubscribed) {
      this.subscribe = this.timer.subscribe(
        val => {
          this.store.dispatch(updateStocks())
        }
      )
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}

