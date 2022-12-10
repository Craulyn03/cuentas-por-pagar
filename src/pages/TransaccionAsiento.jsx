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
  import axios from "axios";
  // import { useEffect } from "react";
  import { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import { supabase } from "../supabaseClient";
  
  
  const TransaccionAsiento = ({ setEditDocumento }) => {
    const [data, setData] = useState([]);

    //   const [filtroName, setFiltroName] = useState("");
    //   const [filtroCategory, setFiltroCategory] = useState("");
  
    // useEffect(() => {
    //   return () => {
    //     axios.get('https://webapi220221209170127contabilidad.azurewebsites.net/Api/EntradaContable').then((res) => {
    //       console.log(res.data);
    //     });
    //   };
    // }, []);

  //     const { mutate, isLoading } = useMutation(async (data) => {
  //   const { data: result } = await axios.post(
  //     "https://localhost:7051/Product",
  //     data
  //   );
  //   return result;
  // });
  
    useEffect(() => {
      const getData = async () => {
        const { data } = await supabase.from("documentos").select();
        
        setData(data);
      };
      getData();
    }, [setData]);


      //     const { mutate, isLoading } = useMutation(async (data) => {
  //   const { data: result } = await axios.post(
  //     "https://localhost:7051/Product",
  //     data
  //   );
  //   return result;
  // });

  
  
  const post = (dato)=> {
    const   postData =     
      {
      ID_ASIENTO: null,
      DESCRIPCION: dato.concepto,
      IDENTIFICADOR_AUX: "6",
      CUENTA: "10",
      TIPOMOV: "DB",
      FECHAASIENTO: dato.fecha,
      MONTOASIENTO: dato.monto,
      ESTADO: dato.estado,
    }
 
      axios.post('https://webapi220221209170127contabilidad.azurewebsites.net/Api/EntradaContable', 
      JSON.stringify(postData) 
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
    console.log(postData)
    console.log(JSON.stringify(postData) 
    )
    return postData
  }

  
   
    return (
      <Box pt="5rem">
        <Box textAlign="center" mb="2rem">
          <Heading>TRANSACCIONES DE ASIENTOS</Heading>
        </Box>
        
        <TableContainer p="2rem">
          <Table variant="simple" className="table">
            <TableCaption>Productos de Inventario</TableCaption>
            <Thead>
              <Tr>
                <Th>ID DE TRANSACCION</Th>
                <Th>DESCRIPCION</Th>
                <Th>FECHA DE TRANSACCION</Th>
                <Th>MONTO</Th>
                <Th isNumeric>ID DE ASIENTO</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.length === 0 ? (
                <Tr>
                  <Td colSpan={5} fontWeight="bold">
                    NO HAY TRANSACCIONES DE ASIENTOS
                  </Td>
                </Tr>
              ) : (
                data
                  .map((el) => (
                    <Tr key={el.id} className="table">
                      <Td encabezados="NUMERO DE FACTURA">{el.numero_factura}</Td>
                      <Td encabezados="CONCEPTO">{el.concepto}</Td>
                      <Td encabezados="FECHA">{el.fecha}</Td>
                      <Td encabezados="MONTO">{el.monto}</Td>
                      <Td encabezados="ESTADO" isNumeric>
                        NULL
                      </Td>
  
                      <Td>
                        <Link>
                          <Button onClick={()=>post(el)} >
                            CONTABILIZAR
                          </Button>
                        </Link>
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
  
  export default TransaccionAsiento;
  