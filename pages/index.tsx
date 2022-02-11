import { Heading } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import users from "@data/users";
import type { NextPage } from "next";
import Head from "next/head";
import { useTable } from "react-table";

const Home: NextPage = () => {
  const { getTableProps, getTableBodyProps, rows, prepareRow, headerGroups } =
    useTable({
      data: users,
      columns: [
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
      ],
    });

  return (
    <Container maxW="container.xl" mt="10">
      <Head>
        <title>Next Tabley</title>
      </Head>
      <Heading as="h1" fontSize="3xl">
        Tabley
      </Heading>
      <Table {...getTableProps()} mt="4">
        <Thead>
          {headerGroups.map((headerGroups) => {
            return (
              <Tr {...headerGroups.getHeaderGroupProps()}>
                {headerGroups.headers.map((column) => {
                  return (
                    <Th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </Th>
                  );
                })}
              </Tr>
            );
          })}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <Td {...cell.getCellProps()}>{cell.value}</Td>;
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Container>
  );
};

export default Home;
