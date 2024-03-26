import { TextField, Grid, Button } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { EntryWithoutId } from "../../types";

interface Props {
    onCancel: () => void;
    onSubmit: (values: EntryWithoutId) => void;
  }

export const AddEntryForm = ({onCancel, onSubmit}: Props) => {
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [rating, setRating] = useState("");

  const style = {
    padding: 20,
    paddingBottom: 50,
    border: "solid",
    boderColor: "grey"
  }

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault
    onSubmit({
        specialist,
        description,
        date,
        healthCheckRating: Number(rating),
        type: "HealthCheck"
        // hardcoded entry type to be healthCheck for now. Add switch cases later to handle all entry types
    })
  }

  return (
    <div style={{paddingBottom: 40}}>
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
        <TextField
          label="Healthcheck rating"
          fullWidth
          value={rating}
          onChange={({ target }) => setRating(target.value)}
        />

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
