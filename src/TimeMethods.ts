import DateFormat from './DateFormat'

export default class TimeMethods {

    private static _firstWorkingHour: number = 9;
    private static _lastWorkingHour: number = 17;

    public static isDateWeekend(date: Date): boolean {
        const dayAsNumber: number = date.getUTCDay();        
        return (dayAsNumber == 0 || dayAsNumber == 6)
    }

    public static isOutOfWorkingHours(date: Date): boolean {
        const actualDateHour: number = date.getUTCHours();        
        return actualDateHour < TimeMethods._firstWorkingHour || actualDateHour >= TimeMethods._lastWorkingHour;
    }

    public static createTimeFromUtcString(utcDate: Date) {
        let utcString = utcDate.toUTCString()
        let dateElementsAsArray: Array<string> = utcString.split(' ');
    
        let resultDate: DateFormat = {
            year: +dateElementsAsArray[3],
            month: dateElementsAsArray[2],
            day: +dateElementsAsArray[1],
            hour: +dateElementsAsArray[4].split(':')[0],
            minute: +dateElementsAsArray[4].split(':')[1]
        }
        return resultDate;
    }
    
    public static convertDateToLocalTime(date: Date) {
        const localTimeDifferenceFromUtc: number = date.getTimezoneOffset() / 60;
        return new Date(date.setUTCHours(date.getUTCHours() - localTimeDifferenceFromUtc));
    }
}
