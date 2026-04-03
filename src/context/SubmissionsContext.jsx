import { createContext, useContext, useState, useCallback } from "react";

const SubmissionsContext = createContext(null);

const STORAGE_KEY = "sms_submissions_v3";

export function SubmissionsProvider({ children }) {
  const [submissions, setSubmissions] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed;
      }
    } catch {
      // Silently fail if localStorage is not available or parsing fails
    }
    return [];
  });

  const addSubmission = useCallback(({ course, idNumber, name, fileName, studentEmail, fileData, department = "" }) => {
    const id = String(Date.now());
    const newOne = {
      id,
      course,
      idNumber,
      name,
      fileName: fileName || "file",
      fileData: fileData || null,
      marks: "",
      gradedBy: "",
      studentEmail: studentEmail || "",
      department: department || "",
      submittedAt: Date.now(),
      markedAt: null,
    };
    setSubmissions((prev) => {
      const next = [...prev, newOne];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Silently fail if localStorage is not available
      }
      return next;
    });
    return id;
  }, []);

  const updateMarks = useCallback((id, marks, gradedBy = "") => {
    setSubmissions((prev) => {
      const next = prev.map((s) =>
        s.id === id
          ? { 
              ...s, 
              marks, 
              gradedBy: marks && String(marks).trim() ? gradedBy : "",
              markedAt: marks && String(marks).trim() ? Date.now() : null,
            }
          : s
      );
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Silently fail if localStorage is not available
      }
      return next;
    });
  }, []);

  const deleteSubmission = useCallback((id) => {
    setSubmissions((prev) => {
      const next = prev.filter((s) => s.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Silently fail if localStorage is not available
      }
      return next;
    });
  }, []);

  return (
    <SubmissionsContext.Provider value={{ submissions, addSubmission, updateMarks, deleteSubmission }}>
      {children}
    </SubmissionsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSubmissions() {
  const ctx = useContext(SubmissionsContext);
  if (!ctx) throw new Error("useSubmissions must be used within SubmissionsProvider");
  return ctx;
}
