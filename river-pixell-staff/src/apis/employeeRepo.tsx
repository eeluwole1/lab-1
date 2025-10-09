import employeesJson from "../data/employees.json";
import type { Employee } from "../types/Employee";

export const employeeData: Employee[] = Object.entries(
  employeesJson.departments as Record<string, string[]>
).flatMap(([department, names]) =>
  names.map((name, idx) => ({
    id: `${department}-${idx}-${name}`,
    name,
    department,
  }))
);

export function getEmployees() {
  return employeeData;
}

export function getEmployeeById(employeeId: string): Employee {
  const found = employeeData.find((e) => e.id === employeeId);
  if (!found) throw new Error(`Failed to fetch employee with ${employeeId}`);
  return found;
}

export async function createEmployee(employee: Employee) {
  employeeData.push(employee);
  return employee;
}

export async function updateEmployee(employee: Employee) {
  const idx = employeeData.findIndex((e) => e.id === employee.id);
  if (idx === -1) {
    throw new Error(`Failed to update employee with ${employee.id}`);
  }
  employeeData[idx] = employee;
  return employeeData[idx];
}

export async function updateEmployeeDepartment(employeeId: string, department: string) {
  const found = employeeData.find((e) => e.id === employeeId);
  if (!found) throw new Error(`Failed to fetch employee with ${employeeId}`);
  found.department = department;
  return found;
}
