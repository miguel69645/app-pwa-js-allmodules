import axios from "axios";

export function deleteInstitute(instituteId) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${import.meta.env.VITE_CAT_INSTITUTES_URL}/${instituteId}`)
      .then((response) => {
        const data = response.data;

        if (response.status === 200 || response.status === 201) {
          console.log(`Instituto con ID ${instituteId} eliminado:`, data);
          resolve(data); // Resuelve la promesa con los datos de la respuesta
        } else {
          console.error(
            `No se pudo realizar correctamente la petición <<deleteInstitute - Services>> para el instituto con ID ${instituteId}`,
            data
          );
          reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error(
          `Error en <<deleteInstitute - Services>> para el instituto con ID ${instituteId}`,
          error
        );
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}
