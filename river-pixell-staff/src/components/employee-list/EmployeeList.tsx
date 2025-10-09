// src/components/employee-list/EmployeeList/EmployeeList.tsx
import type { Employee } from "../../types/Employee";
import { EmployeeDepartmentSection } from "../employee-list/EmployeeDepartmentSection";

interface Props {
  employees: Employee[];
  onMoveEmployee?: (id: string, toDept: string) => void;
}

export function EmployeeList({ employees, onMoveEmployee }: Props) {
  // group by department for sectioned rendering
  const byDept = employees.reduce<Record<string, Employee[]>>((acc, e) => {
    acc[e.department] ??= [];
    acc[e.department].push(e);
    return acc;
  }, {});

  return (
    <section>
      {Object.entries(byDept).map(([dept, emps]) => (
        <EmployeeDepartmentSection
          key={dept}
          department={dept}
          employees={emps}
          onMoveEmployee={onMoveEmployee}
        />
      ))}
    </section>
  );
}
