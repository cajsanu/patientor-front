import { TextField, Grid, Button, Alert } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { EntryType, EntryWithoutId } from "../../types";

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
  const [error, setError] = useState<string>();

  const style = {
    padding: 20,
    paddingBottom: 50,
    border: "solid",
    boderColor: "grey",
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (
      specialist &&
      description &&
      date &&
      rating &&
      entryType === "HealthCheck"
    ) {
      onSubmit({
        specialist,
        description,
        date,
        healthCheckRating: Number(rating),
        type: entryType,
      });
    } else if (
      specialist &&
      description &&
      date &&
      sickLeaveStart &&
      sickLeaveEnd &&
      employer &&
      entryType === "OccupationalHealthcare"
    ) {
      onSubmit({
        specialist,
        description,
        date,
        sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd },
        employerName: employer,
        type: entryType,
      });
    } else if (
      specialist &&
      description &&
      date &&
      dischargeDate &&
      criteria &&
      entryType === "Hospital"
    ) {
      onSubmit({
        specialist,
        description,
        date,
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
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        {entryType === "HealthCheck" ? (
          <TextField
            label="Healthcheck rating"
            placeholder="0-3"
            fullWidth
            value={rating}
            onChange={({ target }) => setRating(target.value)}
          />
        ) : null}
        {entryType === "OccupationalHealthcare" ? (
          <div>
            <TextField
              label="Employer"
              fullWidth
              value={employer}
              onChange={({ target }) => setEmployer(target.value)}
            />
            Sickleave
            <TextField
              label="StartDate"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <TextField
              label="EndDate"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </div>
        ) : null}
        {entryType === "Hospital" ? (
          <div>
            Discharge
            <TextField
              label="Date"
              placeholder="YYYY-MM-DD"
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

        {/* <InputLabel style={{ marginTop: 20 }}>Gender</InputLabel>
        <Select
          label="Gender"
          fullWidth
          value={gender}
          onChange={onGenderChange}
        >
        {genderOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select> */}

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
