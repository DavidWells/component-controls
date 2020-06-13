/** @jsx jsx */
/* eslint react/jsx-key: 0 */
import { jsx } from 'theme-ui';
import { FC } from 'react';
import { Box, Text } from 'theme-ui';
import Octicon, { MarkGithub } from '@primer/octicons-react';
import { ExternalLink } from '@component-controls/components';
import { useStoryContext } from '../context';

/**
 * Display a Edit this page link at the top of the page.
 * In order for this to work, you need to set up the `repository` field in `package.json`.
 */
export const EditPage: FC = () => {
  const { docPackage } = useStoryContext({ id: '.' });
  return docPackage && docPackage.repository && docPackage.repository.browse ? (
    <Box variant="editpage.container">
      <ExternalLink
        href={docPackage.repository.browse}
        aria-label="edit this page"
      >
        <Box variant="editpage.inner">
          <Octicon icon={MarkGithub} />
          <Text variant="editpage.text">Edit this page</Text>
        </Box>
      </ExternalLink>
    </Box>
  ) : null;
};
