// src/components/employee-list/EmployeeDepartmentSection.tsx
import type { Employee } from "../../types/Employee";

interface EmployeeDepartmentSectionProps {
  department: string;                           // <- was EmployeeDepartment
  employees: Employee[];
  onMoveEmployee?: (id: string, toDept: string) => void;
}

export function EmployeeDepartmentSection({
  department,
  employees,
  onMoveEmployee,
}: EmployeeDepartmentSectionProps) {
  return (
    <section className="my-4">
      <h2 className="text-xl font-semibold">{department}</h2>
      <ul className="mt-2">
        {employees.map((e) => (
          <li key={e.id} className="flex items-center gap-3 py-1">
            <span className="flex-1">{e.name}</span>
            {onMoveEmployee && (
              <select
                defaultValue={department}
                onChange={(ev) => onMoveEmployee(e.id, ev.target.value)}
              >
                {/* Replace with your real list of departments */}
                <option>Administration</option>
                <option>Audit</option>
                <option>BankingOperations</option>
                <option>Communications</option>
                {/* ... */}
              </select>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
