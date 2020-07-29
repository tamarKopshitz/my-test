import { Injectable } from "@angular/core"
import { Actions, Effect, ofType } from '@ngrx/effects';
import { getStock, addStock, updateStocks, updateAll } from "./global-state.actions";
import { StockService } from "../services/stock.service";
import { mergeMap, tap, catchError, switchMap, map, filter } from 'rxjs/operators';
import * as fromReducer from "../store/global-state.reducer";
import { Store, select } from '@ngrx/store';
import { fromEvent } from 'rxjs';

@Injectable()
export class GlobalEffects {
    @Effect()
    getStock$ = this.actions$.pipe(
        ofType(getStock),
        mergeMap(action => this.service.getStocksByName(action.symbol).pipe(
            tap(stock => console.log(stock)),
            switchMap((result) => [
                addStock({ stock: result }),
            ])
        )))

    @Effect()
    updateStocks$ = this.actions$.pipe(
        ofType(updateStocks),
        mergeMap(action => this.service.updateStocks(
            this.store.pipe(select(fromReducer.getSelectedSymbols)),
            this.store.pipe(select(fromReducer.getUpdateId))
        ).pipe(
            tap(stock => console.log(stock)),
            switchMap((result) => [
                updateAll({ stocks: result }),
            ])
        )))

    constructor(private actions$: Actions, private service: StockService,
        private store: Store<fromReducer.State>) { }

}