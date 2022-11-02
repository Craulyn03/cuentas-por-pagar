import {
  Heading,
  Box,
  Image,
  Center,
  Text,
  Button,
  Fade,
  useDisclosure,
} from "@chakra-ui/react";
import img from "../img/presentacion-api.jpg";

function FadeEx() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button onClick={onToggle}>MAS...</Button>
      <Fade in={isOpen}>
        <Box
          p="40px"
          color="white"
          mt="4"
          bg="teal.500"
          rounded="md"
          shadow="md"
        >
          <Text textAlign="center" fontSize="xl">
            Comienza a registrar tus productos
          </Text>
        </Box>
      </Fade>
    </>
  );
}

const Inicio = () => {
  return (
    <Box textAlign="center" pt="3rem">
      <Heading>CUENTAS POR PAGAR</Heading>
      <Center pt="1rem">
        <Image
          borderRadius="full"
          boxSize="150px"
          src={img}
          alt="presentacion-img"
        />
      </Center>
      <Box maxWidth="600px" margin="auto" mt="1rem">
        <Center bg="#F2F4F4" p="2rem" borderRadius="2rem">
          <Text textAlign="justify" fontSize="xl">
            En este sistema de cuenta por pagar se podran ver todos los aporte
            de una parte deudora, que aparece como resultado de una compra de
            bienes o servicios en términos de crédito, a una parte acreedora.
          </Text>
        </Center>
        <Box mt="2rem">{FadeEx()}</Box>
      </Box>
    </Box>
  );
};

export default Inicio;
