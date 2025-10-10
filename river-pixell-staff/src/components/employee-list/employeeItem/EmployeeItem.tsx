import type { Employee } from "../../../types/Employee";

interface EmployeeItemProps { 
  employee: Employee;
  onMoveEmployee?: (id: string, toDept: string) => void;
}

export function EmployeeItem({employee, onMoveEmployee } :
EmployeeItemProps) {
  return (
    <div className="employeeRow">
      <span className="employeeName">{employee.name} — {employee.department}</span>
      {onMoveEmployee && (
        <select
          className="deptSelect"
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
