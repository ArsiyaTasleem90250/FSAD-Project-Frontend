import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { DEPARTMENTS } from "../constants/departments";

const RegistrationsContext = createContext(null);

const STORAGE_KEY = "sms_registered_users";

const SEED_REGISTRATIONS = [
  { email: "student1@uni.edu", role: "Student", department: DEPARTMENTS[3] },  // CSE
  { email: "student2@uni.edu", role: "Student", department: DEPARTMENTS[3] },  // CSE
  { email: "student3@uni.edu", role: "Student", department: DEPARTMENTS[5] },  // EEE
  { email: "student4@uni.edu", role: "Student", department: DEPARTMENTS[9] },  // Mechanical Engineering
  { email: "student5@uni.edu", role: "Student", department: DEPARTMENTS[13] }, // Business Administration
  { email: "admin1@uni.edu", role: "Admin", department: DEPARTMENTS[3] },     // CSE
  { email: "admin2@uni.edu", role: "Admin", department: DEPARTMENTS[5] },      // EEE
  { email: "admin3@uni.edu", role: "Admin", department: DEPARTMENTS[9] },      // Mechanical Engineering
];

export function RegistrationsProvider({ children }) {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRegistrations(parsed);
          return;
        }
      }
      setRegistrations(SEED_REGISTRATIONS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_REGISTRATIONS));
    } catch (_) {
      setRegistrations(SEED_REGISTRATIONS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_REGISTRATIONS));
    }
  }, []);

  const registerUser = useCallback(
    (email, role, department = "") => {
      const trimmedEmail = (email || "").trim().toLowerCase();
      if (!trimmedEmail) return;
      setRegistrations((prev) => {
        const exists = prev.some((r) => r.email.toLowerCase() === trimmedEmail);
        if (exists) return prev;
        const next = [...prev, { email: trimmedEmail, role, department: (department || "").trim() }];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  return (
    <RegistrationsContext.Provider value={{ registrations, registerUser }}>
      {children}
    </RegistrationsContext.Provider>
  );
}

export function useRegistrations() {
  const ctx = useContext(RegistrationsContext);
  if (!ctx) throw new Error("useRegistrations must be used within RegistrationsProvider");
  return ctx;
}
