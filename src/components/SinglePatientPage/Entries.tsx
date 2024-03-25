import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from "../../types";
import { DiagnoseInfo } from "./DiagnoseInfo";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import StarIcon from "@mui/icons-material/Star";
import { red, orange, yellow, green } from "@mui/material/colors";

const BaseInfo = ({ entry }: { entry: Entry }) => {
  return (
    <div>
      {entry.date} {entry.description}
      <ul>
        {entry.diagnosisCodes
          ? entry.diagnosisCodes.map((dc) => (
              <DiagnoseInfo key={dc} diagnoseCode={dc} />
            ))
          : null}
      </ul>
    </div>
  );
};

const HospitalEntries = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      <div>
        {" "}
        <LocalHospitalIcon />
      </div>
      <p>
        Discharge {entry.discharge.date} | Criteria: {entry.discharge.criteria}
      </p>
      <p>Diagnosed by: {entry.specialist}</p>
    </div>
  );
};

const OccupationalEntries = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div>
      <div>{entry.employerName}</div>
      <div>
        <WorkIcon />
      </div>
      <p>Doctor: {entry.specialist}</p>
    </div>
  );
};

const HealthCheckEntries = ({ entry }: { entry: HealthCheckEntry }) => {
  switch (entry.healthCheckRating) {
    case 0:
      return (
        <div>
          <StarIcon sx={{ color: green[500] }} />
          <p>Doctor: {entry.specialist}</p>
        </div>
      );
    case 1:
      return (
        <div>
          <StarIcon sx={{ color: yellow[500] }} />
          <p>Doctor: {entry.specialist}</p>
        </div>
      );
    case 2:
      return (
        <div>
          <StarIcon sx={{ color: orange[500] }} />
          <p>Doctor: {entry.specialist}</p>
        </div>
      );
    case 3:
      return (
        <div>
          <StarIcon sx={{ color: red[500] }} />
          <p>Doctor: {entry.specialist}</p>
        </div>
      );
    default:
      return "no healt rating yet";
  }
};

interface EntryProp {
  entry: Entry;
}

export const Entries = (props: EntryProp) => {
  const style = {
    border: "solid",
    borderColor: "black",
    padding: 10,
  };
  switch (props.entry.type) {
    case "Hospital":
      return (
        <div style={style}>
          <BaseInfo entry={props.entry} />
          <HospitalEntries entry={props.entry} />
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div style={style}>
          <BaseInfo entry={props.entry} />
          <OccupationalEntries entry={props.entry} />
        </div>
      );
    case "HealthCheck":
      return (
        <div style={style}>
          <BaseInfo entry={props.entry} />
          <HealthCheckEntries entry={props.entry} />
        </div>
      );
    default:
      return "No patient data";
  }
};
