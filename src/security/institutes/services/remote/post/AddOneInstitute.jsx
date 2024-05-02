import axios from "axios";

export function AddOneInstitute(institute) {
  console.log("<<EJECUTA>> API <<AddOneInstitute>> Requiere:", institute);
  return new Promise((resolve, reject) => {
    axios
      .post(import.meta.env.VITE_CAT_INSTITUTES_URL, institute)
      .then((response) => {
        console.log("<<RESPONSE>> AddOneInstitute", institute);
        const data = response.data;
        console.log(response.status);

        if (response.status === 200 || response.status === 201) {
          resolve(data);
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<AddOneInstitute>> de forma correcta",
            data
          );
          reject(data);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<AddOneInstitute>>", error);
        reject(error);
      });
  });
}
