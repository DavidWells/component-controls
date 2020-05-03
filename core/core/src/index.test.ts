import {
  ControlTypes,
  ComponentControls,
} from '@component-controls/specification';

import {
  mergeControlValues,
  resetControlValues,
  getControlValues,
} from './index';

describe('Controls utils', () => {
  const controls: ComponentControls = {
    name: { type: ControlTypes.TEXT, value: 'hello', resetValue: 'hello' },
    age: { type: ControlTypes.NUMBER, value: 19, resetValue: 19 },
  };
  const modifiedControls: ComponentControls = {
    name: { type: ControlTypes.TEXT, value: 'today', resetValue: 'hello' },
    age: { type: ControlTypes.NUMBER, value: 19, resetValue: 19 },
  };

  it('Should merge property value', () => {
    expect(mergeControlValues(controls, 'name', 'today')).toMatchObject(
      modifiedControls,
    );
  });
  it('Should merge property object', () => {
    expect(
      mergeControlValues(controls, undefined, {
        name: modifiedControls.name.value,
        age: modifiedControls.age.value,
      }),
    ).toMatchObject(modifiedControls);
  });

  it('Should reset property value', () => {
    expect(
      mergeControlValues(
        modifiedControls,
        'name',
        resetControlValues(modifiedControls, 'name'),
      ),
    ).toMatchObject(controls);
  });
  it('Should reset entire object', () => {
    expect(resetControlValues(modifiedControls)).toMatchObject(
      getControlValues(controls),
    );
  });
  it('Should reset reset entire object and match merged values', () => {
    expect(
      mergeControlValues(
        modifiedControls,
        undefined,
        resetControlValues(modifiedControls),
      ),
    ).toMatchObject(controls);
  });
});
