import employeesJson from "../../data/employees.json";
import { useEffect, useState } from "react";
import type { EmployeeDepartment } from "../../types/Roles";


export function EmployeeList() {
  const departmentsEmployees = new Array<EmployeeDepartment>();

  const populateDepartmentEmployees = () => {
    for (const department of Object.keys(employeesJson.departments)) {
      const departmentEmployee: EmployeeDepartment = {
        department,
        employees: [],
      };
      for (const employee of (employeesJson.departments as any)[department]) {
        departmentEmployee.employees.push(employee);
      }
      departmentsEmployees.push(departmentEmployee);
    }
  };
  populateDepartmentEmployees();

  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const [filterValue, setFilterValue] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const setupFilters = () => {
    setFilterOptions(["All", ...departmentsEmployees.map((d) => d.department)]);
  };

  const onFilterChange = (filterValue: string) => {
    const data = [...departmentsEmployees]
    setFilterValue(filterValue);
  };

  const onSearchUpdate = (filterValue: string) => {
    const data = [...departmentsEmployees];
    const st = searchTerm.toLowerCase();
    setSearchTerm(filterValue);
  };

  useEffect(() => {
    setupFilters();

    }, []);

  const sLower = searchTerm.toLowerCase();
  const Roles =
    filterValue === "All"
      ? departmentsEmployees
      : departmentsEmployees.filter((deptRole) => deptRole.department === filterValue);

  const bySearch = Roles
    .map((row) => ({
      department: row.department,
      employees: row.employees.filter((employeeNames) => employeeNames.toLowerCase().includes(sLower)),
    }))
    .filter(
      (row) =>
        row.department.toLowerCase().includes(sLower) || row.employees.length > 0
    );
  const roleResult = bySearch.reduce((allRow, deptRow) => allRow + deptRow.employees.length, 0);

  return (
    <main>
      <h2>Employee Directory</h2>

      <div style={{ display: "flex", gap: 12, margin: "6px 0 10px" }}>
        <input
          value={searchTerm}
          placeholder="Search by name or department"
          onChange={(employeeName) => onSearchUpdate(employeeName.target.value)}
          style={{ flex: 1 }}
        />
        <select onChange={(employeeName) => onFilterChange(employeeName.target.value)}>
          {filterOptions.map((deptRow) => (
            <option key={deptRow}>{deptRow}</option>
          ))}
        </select>
      </div>

      <div id="employee-list">
        {bySearch.map((deptRow, dept) => (
          <div key={dept}>
            <h2>{deptRow.department}</h2>
            <ul>
              <li className="employee">
                {deptRow.employees.map((employeeName, employeeIndex) => (
                  <div key={employeeIndex}>{employeeName}</div>
                ))}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
