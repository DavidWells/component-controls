/* eslint-disable react/display-name */
/** @jsx jsx */
import { FC, useEffect } from 'react';
import { jsx, Box } from 'theme-ui';
import { MDXProvider, MDXProviderComponents } from '@mdx-js/react';
import { StoryStore } from '@component-controls/store';

import { markdownComponents } from '@component-controls/components';
import { BlockContextProvider, StoryContextConsumer } from '../context';

export interface PageContainerProps {
  /**
   * store object
   */
  store: StoryStore;

  /**
   * story to display in the page
   */
  storyId?: string;

  /**
   * global options passed from container
   * those are global parameters as well as decorators
   */
  options?: any;

  /**
   * components to customize the markdown display.
   */
  components?: MDXProviderComponents;
}

/**
 *
 * If the page is an MDX page, will display the MDX components.
 * Otherwise, the page elements are passed as children
 */
export const PageContainer: FC<PageContainerProps> = ({
  children,
  storyId,
  store,
  options,
  components = {},
}) => {
  let scrollId: string | undefined;
  try {
    const pageURL =
      (typeof window !== 'undefined' &&
      window.location !== window.parent.location &&
      window.parent.location
        ? window.parent.location.href
        : document.location.href) || '';
    const url = new URL(pageURL);
    scrollId = url.hash ? url.hash.substring(1) : undefined;
  } catch (err) {}

  useEffect(() => {
    if (scrollId) {
      const element = document.getElementById(scrollId);
      if (element) {
        // Introducing a delay to ensure scrolling works when it's a full refresh.
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        }, 100);
      }
    }
  }, [scrollId]);
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        padding: '4rem 20px',
        bg: 'background',
        color: 'text',
        fontFamily: 'body',
      }}
    >
      <Box sx={{ maxWidth: '1000px', width: '100%' }}>
        {store && storyId ? (
          <BlockContextProvider
            storyId={storyId}
            store={store}
            options={options}
          >
            <StoryContextConsumer id={storyId}>
              {({ kind }) => {
                const { MDXPage } = kind || {};
                return MDXPage ? (
                  <MDXProvider
                    components={{ ...markdownComponents, ...components }}
                  >
                    <MDXPage />
                  </MDXProvider>
                ) : (
                  children
                );
              }}
            </StoryContextConsumer>
          </BlockContextProvider>
        ) : (
          children
        )}
      </Box>
    </Box>
  );
};
