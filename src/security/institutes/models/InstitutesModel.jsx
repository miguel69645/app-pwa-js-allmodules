import { getDetailRow } from "../helpers/Utils";

export function InstituteModel() {
  let Institute = {
    IdInstitutoOK: { type: String },
    IdInstitutoBK: { type: String },
    IdInstitutoSupOK: { type: String },
    DesInstituto: { type: String },
    Alias: { type: String },
    Matriz: { type: String },
    IdTipoGiroOK: { type: String },
    cat_negocios: [],
    detail_row: getDetailRow(),
  };
  return Institute;
}
