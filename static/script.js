window.addEventListener("load", async () => {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.innerHTML = `&copy; Pixell River Financial ${new Date().getFullYear()}`;

  // Mount node for directory
  const mount = document.getElementById("employee-directory");
  if (!mount) return;

  try {
    const res = await fetch("./employees.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    /** @type {{department:string; employees:string[]}[]} */
    const data = await res.json();

    // Clear "Loading…" message
    mount.innerHTML = "";

    // Build one <section> per department
    data.forEach(dept => {
      const section = document.createElement("section");

      const h4 = document.createElement("h4");
      h4.textContent = dept.department;

      const ul = document.createElement("ul");
      (dept.employees || []).forEach(name => {
        const li = document.createElement("li");
        li.textContent = name;
        ul.appendChild(li);
      });

      section.appendChild(h4);
      section.appendChild(ul);
      mount.appendChild(section);
    });
  } catch (err) {
    console.error("Failed to load employees.json", err);
    mount.innerHTML = `<p style="color:#d90429;">Error loading employees.</p>`;
  }
});
