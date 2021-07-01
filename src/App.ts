import DateFormat from "./DateFormat";
import DueDateCalculator from "./DueDateCalculator";

const dueDateCalculator: DueDateCalculator = new DueDateCalculator();

try {        
    const finishDate: DateFormat = dueDateCalculator.calculateDueDate(new Date('2021.07.01,16:11'), 14);
    console.log(finishDate);
} catch( e: any){
    console.log(e.message);
}
