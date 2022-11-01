import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Input, Button, Box, Heading, Select, Tag } from "@chakra-ui/react";
// import axios from "axios";
// import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const EditarDocumento = ({ editDocumento, proveedores }) => {
  const navigate = useNavigate();
  //   console.log(edit);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: editDocumento,
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
    await supabase.from("documentos").update(data).match(editDocumento);
    Swal.fire("Buen Trabajo!", "DOCUMENTO EDITADO CORRECTAMENTE!", "success");
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
            EDITAR DOCUMENTO
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default EditarDocumento;
