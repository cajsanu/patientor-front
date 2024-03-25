import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient, Entry } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Entries } from "./Entries";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const PatientInfo = ({ patient }: { patient: Patient }) => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <>
      <p>Social security number: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      {patient.entries.map((e: Entry) => (
        <Entries key={e.id} entry={e} />
      ))}
      <Button variant="contained" onClick={handleHomeClick}>
        Home
      </Button>
    </>
  );
};

export const SinglePatientPage = ({}) => {
  const [patient, setPatient] = useState<Patient>();
  const params = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      if (params.id) {
        const patient = await patientService.getById(params.id);
        setPatient(patient);
      }
    };
    fetchPatient();
  }, []);

  if (!patient) {
    return <div>No patient data</div>;
  }

  if (patient.gender === "male") {
    return (
      <div>
        <h2>
          {patient.name} <MaleIcon />
        </h2>
        <PatientInfo patient={patient} />
      </div>
    );
  } else if (patient.gender === "female") {
    return (
      <div>
        <h2>
          {patient.name} <FemaleIcon />
        </h2>
        <PatientInfo patient={patient} />
      </div>
    );
  } else {
    return (
      <div>
        <h2>{patient.name}</h2>
        <PatientInfo patient={patient} />
      </div>
    );
  }
};
