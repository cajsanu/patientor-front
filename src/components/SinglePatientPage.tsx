import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Patient } from "../types";
// import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

export const SinglePatientPage = ({}) => {
  const [patient, setPatient] = useState<Patient>();
  const params = useParams();

  useEffect(() => {
      const fetchPatient = async () => {
        if (params.id) {
        const patient = await patientService.getById(params.id);
        console.log(patient)
        setPatient(patient);}
      };
      fetchPatient()
  }, []);

  if (!patient) {
    return <div>No patient data</div>
  }

  return (
    <div>
        <h2>{patient.name} <MaleIcon /></h2>
        <p>Social security number: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
    </div>
  )
};
