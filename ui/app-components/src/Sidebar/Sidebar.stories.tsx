import React from 'react';
import Octicon, { Project } from '@primer/octicons-react';
import { Flex } from 'theme-ui';
import {
  ThemeProvider,
  CollapsibleProps,
} from '@component-controls/components';
import { Sidebar, SidebarContext, SidebarContextProvider } from '.';

export default {
  title: 'App components/Sidebar',
  component: Sidebar,
};

export const overview = ({
  collapsible,
  width,
  easing,
}: {
  collapsible: boolean;
  width: number;
  easing: CollapsibleProps['easing'];
}) => (
  <ThemeProvider>
    <SidebarContextProvider collapsible={collapsible}>
      <SidebarContext.Consumer>
        {({ SidebarToggle }) => (
          <Flex css={{ flexDirection: 'row', alignItems: 'start' }}>
            <SidebarToggle />
            <Sidebar width={width} animate={{ easing }}>
              <ul>
                <li>item 1</li>
                <li>item 2</li>
                <li>item 3</li>
              </ul>
            </Sidebar>
          </Flex>
        )}
      </SidebarContext.Consumer>
    </SidebarContextProvider>
  </ThemeProvider>
);

overview.story = {
  controls: {
    collapsible: { type: 'boolean', value: true },
    width: { type: 'number', value: undefined },
    easing: {
      type: 'options',
      options: ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out'],
    },
  },
};

export const title = () => (
  <ThemeProvider>
    <SidebarContextProvider>
      <div style={{ border: '1px solid black' }}>
        <SidebarContext.Consumer>
          {({ SidebarToggle }) => (
            <Flex css={{ flexDirection: 'row', alignItems: 'start' }}>
              <SidebarToggle />

              <Sidebar title="Title">
                <ul>
                  <li>item 1</li>
                  <li>item 2</li>
                  <li>item 3</li>
                </ul>
              </Sidebar>
            </Flex>
          )}
        </SidebarContext.Consumer>
      </div>
    </SidebarContextProvider>
  </ThemeProvider>
);

export const icon = () => (
  <ThemeProvider>
    <SidebarContextProvider>
      <div style={{ border: '1px solid black' }}>
        <SidebarContext.Consumer>
          {({ SidebarToggle }) => (
            <Flex css={{ flexDirection: 'row', alignItems: 'start' }}>
              <SidebarToggle icon={<Octicon icon={Project} />} />
              <Sidebar title="Title">
                <ul>
                  <li>item 1</li>
                  <li>item 2</li>
                  <li>item 3</li>
                </ul>
              </Sidebar>
            </Flex>
          )}
        </SidebarContext.Consumer>
      </div>
    </SidebarContextProvider>
  </ThemeProvider>
);

export const buttonProps = () => (
  <ThemeProvider>
    <SidebarContextProvider>
      <div style={{ border: '1px solid black' }}>
        <SidebarContext.Consumer>
          {({ SidebarToggle }) => (
            <Flex css={{ flexDirection: 'row', alignItems: 'start' }}>
              <SidebarToggle aria-label="click to expand/collapse" />
              <Sidebar title="Title">
                <ul>
                  <li>item 1</li>
                  <li>item 2</li>
                  <li>item 3</li>
                </ul>
              </Sidebar>
            </Flex>
          )}
        </SidebarContext.Consumer>
      </div>
    </SidebarContextProvider>
  </ThemeProvider>
);
