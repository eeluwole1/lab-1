import employeesJson from "../../data/employees.json";
import { useEffect, useState } from "react";

interface EmployeeDepartment {
  department: string;
  employees: string[];
}

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

  return (
    <main>
      <h2>Employee Directory</h2>

      <div style={{ display: "flex", gap: 12, margin: "6px 0 10px" }}>
        <input
          placeholder="Search"
          onChange={(e) => onSearchUpdate(e.target.value)}
          style={{ flex: 1 }}
        />
        <select onChange={(e) => onFilterChange(e.target.value)}>
          {filterOptions.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </div>

      <div id="employee-list">
        {departmentsEmployees.map((x, i) => (
          <div key={i}>
            <h2>{x.department}</h2>
            <ul>
              <li className="employee">
                {x.employees.map((y, i) => (
                  <div key={i}>{y}</div>
                ))}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
