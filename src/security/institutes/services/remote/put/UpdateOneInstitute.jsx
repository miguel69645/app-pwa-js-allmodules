import axios from "axios";

export function UpdateOneInstitute(instituteId, institute) {
  console.log("<<EJECUTA>> API <<UpdateOneInstitute>> Requiere:", institute);
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${import.meta.env.VITE_CAT_INSTITUTES_URL}/${instituteId}`,
        institute
      )
      .then((response) => {
        console.log("<<RESPONSE>> UpdateOneInstitute", institute);
        const data = response.data;
        console.log(response.status);

        if (response.status === 200 || response.status === 201) {
          resolve(data);
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<UpdateOneInstitute>> de forma correcta",
            data
          );
          reject(data);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<UpdateOneInstitute>>", error);
        reject(error);
      });
  });
}
