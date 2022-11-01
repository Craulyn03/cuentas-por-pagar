import { List, ListItem, ListIcon, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiFillHome, AiFillHdd, AiOutlineContainer } from "react-icons/ai";

const Menu = () => {
  return (
    <Box>
      <List spacing={3} textAlign="center">
        <Link to="/">
          <ListItem
            p="1.2rem"
            _hover={{
              background: "white",
              color: "teal.500",
              fontWeight: "600",
            }}
          >
            <ListIcon as={AiFillHome} />
            Inicio
          </ListItem>
        </Link>
        <Link to="/registrar-proveedor">
          <ListItem
            p="1.2rem"
            _hover={{
              background: "white",
              color: "teal.500",
              fontWeight: "600",
            }}
          >
            <ListIcon as={AiFillHdd} />
            Registrar Proveedor
          </ListItem>
        </Link>
        <Link to="/detalles-producto">
          <ListItem
            p="1.2rem"
            _hover={{
              background: "white",
              color: "teal.500",
              fontWeight: "600",
            }}
          >
            <ListIcon as={AiOutlineContainer} />
            Detalles de Proveedores
          </ListItem>
        </Link>
        <Link to="/registrar-documento">
          <ListItem
            p="1.2rem"
            _hover={{
              background: "white",
              color: "teal.500",
              fontWeight: "600",
            }}
          >
            <ListIcon as={AiFillHdd} />
            Registro de Documentos
          </ListItem>
        </Link>
        <Link to="/detalles-documento">
          <ListItem
            p="1.2rem"
            _hover={{
              background: "white",
              color: "teal.500",
              fontWeight: "600",
            }}
          >
            <ListIcon as={AiFillHdd} />
            Detalles de Documentos
          </ListItem>
        </Link>
      </List>
    </Box>
  );
};

export default Menu;
