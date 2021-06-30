"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var DueDateCalculator_1 = __importDefault(require("../src/DueDateCalculator"));
var dueDateCalculator = new DueDateCalculator_1.default();
describe('DueDate', function () {
    it('invalid date format', function () {
        chai_1.expect(function () { dueDateCalculator.calculateDueDate(new Date('dfsf'), 2); }).to.throw(Error);
    });
    it('weekwnd date should fail', function () {
        chai_1.expect(function () { dueDateCalculator.calculateDueDate(new Date(2021, 7, 3, 15, 12), 2); }).to.throw(Error);
    });
});
