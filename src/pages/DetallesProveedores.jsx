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
  Input,
} from "@chakra-ui/react";
// import axios from "axios";
// import { useEffect } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

const DetallesProveedores = ({ setEditProveedores }) => {
  const [data, setData] = useState([]);
  // const [filtroName, setFiltroName] = useState("");
  // const [filtroCategory, setFiltroCategory] = useState("");

  // useEffect(() => {
  //   return () => {
  //     axios.get("https://localhost:7051/ProductAll").then((res) => {
  //       setData(res.data);
  //     });
  //   };
  // }, []);

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("proveedores").select();
      setData(data);
    };
    getData();
  }, [setData]);

  const deleteItem = async (id) => {
    console.log(id);
    setData(data.filter((el) => el.id !== id));
    await supabase.from("proveedores").delete().match({ id: id });
    // axios.delete(`https://localhost:7051/ProductId?id=${id}`);
  };

  const editItem = (el) => {
    setEditProveedores({
      nombre: el.nombre,
      cedula: el.cedula,
      tipo_persona: el.tipo_persona,
      balance: el.balance,
      estado: el.estado,
    });
  };

  return (
    <Box pt="5rem">
      <Box textAlign="center" mb="2rem">
        <Heading>LISTADO DE PROVEEDORES</Heading>
      </Box>
      <Box ml="2rem">
        <Heading ml="1rem" fontSize="1rem">
          Filtros
        </Heading>
        <Input
          placeholder="Producto"
          maxWidth="200px"
          // onChange={(e) => setFiltroName(e.target.value)}
          m="1rem"
        />

        <Input
          placeholder="Categoria"
          maxWidth="200px"
          // onChange={(e) => setFiltroCategory(e.target.value)}
        />
      </Box>
      <TableContainer p="2rem">
        <Table variant="simple" className="table">
          <TableCaption>Productos de Inventario</TableCaption>
          <Thead>
            <Tr>
              <Th>NOMBRE</Th>
              <Th>TIPO DE PERSONA</Th>
              <Th>CEDULA/RNC</Th>
              <Th>BALANCE</Th>
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
                // .filter((producto) =>
                //   producto.name.toLowerCase().includes(filtroName.toLowerCase())
                // )
                // .filter((producto) =>
                //   producto.category
                //     .toLowerCase()
                //     .includes(filtroCategory.toLowerCase())
                // )
                .map((el) => (
                  <Tr key={el.id} className="table">
                    <Td encabezados="NOMBRE">{el.nombre}</Td>
                    <Td encabezados="TIPO DE PERSONA">{el.tipo_persona}</Td>
                    <Td encabezados="CEDULA/RNC">{el.cedula}</Td>
                    <Td encabezados="BALANCE">{el.balance}</Td>
                    <Td encabezados="ESTADO" isNumeric>
                      {el.estado}
                    </Td>

                    <Td>
                      <Link to="/editar-proveedor">
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

export default DetallesProveedores;
