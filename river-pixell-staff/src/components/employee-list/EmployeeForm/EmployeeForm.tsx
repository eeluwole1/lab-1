import { useEffect, useState } from "react";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Select } from "../../ui/Select";
import { useEmployees } from "../../../hooks/useEmployees";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as EmployeeService from "../../../services/employeeService";
import type { Employee } from "../../../types/Employee";
import employeesJson from "../../../data/employees.json";

interface EmployeeFormProps {
  formMode: "edit" | "create";
  employeeId?: string;
}

const DEFAULT_EMPLOYEE: Employee = {
  id: "0",
  name: "", 
  department: "",
};

export function EmployeeForm({ formMode, employeeId }: EmployeeFormProps) {
  const { employees } = useEmployees([], null);
  const [employeeData, setEmployeeData] = useState<Employee>(DEFAULT_EMPLOYEE);
  const [errors, setErrors] = useState<Map<string, string>>(new Map());
  const departmentOptions = Object.keys(employeesJson.departments ?? {});
  let navigate = useNavigate();
  

  useEffect(() => {
    if (formMode === "edit" && employeeId) {
      const editedEmployee = employees.find((e) => e.id === employeeId);
      if (editedEmployee) {
        setEmployeeData(editedEmployee);
      }
    }
  }, [employees, formMode, employeeId]);

  const clearFieldError = (field: string) => {
    setErrors((prev) => {
      const next = new Map(prev);
      next.delete(field);
      return next;
    });
  };

  const clearAllErrors = () => setErrors(new Map());

  const handleFormChange = (field: keyof Employee, value: any) => {
    clearFieldError(field);
    setEmployeeData((prev) => ({ ...prev, [field]: value }));
  };

  const onReset = () => {
    setEmployeeData(DEFAULT_EMPLOYEE);
    clearAllErrors();
  };

  const onSubmit = async () => {
    const employeeErrors = await EmployeeService.validateEmployee(employeeData);
    setErrors(employeeErrors);

    if (employeeErrors.size == 0) {
      let toastMessage = `Successfully created new employee ${employeeData.name}!`;
      let employeeId = employeeData.id;

      if (formMode == "create") {
        const newEmployee = await EmployeeService.createNewEmployee(employeeData);

        if (newEmployee) {
            employeeId = newEmployee.id;
        }

      } else {
 
        toastMessage = "Successfully updated employee!";
        await EmployeeService.updateEmployee(employeeData);
      }

      toast(toastMessage, {
        position: "bottom-center",
        theme: "light",
        hideProgressBar: true,
        closeButton: false,
        autoClose: 2500,
      });

      navigate(`/employees`);
      onReset();
    }
  };

  return (
    <section className="my-4 py-4 flex flex-col">
      <span className="text-2xl">
        {formMode === "create" ? "Create" : "Edit"} Employee
      </span>

      <form id="form" className="flex flex-col py-4 gap-4">
        <div className="flex flex-col gap-2 flex-grow">
          <div className="flex flex-col">
            <span>Employee Name</span>
            <Input
              placeholder="Employee Name"
              name="employeeName"
              value={employeeData.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
            />
            {errors.has("name") && (
              <span className="text-red-500 font-semibold">
                {errors.get("name")}
              </span>
            )}
          </div>


          <div className="flex flex-col">
            <span>Department</span>
            <Select
              name="department"
              value={employeeData.department}
              onChange={(e) => handleFormChange("department", e.target.value)}
            >
              <option value="" disabled>
                Select a department
              </option>
              {departmentOptions.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </Select>
            {errors.has("department") && (
              <span className="text-red-500 font-semibold">
                {errors.get("department")}
              </span>
            )}
          </div>

          <div className="flex justify-start gap-4 mt-8">
            <Button
              type="button"
              onClick={onSubmit}
              variant="green"
              className="bg-emerald-600 text-stone-100 w-50"
            >
              {formMode === "create" ? "Create" : "Update"}
            </Button>
            <Button
              type="button"
              onClick={onReset}
              variant="red"
              className="bg-red-600 text-stone-100 w-50"
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
