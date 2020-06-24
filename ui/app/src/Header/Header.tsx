/** @jsx jsx */
import { FC, useContext, useMemo } from 'react';
import { jsx, Box } from 'theme-ui';
import { PageType } from '@component-controls/core';
import { ActionBar, ActionItems } from '@component-controls/components';

import {
  ColorMode,
  SidebarContext,
  Header as AppHeader,
} from '@component-controls/components';
import { BlockContext, Search } from '@component-controls/blocks';

/**
 * application header component
 */
export const Header: FC = () => {
  const { SidebarToggle, collapsed, responsive } = useContext(SidebarContext);
  const { storeProvider } = useContext(BlockContext);
  const config = storeProvider.config;
  const { pages } = config || {};
  const leftActions: ActionItems = useMemo(() => {
    const actions: ActionItems = [
      { title: 'Home', href: '/', 'aria-label': 'go to home page', id: 'home' },
    ];
    if (pages) {
      return [
        ...actions,
        ...Object.keys(pages)
          .map(type => {
            const pageType = type as PageType;
            return { page: pages[pageType], pageType };
          })
          .filter(({ page, pageType }) => {
            return (
              page.topMenu &&
              Object.keys(storeProvider.getPageList(pageType)).length > 0
            );
          })
          .map(({ page }) => ({
            id: page.label?.toLowerCase(),
            'aria-label': `go to page ${page.label}`,
            href: `/${page.basePath}`,
            title: page.label,
          })),
      ];
    }
    return actions;
  }, [pages, storeProvider]);

  const rightActions: ActionItems = useMemo(() => {
    const actions: ActionItems = [
      { title: <Search />, id: 'search' },
      { title: <ColorMode />, id: 'colormode' },
    ];
    return actions;
  }, []);
  return (
    <AppHeader>
      <Box variant="appheader.container">
        {collapsed && <SidebarToggle />}
        <ActionBar themeKey="toolbar" actions={leftActions} />
      </Box>
      {!responsive && <ActionBar themeKey="toolbar" actions={rightActions} />}
    </AppHeader>
  );
};
