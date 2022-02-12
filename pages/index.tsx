import { Heading } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/layout";
import users from "@data/users";
import DataTable from "components/data-table";
import GithubCorner from "components/github-corner";
import type { NextPage } from "next";
import Head from "next/head";
import { Column } from "react-table";
import { User } from "types/model";

const columns: ReadonlyArray<Column<User>> = [
  {
    Header: "User ID",
    accessor: "id",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Fullname",
    accessor: "fullName",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Country",
    accessor: "country",
  },
];

const Home: NextPage = () => {
  return (
    <>
      <GithubCorner />
      <Container maxW="container.xl" py="10">
        <Head>
          <title>Next Tabley</title>
        </Head>
        <Heading as="h1" fontSize="3xl">
          Tabley
        </Heading>
        <DataTable data={users} column={columns} />
      </Container>
    </>
  );
};

export default Home;
