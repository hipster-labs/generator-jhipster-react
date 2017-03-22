import React from 'react';
import { Cell } from 'fixed-data-table-2';

export const TextCell = ({ rowIndex, data, col, ...props }) => (
  <Cell {...props}>
    {data[rowIndex][col]}
  </Cell>
);

export const NestedTextCell = ({ rowIndex, data, col, child, ...props }) => (
  <Cell {...props}>
    {data[rowIndex][col][child]}
  </Cell>
);
