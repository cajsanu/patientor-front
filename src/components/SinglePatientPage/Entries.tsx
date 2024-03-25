import { Entry } from "../../types";

interface EntryProp {
  entry: Entry;
}

export const Entries = (props: EntryProp) => {
  return (
    <div>
      {props.entry.date} {props.entry.description}
      <ul>
        {props.entry.diagnosisCodes ? (
          props.entry.diagnosisCodes.map((dc) => <li key={dc}>{dc}</li>)
        ) : (
          null
        )}
      </ul>
    </div>
  );
};
