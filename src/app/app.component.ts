import { Component, OnInit } from '@angular/core';
import { StockService } from './services/stock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private stockService: StockService) { }

  ngOnInit(): void {
  }
}