import {useEffect, useState} from 'react';
import shallow from 'zustand/shallow';
import {Grid, HStack, Select, Box, Flex} from '@chakra-ui/react';

import {useLogState} from '../context';

function Filter(): JSX.Element {
  const [
    dateRange,
    setDateRange,
  ] = useLogState(
    state => [
      state.dateRange,
      state.setDateRange,
    ],
    shallow,
  );

  const handleDateRangeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const {value} = event.target;
    setDateRange(value);
  };

  return (
    <Flex direction="row" justify="end">
      <Select
        required
        onChange={handleDateRangeChange}
        value={dateRange}
        maxW={{base: '100%', md: '140px'}}
        size="sm"
        mr={2}
      >
        <option value="daily">Daily</option>
        <option value="week">Last 7 days</option>
        <option value="month">Last 30 days</option>
        <option value="year">Last years</option>
      </Select>
    </Flex>
  );
}

export default Filter;
