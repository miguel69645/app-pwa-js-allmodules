import axios from "axios";

export function getOneInstitute(instituteId) {
  // console.log("hola: "+instituteId);
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_CAT_INSTITUTES_URL}/${instituteId}`)
      .then((response) => {
        const data = response.data;

        if (response.status === 200 || response.status === 201) {
          if (!data) {
            console.info(`🛈 No se encontró el instituto con ID ${instituteId}`);
            resolve(null);
          } else {
            console.log(`Instituto con ID ${instituteId}:`, data);
            resolve(data); // Resuelve la promesa con los datos del instituto
          }
        } else {
          console.error(
            `No se pudo realizar correctamente la petición <<getOneInstitute - Services>> para el instituto con ID ${instituteId}`,
            data
          );
          reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error(
          `Error en <<getOneInstitute - Services>> para el instituto con ID ${instituteId}`,
          error
        );
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}
