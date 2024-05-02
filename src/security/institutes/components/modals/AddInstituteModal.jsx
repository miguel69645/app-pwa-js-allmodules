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
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
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
import { AddOneInstitute } from "../../../institutes/services/remote/post/AddOneInstitute";
import { GetAllLabels } from "../../../labels/services/remote/get/GetAllLabels";
const AddInstituteModal = ({
  AddInstituteShowModal,
  setAddInstituteShowModal,
}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [InstitutesValuesLabel, setInstitutesValuesLabel] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    getDataSelectInstitutesType();
  }, []);

  //FIC: Ejecutamos la API que obtiene todas las etiquetas
  //y filtramos solo la etiqueta de Tipos Giros de Institutos
  //para que los ID y Nombres se agreguen como items en el
  //control <Select> del campo IdTipoGiroOK en la Modal.
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
      /*Matriz: Yup.string()
        .required("Campo requerido"),
        .max(1, 'Solo se permite una letra')
        .matches(/^[SN]$/, 'Solo se permite un caracter S/N'), */
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
      //FIC: mostramos el Loading.
      setLoading(true);

      //FIC: notificamos en consola que si se llamo y entro al evento.
      console.log(
        "FIC: entro al onSubmit despues de hacer click en boton Guardar"
      );
      //FIC: reiniciamos los estados de las alertas de exito y error.
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        //FIC: si fuera necesario meterle valores compuestos o no compuestos
        //a alguns propiedades de formik por la razon que sea, se muestren o no
        //estas propiedades en la ventana modal a travez de cualquier control.
        //La forma de hacerlo seria:
        //formik.values.IdInstitutoBK = `${formik.values.IdInstitutoOK}-${formik.values.IdCEDI}`;
        //formik.values.Matriz = autoChecksSelecteds.join(",");
        //FIC: mutar los valores (true o false) de Matriz.
        values.Matriz == true ? (values.Matriz = "S") : (values.Matriz = "N");
        //FIC: Extraer los datos de los campos de
        //la ventana modal que ya tiene Formik.
        const Institute = InstituteValues(values);
        //FIC: mandamos a consola los datos extraidos
        console.log("<<Institute>>", Institute);
        //FIC: llamar el metodo que desencadena toda la logica
        //para ejecutar la API "AddOneInstitute" y que previamente
        //construye todo el JSON de la coleccion de Institutos para
        //que pueda enviarse en el "body" de la API y determinar si
        //la inserción fue o no exitosa.
        await AddOneInstitute(Institute);
        //FIC: si no hubo error en el metodo anterior
        //entonces lanzamos la alerta de exito.
        setMensajeExitoAlert("Instituto fue creado y guardado Correctamente");
        //FIC: falta actualizar el estado actual (documentos/data) para que
        //despues de insertar el nuevo instituto se visualice en la tabla.
        //fetchDataInstitute();
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo crear el Instituto");
      }

      //FIC: ocultamos el Loading.
      setLoading(false);
    },
  });
  //FIC: props structure for TextField Control.
  const commonTextFieldProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    margin: "dense",
    disabled: !!mensajeExitoAlert,
  };
  return (
    <Dialog
      open={AddInstituteShowModal}
      onClose={() => setAddInstituteShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        {/* FIC: Aqui va el Titulo de la Modal */}
        <DialogTitle>
          <Typography component="h6">
            <strong>Agregar Nuevo Instituto</strong>
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
            value={formik.values.IdInstitutoOK}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
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
            value={formik.values.IdInstitutoBK}
            {...commonTextFieldProps}
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
            value={formik.values.DesInstituto}
            {...commonTextFieldProps}
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
            value={formik.values.Alias}
            {...commonTextFieldProps}
            error={formik.touched.Alias && Boolean(formik.errors.Alias)}
            helperText={formik.touched.Alias && formik.errors.Alias}
          />
          {/* <TextField
            id="Matriz"
            label="Matriz*"
            value={formik.values.Matriz}
            {...commonTextFieldProps}
            error={formik.touched.Matriz && Boolean(formik.errors.Matriz)}
            helperText={formik.touched.Matriz && formik.errors.Matriz}
          /> */}
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.Matriz}
                onChange={formik.handleChange}
                name="Matriz"
                color="primary"
                disabled={!!mensajeExitoAlert}
              />
            }
            label="Matriz"
          />
          {/* <TextField
            id="IdTipoGiroOK"
            label="IdTipoGiroOK*"
            value={formik.values.IdTipoGiroOK}
            {...commonTextFieldProps}
            error={
              formik.touched.IdTipoGiroOK && Boolean(formik.errors.IdTipoGiroOK)
            }
            helperText={
              formik.touched.IdTipoGiroOK && formik.errors.IdTipoGiroOK
            }
          /> */}
          <Select
            value={formik.values.IdTipoGiroOK}
            label="Selecciona una opción"
            onChange={formik.handleChange}
            name="IdTipoGiroOK" //FIC: Asegúrate que coincida con el nombre del campo
            onBlur={formik.handleBlur}
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
            value={formik.values.IdInstitutoSupOK}
            {...commonTextFieldProps}
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
            onClick={() => setAddInstituteShowModal(false)}
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
export default AddInstituteModal;
