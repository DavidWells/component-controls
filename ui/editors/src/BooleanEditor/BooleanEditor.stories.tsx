import React from 'react';
import { ControlTypes } from '@component-controls/specification';
import { BooleanEditor } from './BooleanEditor';

export default {
  title: 'Editors/BooleanEditor',
  component: BooleanEditor,
};

export const sample = () => {
  const [state, setState] = React.useState(false);
  return (
    <BooleanEditor
      name="prop"
      onChange={(name, newVal) => setState(newVal)}
      prop={{ type: ControlTypes.BOOLEAN, value: state }}
    />
  );
};