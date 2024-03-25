import { Diagnosis } from "../../types";
import diagnoseService from "../../services/diagnoses";
import { useEffect, useState } from "react";

export const DiagnoseInfo = ({ diagnoseCode }: { diagnoseCode: string }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };
    fetchDiagnoses();
  }, []);

  const diagnose = diagnoses.find((d) => d.code === diagnoseCode);

  return (
    <ul>
      <li>
        {diagnoseCode} {diagnose?.name}
      </li>
    </ul>
  );
};