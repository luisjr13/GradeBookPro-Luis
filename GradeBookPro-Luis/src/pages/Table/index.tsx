import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Container,
  useToast,
  ButtonGroup,
  Flex,
  IconButton,
  useEditableControls,
  Editable,
  EditableInput,
  EditablePreview,
  Input,
  Box,
  Button,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteStudents,
  getStudents,
  updateSchoolGrades,
} from "../../services/api";
import { DatabaseType } from "../../services/types";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Loading from "../../Components/Loading";

export const CustomTable = () => {
  const [data, setData] = useState<DatabaseType[]>();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleStudent = () => {
    setLoad(true);
    getStudents().then((response) => setData(response?.GradeBookPro));

    setTimeout(() => {
      setLoad(false);
    }, 1000);
  };

  useEffect(() => {
    handleStudent();
  }, []);

  console.log(data);

  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          aria-label=""
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        ></IconButton>
        <IconButton
          aria-label=""
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        ></IconButton>
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          aria-label=""
          size="sm"
          icon={<EditIcon />}
          {...getEditButtonProps()}
        ></IconButton>
      </Flex>
    );
  };

  return load ? (
    <Loading />
  ) : (
    <Container height={"100vh"} maxWidth={"auto"} padding={"20px 300px"}>
      {data?.length === 0 ? (
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          padding={"5.2rem 9rem"}
          alignItems={"center"}
        >
          <Heading fontWeight={600} fontSize={`28px`} lineHeight={"110%"}>
            Você ainda não lançou nenhuma nota. <br />
            <br />
            <span>Clique no botão abaixo para lançar</span>
          </Heading>
          <Button
            width={"40%"}
            onClick={() => navigate("/add-school-grades")}
            colorScheme={"green"}
            bg={"blue.400"}
            rounded={"full"}
            px={6}
            _hover={{
              bg: "blue.500",
            }}
          >
            Lançar notas
          </Button>
        </Stack>
      ) : (
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Nome Completo</Th>
                <Th>Nota</Th>
                <Th isNumeric>Situação</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data
                ?.slice()
                .sort((a, b) => b.id - a.id)
                .map((student, index) => (
                  <Tr key={index}>
                    <Td>
                      <Editable
                        display={"flex"}
                        gap={"4px"}
                        as={"td"}
                        textAlign="center"
                        defaultValue={student.fullName ?? ""}
                        isPreviewFocusable={true}
                        onSubmit={(value) =>
                          updateSchoolGrades(
                            student.id,
                            "fullName",
                            value
                          ).then(() => handleStudent())
                        }
                      >
                        <EditablePreview />
                        <Input as={EditableInput} height={"30"} />
                        <EditableControls />
                      </Editable>
                    </Td>
                    <Td>
                      {" "}
                      <Editable
                        display={"flex"}
                        gap={"4px"}
                        as={"td"}
                        textAlign="center"
                        defaultValue={String(student.grade) ?? ""}
                        isPreviewFocusable={true}
                        onSubmit={(value) =>
                          updateSchoolGrades(student.id, "grade", value).then(
                            () => {
                              updateSchoolGrades(
                                student.id,
                                "state",
                                Number(value) >= 6
                                  ? "Aprovado"
                                  : Number(value) === 5
                                  ? "Recuperação"
                                  : "Reprovado"
                              ).then(() => handleStudent());
                            }
                          )
                        }
                      >
                        <EditablePreview />
                        <Input as={EditableInput} height={"30"} />
                        <EditableControls />
                      </Editable>
                    </Td>
                    <Td isNumeric display={"flex"} justifyContent={"end"}>
                      <div>
                        {student.state}
                        <IconButton
                          onClick={() =>
                            deleteStudents(student.id)
                              .then(() => {
                                setLoad(true);
                                handleStudent();
                                setTimeout(() => {
                                  setLoad(false);
                                }, 2000);
                                toast({
                                  title: "Aluno removido com sucesso",
                                  status: "success",
                                  duration: 3000,
                                  isClosable: true,
                                });
                              })
                              .catch(() =>
                                toast({
                                  title: "Falha ao remover Aluno",
                                  status: "error",
                                  duration: 3000,
                                  isClosable: true,
                                })
                              )
                          }
                          aria-label=""
                          size="sm"
                          icon={<DeleteIcon />}
                        ></IconButton>
                      </div>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Nome Completo</Th>
                <Th>Nota</Th>
                <Th isNumeric>Situação</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
