import {
  TextField,
  Grid,
  Button,
  Alert,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { Diagnosis, EntryType, EntryWithoutId } from "../../types";
import diagnoseService from "../../services/diagnoses";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  entryType: EntryType;
}

export const AddEntryForm = ({ onCancel, onSubmit, entryType }: Props) => {
  const [specialist, setSpecialist] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [employer, setEmployer] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [sickLeaveStart, setSickLeaveStart] = useState<string>("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [criteria, setCriteria] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [diagnosisOptions, setDiagnosisOptions] = useState<Diagnosis[]>();
  const [error, setError] = useState<string>();

  const style = {
    padding: 20,
    paddingBottom: 50,
    border: "solid",
    boderColor: "grey",
  };

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnosisOptions(diagnoses);
    };
    fetchDiagnoses();
  }, []);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (entryType === "HealthCheck") {
      onSubmit({
        specialist,
        description,
        date,
        diagnosisCodes,
        healthCheckRating: Number(rating),
        type: entryType,
      });
    } else if (entryType === "OccupationalHealthcare") {
      onSubmit({
        specialist,
        description,
        date,
        diagnosisCodes,
        sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd },
        employerName: employer,
        type: entryType,
      });
    } else if (entryType === "Hospital") {
      onSubmit({
        specialist,
        description,
        date,
        diagnosisCodes,
        discharge: { date: dischargeDate, criteria: criteria },
        type: entryType,
      });
    } else {
      setError("Fields cannot be left empty");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div style={{ paddingBottom: 40 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <form style={style} onSubmit={addEntry}>
        <h3>New entry</h3>
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Diagnosis codes</InputLabel>
        <Select
          fullWidth
          value={diagnosisCodes}
          multiple
          onChange={({ target: { value } }) =>
            setDiagnosisCodes(
              typeof value === "string" ? value.split(",") : value
            )
          }
        >
          {diagnosisOptions
            ? diagnosisOptions.map((option) => (
                <MenuItem key={option.name} value={option.code}>
                  {option.code} {option.name}
                </MenuItem>
              ))
            : null}
        </Select>
        {entryType === "HealthCheck" ? (
          <div>
            <InputLabel style={{ marginTop: 20 }}>Health rating</InputLabel>
            <Select
              fullWidth
              value={rating}
              onChange={({ target }) => setRating(target.value)}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </div>
        ) : null}
        {entryType === "OccupationalHealthcare" ? (
          <div>
            <TextField
              label="Employer"
              fullWidth
              value={employer}
              onChange={({ target }) => setEmployer(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Sick leave</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <TextField
              type="date"
              fullWidth
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </div>
        ) : null}
        {entryType === "Hospital" ? (
          <div>
            <InputLabel style={{ marginTop: 20 }}>Discharge</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Criteria"
              fullWidth
              value={criteria}
              onChange={({ target }) => setCriteria(target.value)}
            />
          </div>
        ) : null}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
