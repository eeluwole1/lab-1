export interface EmployeeDepartment {
    name?: string
    department: string;
    employees: string[];
}

export interface EmployeeDepartment {
  department: string;
  employees: string[];
}

export interface RoleEntry {
  role: string;
  occupants: (string | null)[];
}
