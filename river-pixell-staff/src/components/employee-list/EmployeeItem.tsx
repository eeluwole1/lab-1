import type { Employee } from "../../types/Employee";

interface EmployeeItemProps { 
  employee: Employee;
  onMoveEmployee?: (id: string, toDept: string) => void;
}

export function EmployeeItem({employee, onMoveEmployee } :
EmployeeItemProps) {
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="flex-1">{employee.name} — {employee.department}</span>
      {onMoveEmployee && (
        <select
          defaultValue={employee.department}
          onChange={(ev) => onMoveEmployee(employee.id, ev.target.value)}
        >
          <option>Administration</option>
          <option>Audit</option>
          <option>BankingOperations</option>
          <option>Communications</option>
          <option >CorporateServices</option>
          <option >Facilities</option>
          <option >FinancialServices</option>
          <option >HumanResouces</option>
          <option >InformationTechnology</option>
          <option >ItTechnician</option>
        </select>
      )}
    </div>
  );
}
