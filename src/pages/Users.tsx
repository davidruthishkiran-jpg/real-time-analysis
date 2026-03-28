import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  role: string;
  status: "Active" | "Inactive";
}

function Users() {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const users: User[] = [
    { id: 1, name: "David", role: "Admin", status: "Active" },
    { id: 2, name: "Vamsi", role: "Manager", status: "Active" },
    { id: 3, name: "Dhanesh", role: "Analyst", status: "Active" }
  ];

  const filteredUsers = useMemo<User[]>(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div>
      <h1>👥 User Management</h1>

      <div className="users-top">
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />

        <div className="user-count">
          Total Users: {filteredUsers.length}
        </div>
      </div>

      <div className="users-grid">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="user-card"
            onClick={() => navigate(`/users/${user.id}`)}
            style={{ cursor: "pointer" }}
          >
            <h3>{user.name}</h3>
            <p className="role">{user.role}</p>
            <p
              className={
                user.status === "Active"
                  ? "status active"
                  : "status inactive"
              }
            >
              {user.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;