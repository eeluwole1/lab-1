import organizationJson from "../../data/organization.json";
import { useState } from "react";
interface LeadershipRole {
  role: string;
  description: (string | null)[];
}

export function Organization() {
  const leadershipRoles = new Array<LeadershipRole>();

  const populateLeadershipRoles = () => {
    for (const role of Object.keys((organizationJson as any).role)) {
      const leadershipRole: LeadershipRole = {
        role,
        description: [],
      };

      for (const person of (organizationJson as any).role[role]) {
        leadershipRole.description.push(person);
      }

      leadershipRoles.push(leadershipRole);
    }
  };

  populateLeadershipRoles();

  return (
    <main>
      <h2>Organization Leadership</h2>

      <div id="organization-list">
        {leadershipRoles.map((x, i) => (
          <div key={i}>
            <h3>{x.role}</h3>
            <ul>
              <li className="leadership">
                {x.description.map((y, j) => (
                  <div key={j}>{y ?? "Vacant"}</div>
                ))}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}


