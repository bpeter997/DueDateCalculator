import { expect, should } from 'chai';
import DueDateCalculator from '../src/DueDateCalculator';
import TimeMethods from './../src/TimeMethods';



let dueDateCalculator: DueDateCalculator = new DueDateCalculator();

describe('DueDate', () => {
    it('invalid date format', () => {
        expect(() => {dueDateCalculator.calculateDueDate(new Date('dfsf'), 2)}).to.throw(Error);
    });

    it('weekend date should fail', () => {
        expect(() => {dueDateCalculator.calculateDueDate(new Date('2021.07.03'), 2)}).to.throw(Error);
    });

    it('start date should be between 9am and 17pm', () => {
        expect(() => {dueDateCalculator.calculateDueDate(new Date('2021.07.02,17:11'), 2)}).to.throw(Error);
    });

    it('should be equals (increase 2 hours in a day)', () => {
        expect(JSON.stringify(dueDateCalculator.calculateDueDate(new Date('2021.07.02,14:11'), 2))).equals(JSON.stringify(TimeMethods.createTimeFromUtcString(TimeMethods.convertDateToLocalTime(new Date('2021.07.02,16:11')))));
    });

    it('should not be equals (increase 2 hours in a day)', () => {
        
        expect(JSON.stringify(dueDateCalculator.calculateDueDate(new Date('2021.07.02,14:11'), 2)).toLocaleLowerCase).not.equals(JSON.stringify(TimeMethods.createTimeFromUtcString(TimeMethods.convertDateToLocalTime(new Date('2021.07.02,15:11')))));
    });

    it('should be equals (increase 8 hours, turn a day)', () => {
        expect(JSON.stringify(dueDateCalculator.calculateDueDate(new Date('2021.07.01,14:11'), 8))).equals(JSON.stringify(TimeMethods.createTimeFromUtcString(TimeMethods.convertDateToLocalTime(new Date('2021.07.02,14:11')))));
    });

    it('should not be equals (increase 8 hours, turn a day, on friday)', () => {
        
        expect(JSON.stringify(dueDateCalculator.calculateDueDate(new Date('2021.07.02,14:11'), 8)).toLocaleLowerCase).not.equals(JSON.stringify(TimeMethods.createTimeFromUtcString(TimeMethods.convertDateToLocalTime(new Date('2021.07.03,14:11')))));
    });

    it('should be equals (increase 8 hours, turn a day, on friday)', () => {
        expect(JSON.stringify(dueDateCalculator.calculateDueDate(new Date('2021.07.02,14:11'), 8))).equals(JSON.stringify(TimeMethods.createTimeFromUtcString(TimeMethods.convertDateToLocalTime(new Date('2021.07.05,14:11')))));
    });

    it('should be equals (increase 22 hours, turn a day, on thursday)', () => {
        expect(JSON.stringify(dueDateCalculator.calculateDueDate(new Date('2021.07.01,14:11'), 22))).equals(JSON.stringify(TimeMethods.createTimeFromUtcString(TimeMethods.convertDateToLocalTime(new Date('2021.07.06,12:11')))));
    });
})