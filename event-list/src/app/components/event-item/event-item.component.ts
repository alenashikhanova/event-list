import { Component, Input, OnInit } from '@angular/core';
import { EventInterface } from 'src/app/interfaces/event.interface';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent implements OnInit {

  @Input() event!: EventInterface;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {}

  edit(event: EventInterface): void{
    console.log(event);
  }

  delete(event: EventInterface): void {
    console.log(event);
    this.dataService.deleteEvent(event.id);
  }
}
