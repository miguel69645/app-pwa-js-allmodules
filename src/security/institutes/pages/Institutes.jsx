import { Box } from "@mui/material";
import { useState } from "react";
import InstitutesNavTab from "../components/tabs/InstitutesNavTab";
import InstitutesTab from "../components/tabs/InstitutesTab";
// import BusinessNavTab from "../components/tabs/BusinessNavTab";
// import BusinessTab from "../components/tabs/BusinessTab";

const Institutes = () => {
  //FIC: indicamos que al iniciar no hay ningun Instituto seleccionado.
  const [currentRowInInstitutesTab, setCurrentRowInInstitutesTab] = useState(0);

  //FIC: indicamos que el estado inicial del tab page principal por default sera INSTITUTOS.
  const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] =
    useState("INSTITUTOS");

  //const InstitutosAllData = useSelector((state) => state.institutesReducer);
  return (
    <Box>
      {/* FIC: llamada intrinsica (props) */}

      <InstitutesNavTab
        setCurrentRowInInstitutesTab={setCurrentRowInInstitutesTab}
        setCurrentTabInPrincipalTab={setCurrentTabInPrincipalTab}
        // setBusinessTabInPrincipalTabIsSelected={
        //   setBusinessTabInPrincipalTabIsSelected
        // }
      />

      {/* FIC: si en el tap principal esta seleccionado es el tab de INSTITUTOS
            manda llamar la pagina que va dentro del tab de Institutos. */}
      {currentTabInPrincipalTab == "INSTITUTOS" && <InstitutesTab />}

      {/* FIC: si en el tap principal esta seleccionado el tab de NEGOCIOS
            manda llamar la pagina que va dentro del tab de Business. */}
      {currentTabInPrincipalTab == "NEGOCIOS" && <BusinessTab />}
    </Box>
  );
};

export default Institutes;
