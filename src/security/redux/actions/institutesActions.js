import axios from "axios";
export async function getInstitutesAll() {
  let result = await axios.get(
    `${import.meta.env.VITE_REST_API_SECURITY_EDUCATION}/institutos`
  );
  console.log("<<AXIOS-INSTITUTOS>>: ", result.data);
  return result.data;
}
