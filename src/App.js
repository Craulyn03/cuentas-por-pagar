import { Flex, Box } from "@chakra-ui/react";
import Menu from "./components/Menu";
import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import RegistroProveedores from "./pages/RegistroProveedores";
import RegistroPago from "./pages/RegistroPago";
import DetallesProveedores from "./pages/DetallesProveedores";
import DetallesPagos from "./pages/DetallesPagos";
import DetallesDocumentos from "./pages/DetallesDocumentos";
import { useState, useEffect } from "react";
import EditarProveedores from "./pages/EditarProveedores";
import EditarPagos from "./pages/EditarPagos";
import EditarDocumentos from "./pages/EditarDocumentos";
import { AiOutlineMenu } from "react-icons/ai";
import "../src/style/estilos.css";
import RegistroDoc from "./pages/RegistroDoc";
import { supabase } from "./supabaseClient";
import TransaccionAsiento from "./pages/TransaccionAsiento";


const initialUser = {
  id: null,
  nombre: "",
  tipo_persona: "",
  cedula:"",
  estado: "",
  balance: 0,
};

const initialPago = {
  id: null,
  nombre: "",
  cedula:"",
  tipo_persona: "",
  estado: "",
  balance: 0,
};


function App() {


  const [editDocumento, setEditDocumento] = useState({
    numero_factura: 0,
    fecha: "",
    proveedor: "",
    monto: 0,
    estado: "",
  });

  const [editProveedores, setEditProveedores] = useState({
    nombre: "",
    cedula: "",
    tipo_persona: "",
    balance: 0,
    estado: "",
  });

  const [editPagos, setEditPagos] = useState({
    descripcion: "",
    monto: "",
    estado: 0,
  });

  const [isActive, setIsActive] = useState(false);

  const handleClick = (event) => {
    setIsActive((current) => !current);
  };

  const [proveedores, setProveedores] = useState([]);
  const [conceptosPagos, setConceptosPagos] = useState([]);
    const [initialUserNew, setInitialUserNew] = useState(initialUser);
  const [usuarioPagar, setUsuarioPagar] = useState(initialPago);


  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("proveedores").select();
      setProveedores(data);
    };
    getData();
  }, [proveedores]);

  useEffect(() => {
    const getConceptosPagos = async () => {
      const { data } = await supabase.from("pagos").select();
      setConceptosPagos(data);
    };
    getConceptosPagos();
  }, [conceptosPagos]);


  return (
    <Flex>
      <Box
        className="icon icon-inactive"
        onClick={handleClick}
        bg="black"
        mr="2rem"
      >
        <AiOutlineMenu w={6} h={6} fontSize="1.8rem" color="white" />
      </Box>

      <Box
        h="100vh"
        bg="#34495E"
        size="200px"
        color="white"
        className={isActive ? "sidebar-active" : "sidebar"}
        pt="15rem"
      >
        <Menu />
      </Box>

      <Box flex="1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registrar-pago" element={<RegistroPago />} />
          <Route
            path="/detalles-pago"
            element={<DetallesPagos setEditPagos={setEditPagos} />}
          />

          <Route
            path="/editar-pago"
            element={<EditarPagos editPagos={editPagos} />}
          />

          <Route
            path="/editar-proveedor"
            element={<EditarProveedores editProveedores={editProveedores} />}
          />

          <Route
            path="/detalles-producto"
            element={
              <DetallesProveedores setEditProveedores={setEditProveedores} />
            }
          />

          <Route
            path="/registrar-proveedor"
            element={<RegistroProveedores />}
          />

          <Route
            path="/editar-proveedor"
            element={<EditarPagos editPagos={editPagos} />}
          />

          <Route
            path="/registrar-documento"
            element={<RegistroDoc proveedores={proveedores} conceptosPagos={conceptosPagos} initialUserNew={initialUserNew} usuarioPagar={usuarioPagar}/>}
          />

          <Route
            path="/detalles-documento"
            element={
              <DetallesDocumentos
                proveedores={proveedores}
                setEditDocumento={setEditDocumento}
              />
            }
          />

          <Route
            path="/editar-documento"
            element={
              <EditarDocumentos
                editDocumento={editDocumento}
                proveedores={proveedores}
              />
            }
          />

          <Route
            path="/transacciones-asientos"
            element={<TransaccionAsiento/>}
          />

        </Routes>
      </Box>
    </Flex>
  );
}

export default App;
