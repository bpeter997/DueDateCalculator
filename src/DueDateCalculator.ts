export default class DueDateCalculator {

    private static _firstWorkingHour: number = 9;
    private static _lastWorkingHour: number = 17;
    private static _workingHoursPerDay: number = 8

    public calculateDueDate(startDate: Date, turnaroundTimeinHours: number): string {
        startDate = this.convertDateToLocalTimeZone(startDate);
        
        this.validateStartDate(startDate);
        this.validateTurnaroundTime(turnaroundTimeinHours);
        
        const workingDaysOfWorkByTurnAroundTime: number = Math.floor(turnaroundTimeinHours / DueDateCalculator._workingHoursPerDay);
        const workingHoursOfWorkByTurnAroundTime: number = turnaroundTimeinHours % DueDateCalculator._workingHoursPerDay;

        let finishDate: Date = this.increaseDays(startDate, workingDaysOfWorkByTurnAroundTime);        
                
        finishDate = this.increaseHours(finishDate, workingHoursOfWorkByTurnAroundTime);

        if(this.isOutOfWorkingHours(finishDate)) finishDate = this.increaseHours(finishDate, 16)
        
        return this.getResultTimeString(finishDate.toUTCString());
    }

    private convertDateToLocalTimeZone(date: Date): Date {
        const localTimeDifferenceFromUtc: number = date.getTimezoneOffset() / 60;        
        return this.increaseHours(date, -localTimeDifferenceFromUtc);
    }

    private increaseDays(date: Date, numberOfDays: number): Date {
        let increasedDate: Date = new Date(date);
        while(numberOfDays>0) {
            increasedDate = new Date(date.setUTCDate(date.getUTCDate() + 1));
            if(!this.isDateWeekend(increasedDate)) numberOfDays--;
        }
        return increasedDate;
    }

    private increaseHours(date: Date, numberOfHours: number): Date {
        let increasedDate: Date = new Date(date.setUTCHours(date.getUTCHours() + numberOfHours));
        while (this.isDateWeekend(increasedDate)) {
            increasedDate = new Date(increasedDate.setUTCDate(increasedDate.getUTCDate() + 1));
        }
        return increasedDate
    }

    private validateStartDate(startDate: Date): void {
        if (this.isDateWeekend(startDate)) throw new Error('Start date must be weekday!');
        if (this.isOutOfWorkingHours(startDate)) throw new Error('Start date must be bwtween 9am and 17pm!');
        if (!Date.parse(startDate.toString())) throw new Error('Invalid date format!');
    }

    private validateTurnaroundTime(turnaroundTime: number): void {
        if (turnaroundTime < 1) throw new Error('Invalid turnaround time!')
    }

    private isDateWeekend(date: Date): boolean {
        const dayAsNumber: number = date.getUTCDay();        
        return (dayAsNumber == 0 || dayAsNumber == 6)
    }

    private isOutOfWorkingHours(date: Date): boolean {
        const actualDateHour: number = date.getUTCHours();        
        return actualDateHour < DueDateCalculator._firstWorkingHour || actualDateHour >= DueDateCalculator._lastWorkingHour;
    }

    public getResultTimeString(finishDateString: string): string {
        return finishDateString.slice(5, 25);
    }


}