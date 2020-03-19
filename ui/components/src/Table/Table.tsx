/* eslint-disable react/jsx-key */
/** @jsx jsx */
import { FC } from 'react';
import { Box, BoxProps, Flex, useThemeUI, jsx } from 'theme-ui';
import { get } from '@theme-ui/css';
import memoize from 'fast-memoize';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useGroupBy,
  useExpanded,
  Column,
  Cell,
  Row,
  PluginHook,
  TableOptions,
  UseFiltersOptions,
  UseGroupByCellProps,
  UseGroupByRowProps,
  UseExpandedState,
  UseGroupByState,
  TableState,
} from 'react-table';
import Octicon, { TriangleUp, TriangleDown } from '@primer/octicons-react';
import { GlobalFilter } from './TableFilter';
import { useExpanderColumn } from './TableGrouping';
import { useTableLayout } from './useTableLayout';

const defaultColumn = memoize(() => ({
  subRows: undefined,
}));

interface TableOwnProps {
  columns: Column[];
  data?: any[];
  header?: boolean;
  sorting?: boolean;
  filtering?: boolean;
  itemsLabel?: string;
  groupBy?: string[];
  hiddenColumns?: string[];
  expanded?: {
    [key: string]: boolean;
  };
}

export type TableProps = TableOwnProps & BoxProps;
export const Table: FC<TableProps> = ({
  columns,
  data = [],
  header = true,
  sorting = false,
  filtering = false,
  itemsLabel = 'properties',
  groupBy,
  expanded,
  hiddenColumns,
  ...rest
}) => {
  const plugins: PluginHook<any>[] = [
    useTableLayout,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    useExpanderColumn,
  ];
  const initialState: Partial<TableState<{}>> &
    Partial<UseExpandedState<{}>> &
    Partial<UseGroupByState<{}>> = {};
  if (Array.isArray(groupBy)) {
    initialState.groupBy = groupBy;
    initialState.hiddenColumns = hiddenColumns || groupBy;
  } else if (hiddenColumns !== undefined) {
    initialState.hiddenColumns = hiddenColumns;
  }
  if (typeof expanded === 'object') {
    initialState.expanded = expanded;
  }
  const options: TableOptions<{}> & UseFiltersOptions<{}> = {
    columns,
    data,
    defaultColumn: defaultColumn() as Column,
    initialState,
  };

  if (sorting) {
    plugins.push();
  }
  const tableOptions = useTable(options, ...plugins) as any;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableOptions;
  const { theme } = useThemeUI();
  return (
    <Box
      as="table"
      {...getTableProps()}
      css={get(theme, 'styles.table')}
      {...rest}
    >
      {header && (
        <Box as="thead" css={get(theme, 'styles.thead')}>
          {headerGroups.map((headerGroup: any) => (
            <Box as="tr" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <Box
                  as="th"
                  {...column.getHeaderProps(
                    sorting ? column.getSortByToggleProps() : undefined,
                  )}
                  css={get(theme, 'styles.th')}
                >
                  <Flex
                    sx={{
                      flexDirection: 'row',
                      alignItems: 'center ',
                    }}
                  >
                    <Box sx={{ mr: 1 }}>{column.render('Header')}</Box>
                    {sorting && column.isSorted && (
                      <Octicon
                        icon={column.isSortedDesc ? TriangleDown : TriangleUp}
                      />
                    )}
                  </Flex>
                </Box>
              ))}
            </Box>
          ))}
          {filtering && (
            <Box as="tr">
              <th
                colSpan={visibleColumns.length}
                style={{
                  ...get(theme, 'styles.th'),
                  textAlign: 'left',
                }}
              >
                <GlobalFilter
                  itemsLabel={itemsLabel}
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </th>
            </Box>
          )}
        </Box>
      )}
      <Box as="tbody" {...getTableBodyProps()} css={get(theme, 'styles.tbody')}>
        {rows.map((row: Row & UseGroupByRowProps<{}>) => {
          prepareRow(row);
          return (
            <Box as="tr" {...row.getRowProps()} css={get(theme, 'styles.tr')}>
              {row.isGrouped
                ? row.cells[0].render('Aggregated')
                : row.cells.map(
                    (cell: Cell & Partial<UseGroupByCellProps<{}>>) => {
                      return (
                        <Box
                          as="td"
                          {...cell.getCellProps()}
                          css={get(theme, 'styles.td')}
                        >
                          {cell.render('Cell')}
                        </Box>
                      );
                    },
                  )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};