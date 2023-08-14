import {
  VStack,
  Input,
  useToast,
  Box,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AlertPopup from "../AlertPopup";
import { insertSchoolGrades } from "../../../services/api";
import { useNavigate } from "react-router-dom";

export default function Builder() {
  const toast = useToast();
  const [data, setData] = useState({ fullName: "", grade: 0, state: "" });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    insertSchoolGrades(data)
      .then(() => {
        toast({
          title: "Nota adicionada com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setTimeout(() => {
          navigate("/students");
        }, 500);
      })
      .catch(() =>
        toast({
          title: "Erro ao lançar notas",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      );
    setData(data);
  };

  console.log(data);
  console.log(errors);

  const numericValidate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(event.target.value);
    const number = String(inputValue > 10 ? 10 : inputValue).replace(
      /[^0-9]/g,
      ""
    );

    setValue("grade", Number(number), { shouldValidate: true });
    setValue(
      "state",
      Number(number) >= 6
        ? "Aprovado"
        : Number(number) === 5
        ? "Recuperação"
        : "Reprovado",
      { shouldValidate: true }
    );
  };

  return (
    <Box
      height="calc(100vh - 7.5rem)"
      width="100vw"
      justifyContent={"center"}
      flexDirection={"column"}
      gap={8}
      display={"flex"}
      alignItems={"center"}
    >
      <Heading as="h1">Lançar notas</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack width={"360px"}>
          <Input
            type="text"
            placeholder="Nome"
            {...register("fullName", {
              required: "Insira o nome completo do aluno",
              minLength: 3,
              maxLength: 80,
            })}
          />
          {errors.firstname && <AlertPopup title={errors.firstname.message} />}
          <Input
            value={getValues("grade")}
            type="text"
            placeholder="Nota do aluno"
            {...register("grade", {
              required: "Insira a nota do aluno",
            })}
            onChange={numericValidate}
          />
          {errors.lastname && <AlertPopup title={errors.lastname.message} />}

          <Button
            borderRadius="md"
            bg="cyan.600"
            _hover={{ bg: "cyan.200" }}
            variant="ghost"
            type="submit"
          >
            Enviar
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
