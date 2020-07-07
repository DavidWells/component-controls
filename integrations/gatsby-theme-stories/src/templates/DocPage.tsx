import React, { FC } from 'react';
import { DocumentType } from '@component-controls/core';
import { DocPage } from '@component-controls/app';
import { Layout } from '../components/Layout';

interface DocPageProps {
  pathContext: {
    docId?: string;
    storyId?: string;
    type: DocumentType;
    activeTab?: string;
  };
}

const DocPageTemplate: FC<DocPageProps> = ({
  pathContext: { docId, storyId, type, activeTab },
}) => {
  return (
    <Layout docId={docId} storyId={storyId} type={type}>
      <DocPage activeTab={activeTab} type={type} />
    </Layout>
  );
};

export default DocPageTemplate;
