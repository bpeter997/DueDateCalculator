import DateFormat from "./DateFormat";
import TimeMethods from "./TimeMethods";

export default class DueDateCalculator {

    private static _workingHoursPerDay: number = 8

    public calculateDueDate(startDate: Date, turnaroundTimeinHours: number): DateFormat {
        startDate = this.convertDateToLocalTimeZone(startDate);
        
        this.validateStartDate(startDate);
        this.validateTurnaroundTime(turnaroundTimeinHours);
        
        const workingDaysOfWorkByTurnAroundTime: number = Math.floor(turnaroundTimeinHours / DueDateCalculator._workingHoursPerDay);
        const workingHoursOfWorkByTurnAroundTime: number = turnaroundTimeinHours % DueDateCalculator._workingHoursPerDay;

        let finishDate: Date = this.increaseDays(startDate, workingDaysOfWorkByTurnAroundTime);        
                
        finishDate = this.increaseHours(finishDate, workingHoursOfWorkByTurnAroundTime);

        if(TimeMethods.isOutOfWorkingHours(finishDate)) finishDate = this.increaseHours(finishDate, 16)
        
        return TimeMethods.createTimeFromUtcString(finishDate);
    }

    private convertDateToLocalTimeZone(date: Date): Date {
        const localTimeDifferenceFromUtc: number = date.getTimezoneOffset() / 60;        
        return this.increaseHours(date, -localTimeDifferenceFromUtc);
    }

    private increaseDays(date: Date, numberOfDays: number): Date {
        let increasedDate: Date = new Date(date);
        while(numberOfDays>0) {
            increasedDate = new Date(date.setUTCDate(date.getUTCDate() + 1));
            if(!TimeMethods.isDateWeekend(increasedDate)) numberOfDays--;
        }
        return increasedDate;
    }

    private increaseHours(date: Date, numberOfHours: number): Date {
        let increasedDate: Date = new Date(date.setUTCHours(date.getUTCHours() + numberOfHours));
        while (TimeMethods.isDateWeekend(increasedDate)) {
            increasedDate = new Date(increasedDate.setUTCDate(increasedDate.getUTCDate() + (numberOfHours/Math.abs(numberOfHours))));
        }
        return increasedDate
    }

    private validateStartDate(startDate: Date): void {
        if (TimeMethods.isDateWeekend(startDate)) throw new Error('Start date must be weekday!');
        if (TimeMethods.isOutOfWorkingHours(startDate)) throw new Error('Start date must be bwtween 9am and 17pm!');
        if (!Date.parse(startDate.toString())) throw new Error('Invalid date format!');
    }

    private validateTurnaroundTime(turnaroundTime: number): void {
        if (turnaroundTime < 1) throw new Error('Invalid turnaround time!')
    }

}