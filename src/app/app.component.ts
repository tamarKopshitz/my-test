import { Component, OnInit } from '@angular/core';
import { StockService } from './services/stock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public listItems: Array<string> = [
    "Albania",
    "Andorra",
    "Armenia",
    "Austria",
    "Azerbaijan",
    "Belarus",
    "Belgium",
    "Bosnia & Herzegovina",
    "Bulgaria",
    "Croatia",
    "Cyprus",
    "Czech Republic"]

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
  }

  // filterChange(filterValue: string) {
  //   console.log("filterChange",filterValue);
  //   this.stockService.getStocksByName({query: filterValue}).subscribe
  //   (data => console.log(data));
   
  // }
  // valueChange(valueChange: string) {
  //   console.log("valueChange",valueChange);
  // }
}