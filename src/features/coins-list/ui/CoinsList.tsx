import React from 'react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  SharedSelection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import { columns } from './columns';
import { ICoinRateObject } from '@/types/IGetRatesResponse';
import { Link } from 'react-router';

import { ChevronDownIcon, SearchIcon } from '@/shared/ui/icons';
import { IRemappedCoinRateObject } from '@/shared/utils/remapDataRelativeTo';

const INITIAL_VISIBLE_COLUMNS = ['icon', 'name', 'rate', 'ask', 'bid', 'diff24h'];

interface ICoinsListProps {
  rates: Array<IRemappedCoinRateObject> | null | undefined;
}

export function CoinsList({ rates }: ICoinsListProps) {
  const [filterValue, setFilterValue] = React.useState('');
  const [visibleColumns, setVisibleColumns] = React.useState<SharedSelection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'name',
    direction: 'ascending',
  });

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (typeof columns === 'string' && columns === 'all') return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    if (!rates) {
      return null;
    }

    let filtered = rates;

    if (hasSearchFilter) {
      filtered = filtered.filter(
        (item) =>
          item.coin.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filtered;
  }, [rates, filterValue]);

  const sortedItems = React.useMemo(() => {
    if (!filteredItems) {
      return null;
    }

    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof IRemappedCoinRateObject];
      const second = b[sortDescriptor.column as keyof IRemappedCoinRateObject];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const renderCell = React.useCallback((object: IRemappedCoinRateObject, columnKey: keyof IRemappedCoinRateObject) => {
    const cellValue = object[columnKey];
    switch (columnKey) {
      case 'icon':
        return (
          <Link to={`/rates/${object.coin}`}>
            <img width={32} height={32} src={object.icon} alt={object.coin} />
          </Link>
        );
      case 'name':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny uppercase text-default-400">{object.coin}</p>
          </div>
        );
      case 'coin':
        return object.coin;
      case 'rate':
        return object.rate;
      case 'ask':
        return object.ask;
      case 'bid':
        return object.bid;
      case 'diff24h':
        return (
          <p className={object.diff24h > 0 ? 'text-green-500' : object.diff24h === 0 ? '' : 'text-red-500'}>
            {object.diff24h}
          </p>
        );
      default:
        return cellValue;
    }
  }, []);

  const onSearchChange = React.useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => {
              onClear();
            }}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                variant="bordered"
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {rates?.length ? rates.length : '0'} rows</span>
        </div>
      </div>
    );
  }, [filterValue, visibleColumns, rates, onSearchChange, hasSearchFilter]);

  return (
    <Table
      isHeaderSticky
      aria-label="Example table with custom cells and sorting"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
      isStriped
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn key={column.uid} allowsSorting={column.sortable}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No data available'} items={sortedItems ?? []}>
        {(item) => (
          <TableRow key={item.coin}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof ICoinRateObject)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
