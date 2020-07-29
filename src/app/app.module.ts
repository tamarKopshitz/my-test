import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { reducer } from "./store/global-state.reducer";
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { StockService } from './services/stock.service';
import { StockComponent } from './stock/stock.component';
import { StockFilterComponent } from './stock-filter/stock-filter.component';
import { GlobalEffects } from './store/global-state.effects';
import { storageMetaReducer } from './store/storage.metareducer';


@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    StockFilterComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(reducer,
      {
        metaReducers: [storageMetaReducer]
      }
    ),
    StoreModule.forFeature('Global', reducer),
    EffectsModule.forRoot([GlobalEffects]),
    StoreDevtoolsModule.instrument({
      name: 'Global',
      maxAge: 25,

    }),
    InputsModule,
    BrowserAnimationsModule,
    DropDownsModule,
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
