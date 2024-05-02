import axios from "axios";

export function GetAllLabels() {
  return new Promise((resolve, reject) => {
    axios
      .get(import.meta.env.VITE_CAT_ETIQUETAS_URL)
      .then((response) => {
        const data = response.data;

        if (response.status === 200) {
          if (data.length === 0) {
            console.info(
              "🛈 <<NO>> se encontraron documentos <<cat_etiquetas>>"
            );
            resolve([]);
          } else {
            const labels = data; // data es el array de etiquetas
            console.log("Coleccion: <<cat_labels>>", labels);
            resolve(JSON.parse(JSON.stringify(labels))); // Resuelve la promesa y hace una copia profunda
          }
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<GetAllLabels>> de forma correcta",
            data
          );
          reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<GetAllLabels>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}
