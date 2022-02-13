/* eslint-disable react/jsx-key */
import { Box } from "@chakra-ui/layout";
import { Select, HStack, Button, Checkbox } from "@chakra-ui/react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React from "react";
import {
  HiArrowDown,
  HiArrowUp,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import {
  Column,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import GotoForm from "./goto-form";
import Pagination from "./pagination";
import TextField from "./text-field";

type DataTableProps<T extends object> = {
  data: T[];
  column: ReadonlyArray<Column<T>>;
};

function DataTable<T extends object>(props: DataTableProps<T>) {
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
      data: props.data,
      columns: props.column,
      initialState: {
        pageSize: 5,
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllPageRowsSelectedProps }) => {
            const { checked, ...props } = getToggleAllPageRowsSelectedProps();
            return (
              <Box>
                <Checkbox {...props} isChecked={checked} />
              </Box>
            );
          },
          Cell: ({ row }: any) => {
            const { checked, ...props } = row.getToggleRowSelectedProps();
            return (
              <Box>
                <Checkbox {...props} isChecked={checked} />
              </Box>
            );
          },
          disableFilters: true,
        },
        ...columns,
      ]);
    }
  );

  return (
    <Box>
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
                        <HStack display="flex" alignItems="center" spacing="2">
                          <Box>{column.render("Header")}</Box>
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
                      {column.canFilter ? (
                        <TextField
                          onChangeDebounce={(value) =>
                            setFilter(column.id, value)
                          }
                          placeholder={`Search ${column.id.toLocaleLowerCase()}`}
                        />
                      ) : null}
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
                    <Td
                      {...cell.getCellProps()}
                      minW={cell.column.id === "selection" ? "0" : "160px"}
                      className={cell.column.id}
                    >
                      {cell.render("Cell")}
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
    </Box>
  );
}

export default DataTable;
