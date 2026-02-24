export const reportData = [
  { studentId: "S001", name: "Alex Johnson", course: "Mathematics", submitted: "Yes", score: "85", date: "2025-02-20" },
  { studentId: "S002", name: "Sam Williams", course: "Mathematics", submitted: "Yes", score: "92", date: "2025-02-19" },
  { studentId: "S003", name: "Jordan Lee", course: "Mathematics", submitted: "No", score: "—", date: "—" },
  { studentId: "S004", name: "Casey Brown", course: "Science", submitted: "Yes", score: "78", date: "2025-02-21" },
  { studentId: "S005", name: "Riley Davis", course: "Science", submitted: "Yes", score: "88", date: "2025-02-20" },
  { studentId: "S006", name: "Morgan Taylor", course: "Science", submitted: "No", score: "—", date: "—" },
];

export function getSubmissionStats() {
  const total = reportData.length;
  const submitted = reportData.filter((r) => r.submitted === "Yes").length;
  const notSubmitted = total - submitted;
  return { total, submitted, notSubmitted };
}
