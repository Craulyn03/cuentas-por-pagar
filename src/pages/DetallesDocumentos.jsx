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

const DetallesDocumentos = ({ setEditDocumento }) => {
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
      const { data } = await supabase.from("documentos").select();
      setData(data);
    };
    getData();
  }, [setData]);

  const deleteItem = async (numero_documento) => {
    setData(data.filter((el) => el.numero_documento !== numero_documento));
    await supabase
      .from("documentos")
      .delete()
      .match({ numero_documento: numero_documento });
    // axios.delete(`https://localhost:7051/ProductId?id=${id}`);
  };

  const editItem = (el) => {
    setEditDocumento({
      numero_factura: el.numero_factura,
      fecha: el.fecha,
      proveedor: el.proveedor,
      monto: el.monto,
      estado: el.estado,
    });
  };

  return (
    <Box pt="5rem">
      <Box textAlign="center" mb="2rem">
        <Heading>LISTADO DE DOCUMENTOS</Heading>
      </Box>
     
      <TableContainer p="2rem">
        <Table variant="simple" className="table">
          <TableCaption>Productos de Inventario</TableCaption>
          <Thead>
            <Tr>
              <Th>NUMERO DE FACTURA</Th>
              <Th>FECHA</Th>
              <Th>PROVEEDOR</Th>
              <Th>CONCEPTO DE PAGO</Th>
              <Th>MONTO</Th>
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
                    <Td encabezados="NUMERO DE FACTURA">{el.numero_factura}</Td>
                    <Td encabezados="FECHA">{el.fecha}</Td>
                    <Td encabezados="PROVEEDOR">{el.proveedor}</Td>
                    <Td encabezados="CONCEPTO DE PAGO">{el.concepto}</Td>
                    <Td encabezados="MONTO">{el.monto}</Td>
                    <Td encabezados="ESTADO" isNumeric>
                      {el.estado}
                    </Td>

                    <Td>
                      <Link to="/editar-documento">
                        <Button onClick={() => editItem(el)} bg="#F1C40F">
                          Editar
                        </Button>
                      </Link>
                    </Td>

                    <Td>
                      <Button
                        onClick={() => deleteItem(el.numero_documento)}
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

export default DetallesDocumentos;
