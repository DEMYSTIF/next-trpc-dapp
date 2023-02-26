import Head from "next/head";
import { useState } from "react";
import {
  Input,
  FormControl,
  Container,
  Heading,
  Select,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  ModalBody,
} from "@chakra-ui/react";
import { trpc } from "../utils/trpc";

export default function Home() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [grade, setGrade] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const issue = trpc.issue.useMutation();

  const handleSubmit = async () => {
    const certificate = {
      id,
      name,
      course,
      grade,
      date,
    };
    console.log(certificate);
    issue.mutate(certificate);
    onOpen();
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <Container centerContent>
          <Heading as="h2" size="xl" my={4} noOfLines={1}>
            Certificate DApp
          </Heading>
          <Heading as="h4" size="md" my={2} noOfLines={1}>
            Issue Certificate
          </Heading>
          <FormControl my={2}>
            <Input
              type="text"
              placeholder="Enter Certificate ID"
              onChange={(e) => setId(e.currentTarget.value)}
            />
          </FormControl>
          <FormControl my={2}>
            <Input
              type="text"
              placeholder="Enter Candidate Name"
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </FormControl>
          <Select my={2} onChange={(e) => setCourse(e.currentTarget.value)}>
            <option hidden>Select Course</option>
            <option value="CBA">Certified Blockchain Associate</option>
            <option value="CED">Certified Ethereum Developer</option>
            <option value="CHF">Certified Hyperledger Fabric Developer</option>
            <option value="CBR">Certified Blockchain Architect</option>
          </Select>
          <Select my={2} onChange={(e) => setGrade(e.currentTarget.value)}>
            <option hidden>Select Grade</option>
            <option value="S">S</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </Select>
          <FormControl my={2}>
            <Input
              type="date"
              onChange={(e) => setDate(e.currentTarget.value)}
            />
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Container>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Success</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{issue.data?.message}</ModalBody>
          </ModalContent>
        </Modal>
      </section>
    </>
  );
}
