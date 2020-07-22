import React from 'react';
import { StoryStore } from '@component-controls/store';

import {
  Story,
  StoriesStore,
  StoryComponent,
  StoryComponents,
  Document,
  getComponentName,
  PackageInfo,
  docStoryToId,
} from '@component-controls/core';
import { CURRENT_STORY } from '../../utils';

export interface BlockDataContextProps {
  /**
   * returns a story and its associated objects (doc, component), given a story id
   */
  getStoryData: (
    storyId?: string,
    docId?: string,
  ) => {
    story?: Story;
    doc?: Document;
    component?: StoryComponent;
    docPackage?: PackageInfo;
    componentPackage?: PackageInfo;
  };

  /**
   * given an object of components, resolves to name => StoryComponent
   */
  getComponents: (
    components: { [key: string]: any } | undefined,
    doc: Document | undefined,
  ) => StoryComponents;
  /**
   *
   * find a story id from a story 'name'
   * will navigate through the store docs and look for a matching story id
   */
  storyIdFromName: (name: string) => string | undefined;

  /**
   *
   * find a story id from a story 'name' in current document
   */
  storyIdFromNameCurrent: (name: string) => string | undefined;

  /**
   * current story id
   */
  storyId?: string;
  /**
   * current documentation page, if no story is selected
   */
  docId?: string;
}
//@ts-ignore
export const BlockDataContext = React.createContext<BlockDataContextProps>({});

export interface BlockDataContextInoutProps {
  store: StoryStore;
  storyId?: string;
  docId?: string;
}

export const BlockDataContextProvider: React.FC<BlockDataContextInoutProps> = ({
  children,
  storyId,
  docId,
  store: storeProvider,
}) => {
  const store: StoriesStore | undefined = storeProvider
    ? storeProvider.getStore()
    : undefined;

  const getStoryData = (id?: string, docId?: string) => {
    if (store) {
      const actualId = !id || id === CURRENT_STORY ? storyId : id;
      const story: Story | undefined =
        store.stories && actualId ? store.stories[actualId] : undefined;
      const doc =
        story && story.doc
          ? store.docs[story.doc]
          : docId
          ? store.docs[docId]
          : undefined;
      const storyComponent: any = story?.component || doc?.component;

      const componentName = getComponentName(storyComponent);
      const component =
        componentName && doc && doc.componentsLookup[componentName]
          ? store.components[doc.componentsLookup[componentName]]
          : undefined;
      const docPackage =
        doc && doc.package ? store.packages[doc.package] : undefined;
      const componentPackage =
        component && component.package
          ? store.packages[component.package]
          : undefined;
      return { story, doc, component, docPackage, componentPackage };
    }
    return {};
  };

  const getComponents = (
    components: { [key: string]: any } | undefined,
    doc: Document | undefined,
  ): StoryComponents => {
    const getComponent = (name: string) =>
      doc?.componentsLookup[name] &&
      store?.components[doc.componentsLookup[name]];
    return store && doc && components
      ? Object.keys(components).reduce((acc, key) => {
          const comp = components[key];
          if (comp === CURRENT_STORY) {
            const comps: Record<string, StoryComponent> = {};
            const name = getComponentName(doc.component);
            if (name) {
              const component = getComponent(name);
              if (component) {
                comps[name] = component;
              }
            }
            if (doc.subcomponents) {
              Object.keys(doc.subcomponents).forEach(subKey => {
                const name = getComponentName(doc.subcomponents?.[subKey]);
                if (name) {
                  const component = getComponent(name);
                  if (component) {
                    comps[name] = component;
                  }
                }
              });
            }
            return { ...acc, ...comps };
          }
          const name = getComponentName(comp);
          if (name) {
            const component = getComponent(name);
            if (component) {
              return { ...acc, [key]: component };
            }
          }
          return acc;
        }, {})
      : {};
  };

  const storyIdFromName = (name: string): string | undefined => {
    if (store) {
      for (const title in store.docs) {
        const doc = store.docs[title];
        const storyId = docStoryToId(title, name);
        if (doc.stories && doc.stories.indexOf(storyId) > -1) {
          return storyId;
        }
      }
    }
    return undefined;
  };

  const storyIdFromNameCurrent = (name: string): string | undefined => {
    if (store && docId) {
      return docStoryToId(docId, name);
    }
    return undefined;
  };
  return (
    <BlockDataContext.Provider
      value={{
        storyId,
        docId,
        getStoryData,
        storyIdFromName,
        storyIdFromNameCurrent,
        getComponents,
      }}
    >
      {children}
    </BlockDataContext.Provider>
  );
};
