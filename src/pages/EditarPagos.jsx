import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Input, Button, Box, Heading, Select, Tag } from "@chakra-ui/react";
// import axios from "axios";
// import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const EditarPagos = ({ editPagos }) => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: editPagos });

  // const { mutate, isLoading } = useMutation(async (data) => {
  //   const { data: result } = await axios.post(
  //     "https://localhost:7051/Product",
  //     data
  //   );
  //   return result;
  // });

  const onSubmit = async (data, e) => {
    // mutate(data);
    await supabase.from("pagos").update(data).match(editPagos);
    Swal.fire("Buen Trabajo!", "DOCUMENTO EDITADO CORRECTAMENTE!", "success");
    e.target.reset();
    navigate("/");
  };

  return (
    <Box className="main-section">
      <Box bg="#EAEDED" borderRadius="1rem" className="contenedor">
        <Box className="title-container">
          <Heading fontSize="2rem" textAlign="center" m="2rem">
            EDITAR PAGOS
          </Heading>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <Box className="inputs-container">
            <Input
              placeholder="Descripcion de pago"
              {...register("descripcion", { required: true })}
              bg="#fff"
            />

            {errors.monto?.type === "required" && (
              <Tag mt="0.2rem" bg="red" color="white">
                Campo Requerido
              </Tag>
            )}

            <Input
              placeholder="Monto a pagar"
              {...register("monto", { required: true })}
              bg="#fff"
              type="number"
            />

            {errors.monto?.type === "required" && (
              <Tag mt="0.2rem" bg="red" color="white">
                Campo Requerido
              </Tag>
            )}

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
            PAGAR
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default EditarPagos;
