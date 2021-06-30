import { DueDateCalculator } from "./DueDateCalculator";

const dueDateCalculator: DueDateCalculator = new DueDateCalculator();

try {    
    const finishDate: Date = dueDateCalculator.calculateDueDate(new Date('2021.07.02,11:22'), 15);
    console.log(finishDate);
    
} catch( e: any){
    console.log(e.message);
}
