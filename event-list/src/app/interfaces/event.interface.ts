export interface EventInterface {
  id: number;
  name: string;
  type: EventType;
  budget?: number;
  date: string;
  address?: string;
  note?: string;
  time?: string;
}

export enum EventType {
  holiday = 'Праздник',
  event = 'Мероприятие',
  note = 'Прочее'
}

