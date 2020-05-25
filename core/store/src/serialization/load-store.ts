/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import {
  StoriesStore,
  Story,
  deepMerge,
} from '@component-controls/specification';
import { LoadingStore } from '@component-controls/loader';
import { toId, storyNameFromExport } from '@storybook/csf';
import { addSmartControls } from './smart-controls';

let storyStore: StoriesStore | undefined = undefined;

export const loadStoryStore = (): StoriesStore | undefined => {
  if (storyStore) {
    return storyStore;
  }
  const store = require('@component-controls/loader/story-store-data.js');
  if (store) {
    try {
      const {
        stores,
        packages: loadedPackages,
        components: loadedComponents,
      }: LoadingStore = store;

      if (stores) {
        const globalStore: StoriesStore = {
          kinds: {},
          stories: {},
          components: {},
          packages: {},
        };
        stores.forEach(store => {
          if (Object.keys(store.kinds).length > 0) {
            Object.keys(store.kinds).forEach(kindName => {
              const kind = store.kinds[kindName];
              globalStore.kinds[kindName] = kind;
              Object.keys(store.stories).forEach(storyName => {
                const story: Story = store.stories[storyName];
                const {
                  title,
                  stories,
                  source,
                  component,
                  fileName,
                  repository,
                  components,
                  excludeStories,
                  includeStories,
                  package: kindPackage,
                  ...rest
                } = kind;
                Object.assign(story, deepMerge(rest, story));
                const smartControls = addSmartControls(
                  story,
                  kind,
                  loadedComponents,
                );
                if (smartControls) {
                  story.controls = deepMerge(
                    smartControls,
                    story.controls || {},
                  );
                }
                if (kind.title && story.name) {
                  const id = toId(kind.title, storyNameFromExport(story.name));
                  if (!kind.stories) {
                    kind.stories = [];
                  }
                  kind.stories.push(id);
                  globalStore.stories[id] = {
                    ...story,
                    name: storyNameFromExport(story.name),
                    id,
                    kind: kind.title,
                  };
                }
              });
            });
          }
        });
        storyStore = globalStore;
        storyStore.packages = loadedPackages;
        storyStore.components = loadedComponents;
      }
    } catch (e) {
      console.error(e);
    }
  }
  return storyStore;
};
