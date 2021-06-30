import { expect, should } from 'chai';
import DueDateCalculator from '../src/DueDateCalculator';


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

    it('should be increase in a day', () => {
        expect(dueDateCalculator.calculateDueDate(new Date('2021.07.02,14:11'), 2)).equals(dueDateCalculator.getResultTimeString(new Date('2021.07.02,16:11').toLocaleTimeString()));
    });
})