import { Button } from "@chakra-ui/button";
import { Box, Heading, HStack, Stack, Text } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import users from "@data/users";
import GithubCorner from "components/github-corner";
import GotoForm from "components/goto-form";
import Pagination from "components/pagination";
import TextField from "components/text-field";
import type { NextPage } from "next";
import Head from "next/head";
import {
  HiArrowUp,
  HiArrowDown,
  HiChevronRight,
  HiChevronLeft,
} from "react-icons/hi";
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
    pageOptions,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      data: users,
      columns,
      initialState: {
        pageSize: 5,
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

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
        <Box mt="6" display="flex" justifyContent="space-between">
          <Select
            w="20"
            onChange={(e) => {
              setPageSize(+e.target.value);
            }}
          >
            <option value="5">5</option>
            <option value="25">25</option>
            <option value="75">75</option>
            <option value="150">150</option>
            <option value="200">200</option>
          </Select>
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
                      <Th {...column.getHeaderProps()}>
                        <Box mb="2" {...column.getSortByToggleProps()}>
                          <HStack
                            display="flex"
                            alignItems="center"
                            spacing="2"
                          >
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
        <Box mt="4" display="flex" justifyContent="space-between">
          <GotoForm
            onSubmit={(page) => {
              gotoPage(page - 1);
            }}
          />
          <HStack spacing="3">
            <Pagination
              currentPage={pageIndex}
              totalPages={pageOptions.length}
              data={pageOptions}
              onClick={gotoPage}
            />
            <Button
              disabled={!canPreviousPage}
              onClick={previousPage}
              colorScheme="blue"
              leftIcon={<HiChevronLeft />}
            >
              Prev
            </Button>
            <Button
              disabled={!canNextPage}
              onClick={nextPage}
              colorScheme="blue"
              rightIcon={<HiChevronRight />}
            >
              Next
            </Button>
          </HStack>
        </Box>
      </Container>
    </>
  );
};

export default Home;
