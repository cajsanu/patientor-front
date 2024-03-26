import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient, Entry, EntryWithoutId } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Entries } from "./Entries";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { AddEntryForm } from "./AddEntryForm";
import axios from "axios";
import Alert from '@mui/material/Alert';


const PatientInfo = ({ patient }: { patient: Patient }) => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };

  const openEntryForm = () => {
    setOpen(true)
  }

  const closeEntryForm = () => {
    setOpen(false)
  }

  const createEntry = async (values: EntryWithoutId) => {
    console.log(values)
    try {
      await patientService.createEntry(patient.id, values)
      // closeEntryForm()
      setSuccess("Successfully added new entry")
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  }

  return (
    <>
      <p>Social security number: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="error">{error}</Alert>}
      {open ? <AddEntryForm onCancel={closeEntryForm} onSubmit={createEntry}/> : null}
      {patient.entries.map((e: Entry) => (
        <Entries key={e.id} entry={e} />
      ))}
      <Button variant="contained" onClick={handleHomeClick}>
        Home
      </Button>
      <Button variant="contained" onClick={openEntryForm}>
        Add entry
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
