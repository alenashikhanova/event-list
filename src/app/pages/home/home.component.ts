import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  date!: string;
  constructor() { }

  ngOnInit(): void {}

  updateDate(date: string): void {
    this.date = date;
  }
}
