import React from 'react';
import { ControlTypes } from '@component-controls/core';

import { LinkHeading, LinkHeadingProps } from './';

export default {
  title: 'Components/LinkHeading',
  component: LinkHeading,
};

export const overview = ({ as, children }: LinkHeadingProps) => (
  <LinkHeading as={as}>{children}</LinkHeading>
);

overview.story = {
  controls: {
    children: { type: ControlTypes.TEXT, value: 'LinkHeading text' },
    as: {
      type: ControlTypes.OPTIONS,
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      value: 'h1',
    },
  },
};
