import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Input, Button, Box, Heading, Select, Tag } from "@chakra-ui/react";
// import axios from "axios";
// import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const EditarProveedores = ({ editProveedores }) => {
  const navigate = useNavigate();
  //   console.log(edit);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: editProveedores,
  });

  // const { mutate, isLoading } = useMutation(async (data) => {
  //   const res = await axios.put(
  //     `https://localhost:7051/Product?id=${edit.id}`,
  //     {
  //       name: data.name,
  //       description: data.description,
  //       category: data.category,
  //       stock: data.stock,
  //       price: data.price,
  //     }
  //   );
  //   return res;
  // });

  const onSubmit = async (data, e) => {
    // mutate(data);
    await supabase.from("proveedores").update(data).match(editProveedores);
    Swal.fire("Buen Trabajo!", "PRODUCTO EDITADO CORRECTAMENTE!", "success");
    e.target.reset();
    navigate("/");
  };

  return (
    <Box className="main-section">
      <Box bg="#EAEDED" borderRadius="1rem" className="contenedor">
        <Box className="title-container">
          <Heading fontSize="2rem" m="2rem">
            EDITAR PRODUCTO
          </Heading>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <Box className="inputs-container">
            <Input
              placeholder="Nombre del Proveedor"
              {...register("nombre", { required: true })}
              bg="#fff"
            />

            {errors.name?.type === "required" && (
              <Tag mt="0.2rem" bg="red" color="white">
                Campo Requerido
              </Tag>
            )}
            <Select
              placeholder="Tipo de persona"
              {...register("tipo_persona", { required: true })}
              bg="#fff"
            >
              <option value="fisica">Fisica</option>
              <option value="juridica">Juridica</option>
            </Select>

            {errors.tipo_persona?.type === "required" && (
              <Tag mt="0.2rem" bg="red" color="white">
                Campo Requerido
              </Tag>
            )}

            <Input
              placeholder="Cedula"
              {...register("cedula", { required: true })}
              bg="#fff"
            />

            {errors.cedula?.type === "required" && (
              <Tag mt="0.2rem" bg="red" color="white">
                Campo Requerido
              </Tag>
            )}

            <Input
              placeholder="Balance"
              {...register("balance", { required: true })}
              bg="#fff"
              type="number"
            />
            {errors.balance?.type === "required" && (
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
            EDITAR PROVEEDOR
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default EditarProveedores;
