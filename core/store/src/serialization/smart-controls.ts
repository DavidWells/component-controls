import {
  ComponentControls,
  Story,
  StoriesKind,
  StoryComponent,
  getComponentName,
} from '@component-controls/specification';
import { controlsFromProps } from '@component-controls/core';

export const addSmartControls = (
  story: Story,
  kind: StoriesKind,
  components: { [key: string]: StoryComponent },
): ComponentControls | null => {
  if (!story.arguments || story.arguments.length < 1) {
    //story has no arguments
    return null;
  }
  const params = story.parameters || {};
  const { addonControls = {} } = params;
  const { smart: smartControls = true } = addonControls;
  if (!smartControls) {
    return null;
  }
  const storyComponent = story.component || params.component;
  if (!storyComponent) {
    return null;
  }
  const componentName = getComponentName(storyComponent);
  if (componentName) {
    const component = components[kind.components[componentName]];
    if (component.info) {
      const newControls = controlsFromProps(component.info.props);
      const { include, exclude } = smartControls;
      const usedProps: string[] | undefined = Array.isArray(
        story.arguments[0].value,
      )
        ? story.arguments[0].value.map(v => v.name as string)
        : undefined;
      const controls = Object.keys(newControls)
        .filter(key => {
          if (Array.isArray(include) && !include.includes(key)) {
            return false;
          }
          if (Array.isArray(exclude) && exclude.includes(key)) {
            return false;
          }
          if (usedProps && !usedProps.includes(key)) {
            return false;
          }
          return true;
        })
        .reduce((acc, key) => ({ ...acc, [key]: newControls[key] }), {});
      return controls;
    }
  }
  return null;
};