import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SelectTables() {
  const [tables, setTables] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);
  const [failureMsg, setFailureMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/getTables")
      .then((res) => {
        const str = res.data.Success;
        const data = str.split(",").filter((t) => t.trim() !== "");
        setTables(data);
      })
      .catch((err) => {
        setFailureMsg("Could not fetch data");
        console.error("Error fetching tables:", err);
      });
  }, []);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTables((prev) =>
      checked ? [...prev, value] : prev.filter((table) => table !== value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/submit-tables", { tables: selectedTables })
      .then((res) => {
        navigate("/allcolumns");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>
          {failureMsg ? <span>{failureMsg}</span> : "Select Tables"}
        </h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.checkboxGrid}>
            {tables.map((table, idx) => (
              <label key={idx} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  value={table}
                  onChange={handleCheckboxChange}
                  style={styles.checkbox}
                />
                <span>{table}</span>
              </label>
            ))}
          </div>
          <button
            type="submit"
            disabled={selectedTables.length === 0}
            style={{
              ...styles.button,
              opacity: selectedTables.length === 0 ? 0.6 : 1,
              cursor: selectedTables.length === 0 ? "not-allowed" : "pointer"
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f0f2f5",
    padding: "20px"
  },
  card: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px"
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "24px",
    color: "#333"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  checkboxGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px"
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "16px",
    color: "#555",
    background: "#f9f9f9",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    transition: "all 0.2s ease",
  },
  checkbox: {
    transform: "scale(1.2)",
  },
  button: {
    backgroundColor: "#4A90E2",
    color: "white",
    padding: "12px",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    transition: "background 0.3s",
  }
};

export default SelectTables;
