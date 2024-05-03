//FIC: React
import React, { useEffect, useMemo, useState } from "react";
//FIC: Material UI
import { MaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, Button, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
//FIC: DB
//import InstitutesStaticData from '../../../../../db/security/json/institutes/InstitutesData';
import { getAllInstitutes } from "../../services/remote/get/getAllInstitutes";
import { getOneInstitute } from "../../services/remote/get/getOneInstitute";
import { deleteInstitute } from "../../services/remote/del/deleteOneInstitute";
//FIC: Modals
import AddInstituteModal from "../modals/AddInstituteModal";
import UpdateInstituteModal from "../modals/UpdateInstituteModal";
import DetailsInstituteModal from "../modals/DetailsInstituteModal";

//FIC: Table - FrontEnd.
const InstitutesTable = () => {
  const handleDeleteClick = async () => {
    if (selectedInstituteId !== null) {
      try {
        await deleteInstitute(selectedInstituteId);
        // Mostrar una alerta cuando el instituto se elimina con éxito
        alert(`Instituto con ID ${selectedInstituteId} eliminado.`);
        // Actualizar la lista de institutos después de la eliminación
        const AllInstitutesData = await getAllInstitutes();
        setInstitutesData(AllInstitutesData);
      } catch (error) {
        console.error(
          `Error al eliminar el instituto con ID ${selectedInstituteId}:`,
          error
        );
        alert(`Error al eliminar el instituto con ID ${selectedInstituteId}.`);
      }
    } else {
      console.log("Por favor, selecciona una fila para eliminar.");
      alert("Por favor, selecciona una fila para eliminar.");
    }
  };
  const updateInstitutes = async () => {
    try {
      const AllInstitutesData = await getAllInstitutes();
      setInstitutesData(AllInstitutesData);
    } catch (error) {
      console.error(
        "Error al actualizar los institutos en updateInstitutes:",
        error
      );
    }
  };
  const addInstitutes = async () => {
    try {
      const AllInstitutesData = await getAllInstitutes();
      setInstitutesData(AllInstitutesData);
    } catch (error) {
      console.error(
        "Error al actualizr los institutos en addInstitutes:",
        error
      );
    }
  };
  //FIC: controlar el estado del indicador (loading).
  const [loadingTable, setLoadingTable] = useState(true);

  //FIC: controlar el estado de la data de Institutos.
  const [InstitutesData, setInstitutesData] = useState([]);
  //FIC: controlar el estado que muesta u oculta la modal de nuevo Instituto.
  const [AddInstituteShowModal, setAddInstituteShowModal] = useState(false);
  const [UpdateInstituteShowModal, setUpdateInstituteShowModal] =
    useState(false);
  const [DetailsInstituteShowModal, setDetailsInstituteShowModal] =
    useState(false);
  //FIC: controlar el estado del instituteId seleccionado.
  const [selectedInstituteId, setSelectedInstituteId] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const AllInstitutesData = await getAllInstitutes();
        setInstitutesData(AllInstitutesData);
        //setInstitutesData(InstitutesStaticData);
        setLoadingTable(false);
      } catch (error) {
        console.error(
          "Error al obtener los institutos en useEffect de InstitutesTable:",
          error
        );
      }
    }
    fetchData();
  }, []);
  const handleRowClick = (row) => {
    setSelectedInstituteId(row.IdInstitutoOK);
  };
  //FIC: Columns Table Definition.
  const InstitutesColumns = [
    {
      accessorKey: "IdInstitutoOK",
      header: "ID OK",
      size: 30, //small column
    },
    {
      accessorKey: "IdInstitutoBK",
      header: "ID BK",
      size: 30, //small column
    },
    {
      accessorKey: "DesInstituto",
      header: "INSTITUTO",
      size: 150, //small column
    },
    {
      accessorKey: "Alias",
      header: "ALIAS",
      size: 50, //small column
    },
    {
      accessorKey: "Matriz",
      header: "MATRIZ",
      size: 30, //small column
    },
    {
      accessorKey: "IdTipoGiroOK",
      header: "GIRO",
      size: 150, //small column
    },
    {
      accessorKey: "IdInstitutoSupOK",
      header: "ID OK SUP",
      size: 30, //small column
    },
    {
      accessorKey: "select",
      header: "Seleccionar",
      Cell: ({ row }) => (
        <button onClick={() => handleRowClick(row.original)}>
          Seleccionar
        </button>
      ),
    },
  ];
  return (
    <Box>
      <Box>
        <MaterialReactTable
          columns={InstitutesColumns}
          data={InstitutesData}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          onRowClick={handleRowClick} // Agregando la función de manejo de clic de fila
          rowProps={(row) => ({
            style: {
              backgroundColor:
                row.IdInstitutoOK === selectedInstituteId ? "#ADD8E6" : "white",
            },
          })}
          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- BARRA DE ACCIONES ------ */}
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  <Tooltip title="Agregar">
                    <IconButton onClick={() => setAddInstituteShowModal(true)}>
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton
                      onClick={async () => {
                        if (selectedInstituteId !== null) {
                          const instituteDetails = await getOneInstitute(
                            selectedInstituteId
                          );
                          console.log(instituteDetails);
                          setUpdateInstituteShowModal(true);
                        } else {
                          alert("Por favor, selecciona una fila para editar.");
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton onClick={handleDeleteClick}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Detalles ">
                    <IconButton
                      onClick={() => {
                        if (selectedInstituteId !== null) {
                          setDetailsInstituteShowModal(true);
                        } else {
                          alert(
                            "Por favor, selecciona una fila para ver detalles."
                          );
                        }
                      }}
                    >
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>
              {/* ------- BARRA DE ACCIONES FIN ------ */}
            </>
          )}
        />
      </Box>
      {/* M O D A L E S */}
      <Dialog open={AddInstituteShowModal}>
        <AddInstituteModal
          AddInstituteShowModal={AddInstituteShowModal}
          setAddInstituteShowModal={setAddInstituteShowModal}
          onClose={() => setAddInstituteShowModal(false)}
          addInstitutes={addInstitutes}
        />
      </Dialog>
      <Dialog open={UpdateInstituteShowModal}>
        <UpdateInstituteModal
          UpdateInstituteShowModal={UpdateInstituteShowModal}
          setUpdateInstituteShowModal={setUpdateInstituteShowModal}
          onClose={() => setUpdateInstituteShowModal(false)}
          instituteId={selectedInstituteId}
          updateInstitutes={updateInstitutes}
        />
      </Dialog>
      <Dialog open={DetailsInstituteShowModal}>
        <DetailsInstituteModal
          instituteId={selectedInstituteId}
          onClose={() => setDetailsInstituteShowModal(false)}
        />
      </Dialog>
    </Box>
  );
};
export default InstitutesTable;
