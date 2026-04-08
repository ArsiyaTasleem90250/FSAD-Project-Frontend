/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { getRegistrations, addRegistration } from "../api/api";

const RegistrationsContext = createContext(null);

export function RegistrationsProvider({ children }) {
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getRegistrations();
      setRegistrations(data);
    } catch (err) {
      setError(err.message || "Failed to load registrations");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const registerUser = useCallback(
    async (email, role, department = "") => {
      const trimmedEmail = (email || "").trim().toLowerCase();
      if (!trimmedEmail) return;
      try {
        // Use email hash as studentId; courseId left empty here.
        const studentId = Math.abs(trimmedEmail.split("").reduce((a, c) => a + c.charCodeAt(0), 0));
        const created = await addRegistration({
          studentId,
          courseId: 0,
          email: trimmedEmail,
          role,
          department: (department || "").trim(),
        });
        setRegistrations((prev) => [...prev, created]);
      } catch (err) {
        setError(err.message || "Failed to save registration");
      }
    },
    []
  );

  const updateRegistration = useCallback((email, updates = {}) => {
    const trimmedEmail = (email || "").trim().toLowerCase();
    if (!trimmedEmail) return;
    setRegistrations((prev) =>
      prev.map((item) =>
        item.email && item.email.toLowerCase() === trimmedEmail ? { ...item, ...updates } : item
      )
    );
  }, []);

  return (
    <RegistrationsContext.Provider value={{ registrations, registerUser, updateRegistration, error, isLoading }}>
      {children}
    </RegistrationsContext.Provider>
  );
}

export function useRegistrations() {
  const ctx = useContext(RegistrationsContext);
  if (!ctx) throw new Error("useRegistrations must be used within RegistrationsProvider");
  return ctx;
}
