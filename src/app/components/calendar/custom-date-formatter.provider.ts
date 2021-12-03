import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {

  public override monthViewColumnHeader({ date, locale = 'en' }: DateFormatterParams): string {
    return formatDate(date, 'EEEEEE', locale);
  }

  public override monthViewTitle({ date, locale = 'en' }: DateFormatterParams): string {
    return formatDate(date, 'MMM y', locale);
  }

  public override weekViewColumnHeader({ date, locale = 'en' }: DateFormatterParams): string {
    return formatDate(date, 'EEEEEE', locale);
  }

  public override dayViewHour({ date, locale = 'en' }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', locale);
  }
}
