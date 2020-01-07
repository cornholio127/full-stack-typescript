import React from 'react';
import { Box, Select, ThemeContext } from 'grommet';
import { FilterType } from './types';
import FilterItem from './FilterItem';
import { css } from 'styled-components';

interface Props {
  filter: FilterType[];
  onChange: (filters: FilterType[]) => void;
}

const remove = (filter: FilterType[], item: FilterType): FilterType[] => {
  return filter.filter(f => f[0] !== item[0] || f[1] !== item[1]);
};

const add = (filter: FilterType[], item: FilterType): FilterType[] => {
  return [...remove(filter, item), item];
};

const customSelect = {
  global: {
    hover: {
      color: 'brand',
    },
  },
  textInput: {
    extend: css`
      padding: 4px 8px;
      ::placeholder {
        color: #efefef;
        font-weight: 500;
      }
    `,
  },
  select: {
    icons: {
      color: '#efefef',
    },
    control: {
      extend: css`
        width: 150px;
        background: #666668;
        border: 0;
        &:active,
        &:focus {
          box-shadow: none;
        }
      `,
      open: {
        background: '#88888a',
      },
    },
    options: {
      container: {
        pad: '4px',
      },
    },
  },
};

const Filter: React.FC<Props> = ({ filter, onChange }) => {
  return (
    <Box>
      <Box direction="row">
        <ThemeContext.Extend value={customSelect}>
          <Select
            placeholder="Exact color"
            options={[
              'white',
              'gray',
              'black',
              'yellow',
              'red',
              'green',
              'blue',
              'purple',
              'orange',
              'brown',
              'silver',
              'gold',
              'pink',
            ]}
            value={undefined}
            onChange={({ option }) =>
              onChange(add(filter, ['Exact color', option]))
            }
          />
        </ThemeContext.Extend>
      </Box>
      <Box direction="row" pad="8px 0" margin={{ top: '16px', bottom: '16px' }}>
        {filter.map((f, i) => (
          <FilterItem
            key={i}
            filter={f}
            onRemove={f => onChange(remove(filter, f))}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Filter;
