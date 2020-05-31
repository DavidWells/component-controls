import React, { FC, createContext, useEffect } from 'react';
import { Button, ButtonProps } from 'theme-ui';
import Octicon, { ThreeBars, X } from '@primer/octicons-react';
import { useBreakpointIndex } from '@theme-ui/match-media';

export type SidebarToggleProps = {
  icon?: React.ReactNode;
} & ButtonProps;

export interface SidebarContextProps {
  SidebarToggle: FC<SidebarToggleProps>;
  SidebarClose: FC<SidebarToggleProps>;
  collapsed?: boolean;
  collapsible?: boolean;
  responsive: boolean;
  setCollapsed: (value: boolean) => void;
}
export const SidebarContext = createContext<SidebarContextProps>({
  SidebarToggle: () => null,
  SidebarClose: () => null,
  setCollapsed: () => {},
  responsive: false,
});
export interface SidebarContextProviderProps {
  collapsible?: boolean;
}
export const SidebarContextProvider: FC<SidebarContextProviderProps> = ({
  children,
  collapsible = true,
}) => {
  const [collapsed, setCollapsed] = React.useState<boolean | undefined>(
    undefined,
  );
  const size: number = useBreakpointIndex();
  useEffect(() => {
    if (collapsible) {
      setCollapsed(size <= 1);
    }
  }, [size, collapsible]);

  const SidebarToggle: FC<SidebarToggleProps> = ({ icon, ...rest }) => {
    return collapsible ? (
      <Button
        aria-label={collapsed ? 'Expand side bar' : 'Collapse side bar'}
        onClick={() => setCollapsed(!collapsed)}
        sx={{
          background: 'none',
          boxShadow: 'none',
          cursor: 'pointer',
          color: 'text',
        }}
        {...rest}
      >
        {icon || <Octicon size="medium" icon={ThreeBars} />}
      </Button>
    ) : null;
  };

  const SidebarClose: FC<SidebarToggleProps> = ({ icon, ...rest }) => {
    return collapsible ? (
      <Button
        aria-label={collapsed ? 'Expand side bar' : 'Collapse side bar'}
        onClick={() => setCollapsed(true)}
        sx={{
          background: 'none',
          boxShadow: 'none',
          cursor: 'pointer',
          color: 'text',
        }}
        {...rest}
      >
        {icon || <Octicon size="medium" icon={X} />}
      </Button>
    ) : null;
  };
  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed,
        SidebarToggle,
        SidebarClose,
        collapsible,
        responsive: size <= 1,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
