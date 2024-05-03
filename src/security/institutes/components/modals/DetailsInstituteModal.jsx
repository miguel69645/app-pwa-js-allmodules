// En InstituteDetailsModal.jsx
import React, { useEffect, useState } from "react";
import { getOneInstitute } from "../../services/remote/get/getOneInstitute";

const DetailsInstituteModal = ({ instituteId, onClose }) => {
  const [instituteDetails, setInstituteDetails] = useState(null);

  useEffect(() => {
    async function fetchInstituteDetails() {
      try {
        const details = await getOneInstitute(instituteId);
        setInstituteDetails(details);
      } catch (error) {
        console.error(
          `Error al obtener los detalles del instituto con ID ${instituteId}:`,
          error
        );
      }
    }
    fetchInstituteDetails();
  }, [instituteId]);

  return (
    <div>
      {instituteDetails && (
        <div>
          <h2>{instituteDetails.DesInstituto}</h2>
          <p>Alias: {instituteDetails.Alias}</p>
          <p>Matriz: {instituteDetails.Matriz ? "Sí" : "No"}</p>
          <p>IdTipoGiroOK: {instituteDetails.IdTipoGiroOK}</p>
          <p>IdInstitutoSupOK: {instituteDetails.IdInstitutoSupOK}</p>
        </div>
      )}
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default DetailsInstituteModal;
