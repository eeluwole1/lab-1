import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { EmployeeList } from "./EmployeeList";
import { useEmployees } from "../../hooks/useEmployees";
export function EmployeesPage() {
  const {
    filteredEmployees,
    filterOptions,
    setSearchTerm,
    setDepartment,
    updateEmployeeDepartment, 
  } = useEmployees([], null);

  return (
    <div className="p-16">
      <div className="flex justify-between gap-6">
        <Input
          className="w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or department"
        />
        <Select className="w-40" onChange={(e) => setDepartment(e.target.value)}>
          {filterOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </Select>
      </div>

      <span>{filteredEmployees.length} results</span>

      <EmployeeList
        employees={filteredEmployees}           
        onMoveEmployee={updateEmployeeDepartment} 
      />
    </div>
  );
}
