import React from 'react'
import { addDecorator, addParameters } from '@storybook/react';
import { Title as SBTitle, Description as SBDescription, Story as SBStory, Stories as SBStories, Props } from '@storybook/addon-docs/blocks';
import { DependenciesTable } from 'storybook-addon-deps/blocks';
import { ControlsTable, ThemeProvider, Title, Subtitle, Story, Stories, Description, StorySource, Playground, ComponentSource, PropsTable, BlockContextProvider } from '@component-controls/storybook';

addDecorator((story, ctx ) => {
  return (
    <ThemeProvider>
      {story(ctx)}
    </ThemeProvider>
  );
})

export const DocsPage = ({
  titleSlot,
  subtitleSlot,
  descriptionSlot,
  propsSlot,
  storiesSlot,
}) => {
  return (
    <BlockContextProvider>
      <SBTitle slot={titleSlot} />
      <Title slot={titleSlot} />
      <Subtitle slot={subtitleSlot} />
      <SBDescription slot={descriptionSlot} />
      <Description slot={descriptionSlot} />
      <ComponentSource id="." title='Component source' />
      <Story id="." />
      <SBStory id="." />
      <StorySource id="." title='Story source'/>
      <ControlsTable id="." />
      <PropsTable of="." />
      <Props slot={propsSlot} />
      <Playground>
        <Story id="." />
      </Playground>
      <DependenciesTable titleDependencies='Dependencies' titleDependents='Dependents' />
      <Stories />
      <SBStories slot={storiesSlot} />
    </BlockContextProvider>  
  );
};
const categories = ['Storybook', 'Blocks', 'Editors', 'Components']
addParameters({
  docs: { page: DocsPage },
  dependencies: { hideEmpty: true },
  options: {
    storySort: (a, b) => {
      const aKind = a[1].kind.split('/')[0];
      const aIndex = categories.findIndex(c => c === aKind);
      const bKind = b[1].kind.split('/')[0];
      const bIndex = categories.findIndex(c => c === bKind);
      return aIndex - bIndex;
    },
  },
});