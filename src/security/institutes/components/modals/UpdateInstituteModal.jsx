import React, { useState, useEffect } from "react";
//FIC: Material
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  DialogActions,
  Box,
  Alert,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
//FIC: Formik - Yup
import { useFormik } from "formik";
import * as Yup from "yup";
//FIC: Helpers
import { InstituteValues } from "../../helpers/InstituteValues";
//FIC: Services
import { UpdateOneInstitute } from "../../../institutes/services/remote/put/UpdateOneInstitute";
import { GetAllLabels } from "../../../labels/services/remote/get/GetAllLabels";
import { getOneInstitute } from "../../../institutes/services/remote/get/getOneInstitute";
const UpdateInstituteModal = ({
  UpdateInstituteShowModal,
  setUpdateInstituteShowModal,
  instituteId,
  updateInstitutes, 
}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [InstitutesValuesLabel, setInstitutesValuesLabel] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (instituteId) {
      getInstituteData();
    }
    getDataSelectInstitutesType();
  }, [instituteId]);
  async function getDataSelectInstitutesType() {
    try {
      const Labels = await GetAllLabels();
      console.log("Labels:", Labels); // Registrar la respuesta completa
      const InstitutesTypes = Labels.find(
        (label) => label.IdEtiquetaOK === "IdTipoGiros"
      );
      console.log("InstitutesTypes:", InstitutesTypes); // Registrar el resultado de la búsqueda
      if (InstitutesTypes) {
        setInstitutesValuesLabel(InstitutesTypes.valores);
      } else {
        console.error(
          "No se encontraron etiquetas para Tipos Giros de Institutos"
        );
      }
    } catch (e) {
      console.error(
        "Error al obtener Etiquetas para Tipos Giros de Institutos:",
        e
      );
    }
  }
  async function getInstituteData() {
    console.log("getInstituteData is called");
    try {
      const instituteData = await getOneInstitute(instituteId);
      console.log("Institute Data:", instituteData);
      formik.setValues({
        IdInstitutoOK: instituteData.IdInstitutoOK,
        IdInstitutoBK: instituteData.IdInstitutoBK,
        DesInstituto: instituteData.DesInstituto,
        Alias: instituteData.Alias,
        Matriz: instituteData.Matriz === "S" ? true : false,
        IdTipoGiroOK: instituteData.IdTipoGiroOK,
        IdInstitutoSupOK: instituteData.IdInstitutoSupOK,
      });
    } catch (e) {
      console.error("Error al obtener los datos del instituto:", e);
    }
  }
  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
      IdInstitutoOK: "",
      IdInstitutoBK: "",
      DesInstituto: "",
      Alias: "",
      /* Matriz: "", */
      Matriz: false,
      IdTipoGiroOK: "",
      IdInstitutoSupOK: "",
    },
    validationSchema: Yup.object({
      IdInstitutoOK: Yup.string().required("Campo requerido"),
      IdInstitutoBK: Yup.string().required("Campo requerido"),
      DesInstituto: Yup.string().required("Campo requerido"),
      Alias: Yup.string().required("Campo requerido"),
      Matriz: Yup.boolean().required("Campo requerido"),
      IdTipoGiroOK: Yup.string()
        .required("Campo requerido")
        .matches(
          /^[a-zA-Z0-9-]+$/,
          'Solo se permiten caracteres alfanuméricos y el simbolo "-"'
        ),
      IdInstitutoSupOK: Yup.string(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      console.log(
        "FIC: entro al onSubmit despues de hacer click en boton Guardar"
      );
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        values.Matriz == true ? (values.Matriz = "S") : (values.Matriz = "N");
        const Institute = InstituteValues(values);
        console.log("<<Institute>>", Institute);
        await UpdateOneInstitute(instituteId, Institute);
        setMensajeExitoAlert(
          "Instituto fue actualizado y guardado Correctamente"
        );
        updateInstitutes(); 
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo actualizar el Instituto");
      }
      setLoading(false);
    },
  });
  const commonTextFieldProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    margin: "dense",
    disabled: !!mensajeExitoAlert,
  };
  return (
    <Dialog
      open={UpdateInstituteShowModal}
      onClose={() => setUpdateInstituteShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        {/* FIC: Aqui va el Titulo de la Modal */}
        <DialogTitle>
          <Typography component="h6">
            <strong>Actualizar Instituto</strong>
          </Typography>
        </DialogTitle>
        {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          {/* FIC: Campos de captura o selección */}
          <TextField
            id="IdInstitutoOK"
            label="IdInstitutoOK*"
            {...formik.getFieldProps("IdInstitutoOK")}
            error={
              formik.touched.IdInstitutoOK &&
              Boolean(formik.errors.IdInstitutoOK)
            }
            helperText={
              formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK
            }
          />
          <TextField
            id="IdInstitutoBK"
            label="IdInstitutoBK*"
            {...formik.getFieldProps("IdInstitutoBK")}
            error={
              formik.touched.IdInstitutoBK &&
              Boolean(formik.errors.IdInstitutoBK)
            }
            helperText={
              formik.touched.IdInstitutoBK && formik.errors.IdInstitutoBK
            }
          />
          <TextField
            id="DesInstituto"
            label="DesInstituto*"
            {...formik.getFieldProps("DesInstituto")}
            error={
              formik.touched.DesInstituto && Boolean(formik.errors.DesInstituto)
            }
            helperText={
              formik.touched.DesInstituto && formik.errors.DesInstituto
            }
          />
          <TextField
            id="Alias"
            label="Alias*"
            {...formik.getFieldProps("Alias")}
            error={formik.touched.Alias && Boolean(formik.errors.Alias)}
            helperText={formik.touched.Alias && formik.errors.Alias}
          />
          <FormControlLabel
            control={
              <Checkbox
                {...formik.getFieldProps("Matriz")}
                checked={formik.values.Matriz}
                name="Matriz"
                color="primary"
                disabled={!!mensajeExitoAlert}
              />
            }
            label="Matriz"
          />
          <Select
            {...formik.getFieldProps("IdTipoGiroOK")}
            label="Selecciona una opción"
            name="IdTipoGiroOK"
            disabled={!!mensajeExitoAlert}
          >
            {InstitutesValuesLabel.map((tipoGiro) => {
              return (
                <MenuItem
                  value={`IdTipoGiros-${tipoGiro.IdValorOK}`}
                  key={tipoGiro.Valor}
                >
                  {tipoGiro.Valor}
                </MenuItem>
              );
            })}
          </Select>
          <TextField
            id="IdInstitutoSupOK"
            label="IdInstitutoSupOK*"
            {...formik.getFieldProps("IdInstitutoSupOK")}
            error={
              formik.touched.IdInstitutoSupOK &&
              Boolean(formik.errors.IdInstitutoSupOK)
            }
            helperText={
              formik.touched.IdInstitutoSupOK && formik.errors.IdInstitutoSupOK
            }
          />
        </DialogContent>
        {/* FIC: Aqui van las acciones del usuario como son las alertas o botones */}
        <DialogActions sx={{ display: "flex", flexDirection: "row" }}>
          <Box m="auto">
            {console.log("mensajeExitoAlert", mensajeExitoAlert)}
            {console.log("mensajeErrorAlert", mensajeErrorAlert)}
            {mensajeErrorAlert && (
              <Alert severity="error">
                <b>¡ERROR!</b> ─ {mensajeErrorAlert}
              </Alert>
            )}
            {mensajeExitoAlert && (
              <Alert severity="success">
                <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
              </Alert>
            )}
          </Box>
          {/* FIC: Boton de Cerrar. */}
          <LoadingButton
            color="secondary"
            loadingPosition="start"
            startIcon={<CloseIcon />}
            variant="outlined"
            onClick={() => setUpdateInstituteShowModal(false)}
          >
            <span>CERRAR</span>
          </LoadingButton>
          {/* FIC: Boton de Guardar. */}
          <LoadingButton
            color="primary"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            type="submit"
            disabled={!!mensajeExitoAlert}
            loading={Loading}
          >
            <span>GUARDAR</span>
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default UpdateInstituteModal;
