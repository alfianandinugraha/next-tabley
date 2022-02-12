import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Heading, HStack, Text } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import users from "@data/users";
import TextField from "components/text-field";
import type { NextPage } from "next";
import Head from "next/head";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";
import {
  TableInstance,
  useTable,
  UseGlobalFiltersInstanceProps,
  useGlobalFilter,
  Column,
  useSortBy,
  UseSortByInstanceProps,
} from "react-table";
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
  const {
    rows,
    prepareRow,
    getTableBodyProps,
    headerGroups,
    getTableProps,
    setGlobalFilter,
  } = useTable(
    {
      data: users,
      columns,
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <Container maxW="container.xl" mt="10">
      <Head>
        <title>Next Tabley</title>
      </Head>
      <Heading as="h1" fontSize="3xl">
        Tabley
      </Heading>
      <Box mt="6" display="flex" justifyContent="space-between">
        <HStack spacing="3">
          <Button>Prev</Button>
          <Button>Next</Button>;
        </HStack>
        <TextField
          placeholder="Search"
          maxW="400px"
          onChangeDebounce={setGlobalFilter}
        />
      </Box>
      <Table {...getTableProps()} mt="4">
        <Thead>
          {headerGroups.map((headerGroups) => {
            return (
              <Tr {...headerGroups.getHeaderGroupProps()}>
                {headerGroups.headers.map((column) => {
                  return (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <HStack display="flex" alignItems="center" spacing="2">
                        <Text>{column.render("Header")}</Text>
                        {column.isSorted ? (
                          <>
                            {column.isSortedDesc ? (
                              <HiArrowDown />
                            ) : (
                              <HiArrowUp />
                            )}
                          </>
                        ) : null}
                      </HStack>
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
                  return (
                    <Td {...cell.getCellProps()} minW="160px">
                      {cell.value}
                    </Td>
                  );
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
