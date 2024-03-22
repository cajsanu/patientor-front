import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  console.log(patients);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />

        <PatientListPage patients={patients} setPatients={setPatients} />
      </Container>
    </div>
  );
};

export default App;
