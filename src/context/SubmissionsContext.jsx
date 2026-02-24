import { createContext, useContext, useState, useEffect, useCallback } from "react";

const SubmissionsContext = createContext(null);

const STORAGE_KEY = "sms_submissions_v3";

export function SubmissionsProvider({ children }) {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSubmissions(JSON.parse(stored));
      } else {
        setSubmissions([]);
      }
    } catch (_) {
      setSubmissions([]);
    }
  }, []);

  const addSubmission = useCallback(({ course, idNumber, name, fileName, studentEmail, fileData }) => {
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
      submittedAt: Date.now(),
    };
    setSubmissions((prev) => {
      const next = [...prev, newOne];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (_) {}
      return next;
    });
    return id;
  }, []);

  const updateMarks = useCallback((id, marks, gradedBy = "") => {
    setSubmissions((prev) => {
      const next = prev.map((s) =>
        s.id === id
          ? { ...s, marks, gradedBy: marks && String(marks).trim() ? gradedBy : "" }
          : s
      );
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (_) {}
      return next;
    });
  }, []);

  const deleteSubmission = useCallback((id) => {
    setSubmissions((prev) => {
      const next = prev.filter((s) => s.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (_) {}
      return next;
    });
  }, []);

  return (
    <SubmissionsContext.Provider value={{ submissions, addSubmission, updateMarks, deleteSubmission }}>
      {children}
    </SubmissionsContext.Provider>
  );
}

export function useSubmissions() {
  const ctx = useContext(SubmissionsContext);
  if (!ctx) throw new Error("useSubmissions must be used within SubmissionsProvider");
  return ctx;
}
