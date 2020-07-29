import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromReducer from "../store/global-state.reducer";
import { deleteStock } from '../store/global-state.actions';
import { timer } from 'rxjs';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  stocks$ = this.store.pipe(select(fromReducer.getStocks));
  isDisplay: boolean = false;
  constructor(private store: Store<fromReducer.State>) { }

  ngOnInit(): void {
    this.stocks$ = this.store.pipe(select(fromReducer.getStocks));
    this.stocks$.subscribe(d => {
      console.log("stocks", d);
      this.isDisplay = true;
    }
    );

  }

  delete(symbol: string) {
    console.log("delete", symbol);
    this.store.dispatch(deleteStock({ symbol: symbol }));
  }

}
