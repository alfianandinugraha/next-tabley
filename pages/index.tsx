import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Heading, HStack, Stack, Text } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import users from "@data/users";
import TextField from "components/text-field";
import type { NextPage } from "next";
import Head from "next/head";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";
import {
  useTable,
  useGlobalFilter,
  Column,
  useSortBy,
  useFilters,
  usePagination,
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
    page,
    prepareRow,
    getTableBodyProps,
    headerGroups,
    getTableProps,
    setGlobalFilter,
    setFilter,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      data: users,
      columns,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <Container maxW="container.xl" my="10">
      <Head>
        <title>Next Tabley</title>
      </Head>
      <Heading as="h1" fontSize="3xl">
        Tabley
      </Heading>
      <Box mt="6" display="flex" justifyContent="space-between">
        <TextField
          placeholder="Search"
          maxW="400px"
          onChangeDebounce={setGlobalFilter}
        />
        <Stack display="flex" spacing="4" direction="row">
          <Select
            w="40"
            onChange={(e) => {
              setPageSize(+e.target.value);
            }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="75">75</option>
            <option value="150">150</option>
            <option value="200">200</option>
          </Select>
          <HStack spacing="3">
            <Button disabled={!canPreviousPage} onClick={previousPage}>
              Prev
            </Button>
            <Button disabled={!canNextPage} onClick={nextPage}>
              Next
            </Button>
          </HStack>
        </Stack>
      </Box>
      <Table {...getTableProps()} mt="4">
        <Thead>
          {headerGroups.map((headerGroups) => {
            return (
              <Tr {...headerGroups.getHeaderGroupProps()}>
                {headerGroups.headers.map((column) => {
                  return (
                    <Th {...column.getHeaderProps()}>
                      <Box mb="2" {...column.getSortByToggleProps()}>
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
                      </Box>
                      <TextField
                        onChangeDebounce={(value) =>
                          setFilter(column.id, value)
                        }
                        placeholder={`Search ${column.id.toLocaleLowerCase()}`}
                      />
                    </Th>
                  );
                })}
              </Tr>
            );
          })}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
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
