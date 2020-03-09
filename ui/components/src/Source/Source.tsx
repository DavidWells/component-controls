/** @jsx jsx */
/* eslint react/jsx-key: 0 */
import { jsx } from 'theme-ui';
import React, { FC, MouseEvent } from 'react';
import copy from 'copy-to-clipboard';
import {
  SyntaxHighlighter,
  SyntaxHighlighterProps,
} from '../SyntaxHighlighter';
import { BlockContainer, BlockContainerProps } from '../BlockContainer';

export type SourceProps = SyntaxHighlighterProps & BlockContainerProps;
/**
 * Source component used to display source code
 *
 */
export const Source: FC<SourceProps> = ({
  children = '',
  actions,
  title,
  as = 'div',
  ...props
}) => {
  const [copied, setCopied] = React.useState(false);
  const onCopy = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCopied(true);
    copy(children as string);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const actionsItems = Array.isArray(actions) ? [...actions] : [];

  actionsItems.push({ title: copied ? 'copied' : 'copy', onClick: onCopy });
  return (
    <BlockContainer actions={actionsItems} title={title}>
      <SyntaxHighlighter
        as={as}
        {...props}
        style={{
          padding: '16px 10px 10px',
          display: 'block',
        }}
      >
        {children}
      </SyntaxHighlighter>
    </BlockContainer>
  );
};