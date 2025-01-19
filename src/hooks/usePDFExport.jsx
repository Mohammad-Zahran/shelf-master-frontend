import jsPDF from "jspdf";
import "jspdf-autotable";

export const usePDFExport = (data, columns, title = "Data Export") => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(title, 14, 10);
    doc.autoTable({
      head: [columns],
      body: data.map((item) => columns.map((col) => item[col])),
    });
    doc.save(`${title}.pdf`);
  };

  return { exportToPDF };
};
