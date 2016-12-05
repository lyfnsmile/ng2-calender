import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

    getMonthSize(date ? : string): number {

        const dateTime: Date = date ? new Date(date) : new Date();
        const year: number = dateTime.getFullYear();
        const month: number = dateTime.getMonth() + 1;

        return new Date(year, month, 0).getDate()

    }

    getFirstDay(year: number, month: number): number {
        return new Date(year, month, 1).getDay()

    }

}
