import raw from "../../assets/employee.json";

type Department = { department: string; employees: string[] };

// Display order that matches the case study
const ORDER = [
  "Administration",
  "Audit",
  "Banking Operations",
  "Communications",
  "Corporate Services",
  "Facilities",
  "Financial Services",
  "Human Resources",
  "Information Technology"
];

export default function EmployeeList() {
  const data = raw as Department[];

  // Sort by the ORDER above; unknown departments go to the end (alphabetically)
  const rank = new Map(ORDER.map((name, i) => [name, i]));
  const sorted = [...data].sort((a, b) => {
    const ai = rank.get(a.department) ?? 999;
    const bi = rank.get(b.department) ?? 999;
    if (ai !== bi) return ai - bi;
    return a.department.localeCompare(b.department);
  });

  return (
    <section id="employee-directory">
      {sorted.map((dept) => (
        <section key={dept.department} className="card">
          <h4>{dept.department}</h4>
          <ul>
            {dept.employees.map((name, i) => (
              <li key={i}>{name}</li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}
