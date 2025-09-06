const EMPLOYEE_DATA_URL = "./employees.json";

/**
 * Populate the Employee Directory
 * @param {HTMLElement} mountNode
 * @param {{department:string; employees:string[]}[]} departments
 */
const populateDirectory = (mountNode, departments) => {
  // clear any existing/placeholder content
  mountNode.innerHTML = "";

  // build one <section> per department
  departments.forEach(({ department, employees = [] }) => {
    const section = document.createElement("section");

    const h4 = document.createElement("h4");
    h4.textContent = department;

    const ul = document.createElement("ul");
    employees.forEach((name) => {
      const li = document.createElement("li");
      li.textContent = name;
      ul.appendChild(li);
    });

    section.appendChild(h4);
    section.appendChild(ul);
    mountNode.appendChild(section);
  });
};

/**
 * Fetch employees.json (no cache) and return parsed JSON
 */
const fetchEmployees = async () => {
  const res = await fetch(EMPLOYEE_DATA_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  /** @type {{department:string; employees:string[]}[]} */
  const data = await res.json();
  return data;
};

/**
 * Stamp current year in footer
 */
const setCopyright = (el) => {
  if (!el) return;
  el.innerHTML = `&copy; Pixell River Financial ${new Date().getFullYear()}`;
};

/**
 * Wait until the DOM is ready, then run everything
 */
document.addEventListener("DOMContentLoaded", async () => {
  const copyEl = document.getElementById("copyright") || document.getElementById("year");
  setCopyright(copyEl);

  // Mount node for directory
  const mount = document.getElementById("employee-directory");
  if (!mount) return;

  // Optional: show a loading message
  mount.innerHTML = "<p>Loading employee data…</p>";

  try {
    const departments = await fetchEmployees();
    populateDirectory(mount, departments);
  } catch (err) {
    console.error("Failed to load employees.json", err);
    mount.innerHTML = `<p class="error" style="color:#d90429;">Error loading employees.</p>`;
  }
});
