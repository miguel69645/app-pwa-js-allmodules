//NOTA: Este archivo contiene funciones ASYNCRONAS
//que nos ayuda a obtener la respuesta del servidor
//y poder mandarla al SLICE y a su estado
import { getInstitutesAll } from "./actions/institutesActions";
import { SET_DATA_INSTITUTES } from "./slices/institutesSlice";

export const GET_DATA_START = () => {
  return async (dispatch, getState) => {
    dispatch(
      SET_DATA_INSTITUTES(
        //{
        //institutesDataArr: await getInstitutesAll(),
        await getInstitutesAll()
        //}
      )
    );
  };
};
