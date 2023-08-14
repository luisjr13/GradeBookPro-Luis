"use client";

import { Flex, Container, Stack, Text, Button } from "@chakra-ui/react";
import { ILogo } from "../../Components/Icons";
import { useNavigate } from "react-router-dom";

export default function CallToActionWithIllustration() {
  const navigate = useNavigate();
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Flex w={"full"} justifyContent={"center"}>
          <ILogo height={"6rem"} />
        </Flex>
        <Text color={"gray.500"} maxW={"3xl"}>
          O GradeBookPro é a solução definitiva para simplificar e aprimorar a
          maneira como você gerencia e lança as notas dos seus alunos. Com uma
          interface intuitiva e recursos avançados, o GradeBook Pro oferece aos
          educadores e instituições de ensino uma plataforma robusta e eficiente
          para registrar, calcular e analisar as notas dos alunos.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            onClick={() => navigate("/add-school-grades")}
            rounded={"full"}
            px={6}
            colorScheme={"green"}
            bg={"#4ecca3"}
            _hover={{ bg: "#349977" }}
          >
            Get started
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
