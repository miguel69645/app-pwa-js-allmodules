import axios from "axios";

export function getAllInstitutes() {
  return new Promise((resolve, reject) => {
    axios
      .get(import.meta.env.VITE_GET_ALL_INSTITUTES_URL)
      .then((response) => {
        const data = response.data;

        if (response.status === 200) {
          if (data.length === 0) {
            console.info("🛈 No se encontraron documentos en <<cat_institutos>>");
            resolve([]);
          } else {
            console.log("Colección: <<cat_institutos>>", data);
            resolve(data); // Resuelve la promesa con el arreglo de institutos
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllInstitutes - Services>>",
            data
          );
          reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllInstitutes - Services>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}