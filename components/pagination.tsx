import { Button } from "@chakra-ui/button";
import { Box, HStack } from "@chakra-ui/layout";
import { useMemo } from "react";

type PaginationProps = {
  currentPage: number;
  data: any[];
  onClick: (page: number) => void;
  totalPages: number;
};

const Pagination = (props: PaginationProps) => {
  const pages = useMemo(() => {
    const result = [];

    for (let i = 0; i < props.totalPages; i++) {
      result.push(i);
    }

    return result;
  }, [props.totalPages]);

  const paginate = useMemo(() => {
    const current = props.currentPage + 1;
    let start = current - 1;
    let end = current + 1;

    if (!pages[end]) {
      end = pages[pages.length - 1];
      start = end - 2;
    }

    if (start <= 1) {
      end -= start - 1;
      start = 1;
    }

    if (end > pages.length) end = pages.length;

    const result: number[] = [];

    for (let i = start; i <= end; i++) {
      result.push(i);
    }

    return {
      start,
      end,
      pages: result,
    };
  }, [props.currentPage, pages]);

  return (
    <HStack spacing="3">
      {paginate.start > 1 ? (
        <>
          <Button onClick={() => props.onClick(0)}>1</Button>
        </>
      ) : null}
      {paginate.start > 2 ? (
        <>
          <Button>...</Button>
        </>
      ) : null}
      {paginate.pages.map((item) => {
        return (
          <Button
            key={item}
            onClick={() => {
              props.onClick(item - 1);
            }}
            colorScheme={props.currentPage + 1 === item ? "blue" : "gray"}
          >
            {item}
          </Button>
        );
      })}
      {paginate.end < pages.length - 1 ? (
        <>
          <Button>...</Button>
        </>
      ) : null}
      {paginate.end < pages.length ? (
        <>
          <Button
            colorScheme={
              pages[pages.length - 1] === props.currentPage ? "blue" : "gray"
            }
            onClick={() => {
              props.onClick(pages[pages.length - 1]);
            }}
          >
            {pages[pages.length - 1] + 1}
          </Button>
        </>
      ) : null}
    </HStack>
  );
};

export default Pagination;
