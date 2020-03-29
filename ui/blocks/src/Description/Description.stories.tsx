/* eslint-disable react/display-name */
import React from 'react';
import { Description } from './Description';
import { MockContext } from '../test/MockContext';
export default {
  title: 'Blocks/Description',
  component: Description,
};

export const overview = () => (
  <MockContext>
    <Description of="Button" />
  </MockContext>
);

export const components = () => (
  <MockContext>
    <Description
      of="Button"
      components={{
        h1: ({ children }: { children: string }) => (
          <h1>{`custom component: ${children} `}</h1>
        ),
      }}
    />
  </MockContext>
);
