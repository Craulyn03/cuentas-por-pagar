import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Input, Button, Box, Heading, Select, Tag } from "@chakra-ui/react";
// import axios from "axios";
// import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const RegistroDoc = ({ proveedores }) => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // const { mutate, isLoading } = useMutation(async (data) => {
  //   const { data: result } = await axios.post(
  //     "https://localhost:7051/Product",
  //     data
  //   );
  //   return result;
  // });

  const onSubmit = async (data, e) => {
    // mutate(data);
    await supabase.from("documentos").insert([data]);
    console.log(data);
    Swal.fire("Buen Trabajo!", "PRODUCTO AGREGADO CORRECTAMENTE!", "success");
    e.target.reset();
    navigate("/");
  };

  return (
    <Box className="main-section">
      <Box bg="#EAEDED" borderRadius="1rem" className="contenedor">
        <Box className="title-container">
          <Heading fontSize="2rem" textAlign="center" m="2rem">
            REGISTRO DE DOCUMENTOS
          </Heading>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <Box className="inputs-container">
            <Input
              placeholder="Numero de factura a pagar"
              {...register("numero_factura", { required: true })}
              bg="#fff"
            />

            {errors.numero_factura?.type === "required" && (
              <Tag mt="0.2rem" bg="red" color="white">
                Campo Requerido
              </Tag>
            )}

            <Input
              placeholder="Fecha"
              {...register("fecha", { required: true })}
              bg="#fff"
              type="date"
            />

            {errors.fecha?.type === "required" && (
              <Tag mt="0.2rem" bg="red" color="white">
                Campo Requerido
              </Tag>
            )}

            <Input
              placeholder="Monto"
              {...register("monto", { required: true })}
              bg="#fff"
            />

            {errors.monto?.type === "required" && (
              <Tag mt="0.2rem" bg="red" color="white">
                Campo Requerido
              </Tag>
            )}

            <Select
              placeholder="Proveedor"
              {...register("proveedor", { required: true })}
              bg="#fff"
            >
              {proveedores.map((el) => (
                <option value={el.id} key={el.id}>
                  {el.nombre}
                </option>
              ))}
            </Select>

            <Select
              placeholder="Estado"
              {...register("estado", { required: true })}
              bg="#fff"
            >
              <option value="pendiente">Pendiente</option>
              <option value="pagado">Pagado</option>
            </Select>

            {errors.estado?.type === "required" && (
              <Tag mt="0.2rem" bg="red" color="white">
                Campo Requerido
              </Tag>
            )}
          </Box>

          <Button
            colorScheme="messenger"
            type="submit"
            width="200px"
            // isLoading={isLoading}
            className="btn-enviar"
          >
            REGISTRAR DOCUMENTO
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default RegistroDoc;
