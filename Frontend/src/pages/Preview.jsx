import { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";

function Preview() {
  const [csvData, setCsvData] = useState([]);
  const [csvFileUrl, setCsvFileUrl] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/get-generated-file")
      .then((res) => {
        const blob = new Blob([res.data], { type: "text/csv" });
        const fileUrl = URL.createObjectURL(blob);
        setCsvFileUrl(fileUrl);

        Papa.parse(res.data, {
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            setCsvData(results.data);
          }
        });
      })
      .catch((err) => {
        console.error("Error fetching file:", err);
      });
  }, []);

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>CSV Preview</h1>

      {csvData.length > 0 ? (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                {Object.keys(csvData[0]).map((col, idx) => (
                  <th key={idx} style={styles.th}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, rIdx) => (
                <tr key={rIdx}>
                  {Object.values(row).map((val, cIdx) => (
                    <td key={cIdx} style={styles.td}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={styles.loadingText}>Loading CSV data...</p>
      )}

      {csvFileUrl && (
        <a href={csvFileUrl} download="exported-data.csv" style={styles.downloadBtn}>
          ⬇ Download CSV
        </a>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "40px 20px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f5f7fa",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontSize: "28px",
    color: "#333",
    marginBottom: "30px",
  },
  tableWrapper: {
    overflowX: "auto",
    maxWidth: "90vw",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    minWidth: "600px",
  },
  th: {
    backgroundColor: "#007bff",
    color: "#fff",
    textAlign: "left",
    padding: "12px",
    fontWeight: "600",
    border: "1px solid #ddd",
  },
  td: {
    padding: "10px 12px",
    border: "1px solid #ddd",
    backgroundColor: "#fafafa",
  },
  loadingText: {
    fontSize: "18px",
    color: "#888",
    marginTop: "20px",
  },
  downloadBtn: {
    marginTop: "30px",
    padding: "12px 24px",
    backgroundColor: "#28a745",
    color: "white",
    textDecoration: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "500",
    boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
    transition: "background-color 0.3s",
  },
};

export default Preview;
