import { addStock, deleteStock, updateAll } from "./global-state.actions";
import { createSelector, createFeatureSelector, createReducer, on, Action, ActionReducer, MetaReducer } from "@ngrx/store";
import { StockModel } from '../models/stock.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface State {
  stockState: StockEntitiesState
}

export interface StockEntitiesState extends EntityState<StockModel> {
  updateId: number;
}

export const stockEntitiesAdapter: EntityAdapter<StockModel> = createEntityAdapter<StockModel>(
  {
    selectId: (stock: StockModel) => stock.Symbol
  }
);

export const initialStockState = stockEntitiesAdapter.getInitialState(
  { updateId: 0 }
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = stockEntitiesAdapter.getSelectors();


export const getGlobalState = createFeatureSelector<StockEntitiesState>(
  'Global',
)
const getStockState = createSelector(getGlobalState, state => state);
export const getStocks = createSelector(getStockState, selectAll);
export const getSelectedSymbols = createSelector(getStockState, selectIds);
export const getUpdateId = createSelector(getStockState, s => s.updateId);


export const reducer = createReducer(
  initialStockState,
  on(addStock, (state, { stock }) => {
    // const updateId = stock.UpdateId;
    console.log("updateId");
    //return stockEntitiesAdapter.addOne(stock,);
    const maxUpdate = stock.map(s => s.UpdateId)[0];
    state = stockEntitiesAdapter.addMany(stock, { ...state, updateId: maxUpdate });
    return state;
  }),
  on(deleteStock, (state, { symbol }) => {
    return stockEntitiesAdapter.removeOne(symbol, state);
  }),
  on(updateAll, (state, { stocks }) => {
    if (stocks && stocks.length > 0) {
      state = stockEntitiesAdapter.removeMany(stocks.map(s => s.Symbol), state);
      return stockEntitiesAdapter.addMany(stocks, state);
    }
    return state;
  }),

);

