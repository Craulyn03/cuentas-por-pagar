import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Button,
  Heading,
} from "@chakra-ui/react";
// import axios from "axios";
// import { useEffect } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

const DetallesPagos = ({ setEditPagos }) => {
  const [data, setData] = useState([]);

  //   const [filtroName, setFiltroName] = useState("");
  //   const [filtroCategory, setFiltroCategory] = useState("");

  // useEffect(() => {
  //   return () => {
  //     axios.get("https://localhost:7051/ProductAll").then((res) => {
  //       setData(res.data);
  //     });
  //   };
  // }, []);

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("pagos").select();
      setData(data);
    };
    getData();
  }, [setData]);

  const deleteItem = async (id) => {
    setData(data.filter((el) => el.id !== id));
    await supabase.from("pagos").delete().match({ id: id });
    // axios.delete(`https://localhost:7051/ProductId?id=${id}`);
  };

  const editItem = (el) => {
    setEditPagos({
      id: el.id,
      monto: el.monto,
      descripcion: el.descripcion,
      estado: el.estado,
    });
  };

  return (
    <Box pt="5rem">
      <Box textAlign="center" mb="2rem">
        <Heading>LISTA DE PAGOS</Heading>
      </Box>

      <TableContainer p="2rem">
        <Table variant="simple" className="table">
          <TableCaption>Productos de Inventario</TableCaption>
          <Thead>
            <Tr>
              <Th>IDENTIFICADOR</Th>
              <Th>CONCEPTO DE PAGO</Th>
              <Th isNumeric>ESTADO</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length === 0 ? (
              <Tr>
                <Td colSpan={5} fontWeight="bold">
                  NO HAY PRODUCTOS REGISTRADOS
                </Td>
              </Tr>
            ) : (
              data
                // .filter((documento) =>
                //   documento.numero_factura
                //     .toLowerCase()
                //     .includes(filtroName.toLowerCase())
                // )
                // .filter((documento) =>
                //   documento.numero_factura
                //     .toLowerCase()
                //     .includes(filtroCategory.toLowerCase())
                // )
                .map((el) => (
                  <Tr key={el.id} className="table">
                    <Td encabezados="IDENTIFICARDOR">{el.id}</Td>
                    <Td encabezados="DESCRIPCION">{el.descripcion}</Td>
                    <Td encabezados="ESTADO" isNumeric>
                      {el.estado}
                    </Td>

                    <Td>
                      <Link to="/editar-pago">
                        <Button onClick={() => editItem(el)} bg="#F1C40F">
                          Editar
                        </Button>
                      </Link>
                    </Td>

                    <Td>
                      <Button
                        onClick={() => deleteItem(el.id)}
                        bg="red"
                        color="white"
                        _hover={{
                          color: "black",
                        }}
                      >
                        Eliminar
                      </Button>
                    </Td>
                  </Tr>
                ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DetallesPagos;
