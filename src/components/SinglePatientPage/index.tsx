import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient, Entry, EntryWithoutId, EntryType } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Entries } from "./Entries";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { AddEntryForm } from "./AddEntryForm";
import axios from "axios";
import Alert from "@mui/material/Alert";

const PatientInfo = ({ patient }: { patient: Patient }) => {
  return (
    <>
      <h2>
        {patient.name}
        {patient.gender === "male" ? <MaleIcon /> : null}
        {patient.gender === "female" ? <FemaleIcon /> : null}
      </h2>
      <p>Social security number: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>Entries</h3>
    </>
  );
};

export const SinglePatientPage = ({}) => {
  const [patient, setPatient] = useState<Patient>();
  const params = useParams();
  const [openEntryForm, setOpenEntryForm] = useState(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [entryType, setEntryType] = useState<EntryType>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      if (params.id) {
        const patient = await patientService.getById(params.id);
        setPatient(patient);
        console.log("render");
      }
    };
    fetchPatient();
  }, [success, error]);

  const closeEntryForm = () => {
    setOpenEntryForm(false);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  if (!patient) {
    return <div>No patient data</div>;
  }

  const createEntry = async (values: EntryWithoutId) => {
    console.log(values);
    try {
      await patientService.createEntry(patient.id, values);
      setSuccess("Successfully added new entry");
      setTimeout(() => {
        setSuccess("");
      }, 5000);
      closeEntryForm();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
          setTimeout(() => {
            setError("");
          }, 5000);
        } else {
          setError("Unrecognized axios error");
          setTimeout(() => {
            setError("");
          }, 5000);
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  };

  return (
    <div>
      <PatientInfo patient={patient} />
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      {openEntryForm && entryType? (
        <AddEntryForm
          onCancel={closeEntryForm}
          onSubmit={createEntry}
          entryType={entryType}
        />
      ) : null}
      {patient.entries.map((e: Entry) => (
        <Entries key={e.id} entry={e} />
      ))}
      <Button variant="contained" onClick={handleHomeClick}>
        Home
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setOpenEntryForm(true), setEntryType("HealthCheck");
        }}
      >
        Add health check entry
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setOpenEntryForm(true), setEntryType("OccupationalHealthcare");
        }}
      >
        Add occupational healthcare entry
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setOpenEntryForm(true), setEntryType("Hospital");
        }}
      >
        Add hospital entry
      </Button>
    </div>
  );
};
