import React from 'react';
import { StoryStore } from '@component-controls/store';
import {
  SetControlValueFn,
  ClickControlFn,
  ComponentControlButton,
} from '@component-controls/specification';
import { mergeControlValues } from '@component-controls/core';

export interface BlockControlsContextInputProps {
  /**
   * store
   */
  store: StoryStore;
}

export interface BlockControlsContextProps {
  /**
   * generic function to update the values of component controls.
   */
  setControlValue?: SetControlValueFn;

  /**
   * generic function to propagate a click event for component controls.
   */
  clickControl?: ClickControlFn;
}
//@ts-ignore
export const BlockControlsContext = React.createContext<
  BlockControlsContextProps
>({});

export const BlockControlsContextProvider: React.FC<BlockControlsContextInputProps> = ({
  children,
  store,
}) => {
  const setControlValue: SetControlValueFn = (
    storyId: string,
    propName: string | undefined,
    propValue: any,
  ) => {
    const story = store.getStory(storyId);
    const controls = story && story.controls;
    if (store && controls) {
      const newValues = mergeControlValues(controls, propName, propValue);
      store.updateStoryProp(storyId, 'controls', newValues);
    }
  };
  const clickControl: ClickControlFn = (storyId: string, propName: string) => {
    const story = store.getStory(storyId);
    const controls = story && story.controls;
    if (controls && controls[propName]) {
      const control: ComponentControlButton = controls[
        propName
      ] as ComponentControlButton;
      if (control && typeof control.onClick === 'function') {
        control.onClick(control);
      }
    }
  };
  return (
    <BlockControlsContext.Provider
      value={{
        setControlValue,
        clickControl,
      }}
    >
      {children}
    </BlockControlsContext.Provider>
  );
};