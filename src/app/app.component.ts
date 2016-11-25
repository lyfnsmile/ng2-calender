import { Component } from '@angular/core';
import UtilsService from './utils.service';
console.log(new UtilsService())
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [UtilsService]
})
export class AppComponent {
    public utils
    public results
    public currentDate
    public selectedIndex

    constructor(utils: UtilsService) {
        this.utils = utils;
        this.init();
        console.log(this.results)
    }

    private init(dateTime ? : string): void {
        let date, year, month, day;

        if (dateTime) {
            date = new Date(dateTime);
            [year, month, day] = this.currentDate.split('-');
        } else {
            date = new Date();
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
        }

        const _year = new Date().getFullYear();
        const _month = new Date().getMonth() + 1;
        var _day = new Date().getDate()


        this.currentDate = `${year}-${month}-${day}`

        const weekLength = 7;
        const monthSize = this.utils.getMonthSize();
        const prevMonthSize = this.utils.getMonthSize(`${year}/${month - 1}/1`);
        const firstDay = this.utils.getFirstDay(year, month - 1);

        let lines: number = Math.ceil((firstDay + monthSize) / weekLength);
        let initPrevDay = prevMonthSize - firstDay;
        let _m = new Array(lines * weekLength);

        this.results = new Array(lines);

        for (let i = 0; i < _m.length; i++) {
            let weekIndex = (i / weekLength).toFixed(0);

            if (i < firstDay) {
                _m[i] = {
                    weekIndex,
                    isCurMonth: false,
                    date: ++initPrevDay,
                    isCurDay: false
                }
            } else if (i >= monthSize + firstDay) {
                _m[i] = {
                    weekIndex,
                    isCurMonth: false,
                    date: i - monthSize - firstDay + 1,
                    isCurDay: false
                }
            } else {
                if (i - firstDay + 1 === _day && +year === _year && +month === _month) {

                    _m[i] = {
                        weekIndex,
                        date: i - firstDay + 1,
                        isCurMonth: true,
                        isCurDay: true
                    }
                } else {
                    _m[i] = {
                        weekIndex,
                        isCurMonth: true,
                        date: i - firstDay + 1,
                        isCurDay: false
                    }
                }

            }
        }

        for (let i = 0; i < lines; i++) {
            this.results[i] = []
            for (let k = 0; k < weekLength; k++) {
                let index = k + i * weekLength;
                this.results[i][k] = _m[index]
            }
        }
    }

    public onSelect(days: number): void {
        this.selectedIndex = days;
        let [year, month, day] = this.currentDate.split('-');
        day = days;
        this.currentDate = `${year}-${month}-${day}`;
    }


    public tabYear(val: number): void {
        this.selectedIndex = 0;
        let [year, month, day] = this.currentDate.split('-');
        year = +year + val;
        this.currentDate = `${year}-${month}-${day}`;
        this.init(this.currentDate)
    }

    public tabMonth(val: number): void {
        this.selectedIndex = 0;
        let [year, month, day] = this.currentDate.split('-');
        if (month == 12 && val === 1) {
            year = +year + val;
            month = 1;
        } else if (month == 1 && val == -1) {
            year = +year + val;
            month = 12;
        } else {
            month = +month + val;
        }

        this.currentDate = `${year}-${month}-${day}`;
        this.init(this.currentDate);
    }

    public backToday(): void {
        let [year, month, day] = this.currentDate.split('-');
        const _year = new Date().getFullYear();
        const _month = new Date().getMonth() + 1;
        if (_year == year && _month == month) return;
        this.selectedIndex = 0;
        this.init()
    }
}
