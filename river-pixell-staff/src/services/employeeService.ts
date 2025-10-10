import * as employeeRepo from "../apis/employeeRepo";
import type { Employee } from "../types/Employee";

export async function fetchEmployees() {
    const Employee = await employeeRepo.getEmployees();
    return Employee;
}

export async function createNewEmployee(employee: Employee) {
  return await employeeRepo.createEmployee(employee);
}

export async function updateEmployee(employee: Employee) {
  return await employeeRepo.updateEmployee(employee);
}

export async function moveEmployee(employeeId: string, toDepartment: string) {
  const emp = await employeeRepo.getEmployeeById(employeeId);
  return employeeRepo.updateEmployee({ ...emp, department: toDepartment });
}

export async function validateEmployee(employee: Employee) {
  const errors = new Map<string, string>();
  if (!employee.name || employee.name.trim().length < 3) {
    errors.set("name", "Name must have at least 3 characters");
  }
  if (!employee.department) {
    errors.set("department", "Department must be selected");
  }
  return errors;
}
