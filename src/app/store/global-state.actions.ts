import { createAction, props } from '@ngrx/store';
import { StockModel } from '../models/stock.model';

export const getStock = createAction(
  '[Get Stock] Get Stock',
  props<{ symbol: string }>(),
)

export const addStock = createAction(
  '[Add Stock] Add Stock',
  props<{ stock: any }>(),
)

export const getAllStocks = createAction(
  '[Get All] Get All Stock',
)

export const deleteStock = createAction(
  '[Delete Stock] Delete Stock',
  props<{ symbol: string }>(),
)

export const updateStocks = createAction(
  '[Update Stocks] Update Stocks',
)

export const updateAll = createAction(
  '[Update All] Update All',
  props<{ stocks: any }>(),
)
