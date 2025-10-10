import type { Employee } from "../../types/Employee";
import { EmployeeItem } from "./employeeItem/EmployeeItem";

interface EmployeeListProps {
  employees: Employee[];
  onMoveEmployee?: (id: string, toDept: string) => void;
}

export function EmployeeList({ employees, onMoveEmployee }: EmployeeListProps) {
  return (
    <section className="employee-list">
      {employees.map((e) => (
        <EmployeeItem
          key={e.id}
          employee={e}
          onMoveEmployee={onMoveEmployee}
        />
      ))}
    </section>
  );
}
