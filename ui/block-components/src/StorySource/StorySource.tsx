import React, { FC } from 'react';
import { LoadedComponentControls } from '@component-controls/core';
import { PrismTheme } from 'prism-react-renderer';

import dracula from 'prism-react-renderer/themes/dracula';
import duotoneDark from 'prism-react-renderer/themes/duotoneDark';
import duotoneLight from 'prism-react-renderer/themes/duotoneLight';
import github from 'prism-react-renderer/themes/github';
import nightowl from 'prism-react-renderer/themes/nightOwl';
import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';
import palenight from 'prism-react-renderer/themes/palenight';
import shadesOfPurple from 'prism-react-renderer/themes/shadesOfPurple';
import ultramin from 'prism-react-renderer/themes/ultramin';
import vsDark from 'prism-react-renderer/themes/vsDark';
import { mergeControlValues } from './argument-utils';
import { TaggedSource, TaggedSourceProps } from './TaggedSource';
export type ThemeType =
  | 'nightowl-light'
  | 'nightowl'
  | 'github'
  | 'vs-dark'
  | 'oceanic-next'
  | 'palenight'
  | 'ultramin'
  | 'duotone-light'
  | 'duotone-dark'
  | 'dracula'
  | 'shades-of-purple';
export const themes: {
  [key in ThemeType]: PrismTheme;
} = {
  'nightowl-light': nightOwlLight,
  nightowl,
  github,
  'vs-dark': vsDark,
  'oceanic-next': oceanicNext,
  palenight,
  ultramin,
  'duotone-light': duotoneLight,
  'duotone-dark': duotoneDark,
  dracula,
  'shades-of-purple': shadesOfPurple,
};

export type StorySourceProps = TaggedSourceProps & {
  /**
   * any control values to render in place of props in the editor
   */
  controls?: LoadedComponentControls;

  /**
   * full file source code of the file where the story was declared
   */
  fileSource?: string;
};

type ViewStyle = 'plain' | 'tags' | 'values';

export const StorySource: FC<StorySourceProps> = ({
  controls,
  fileSource,
  children,
  args,
  ...rest
}) => {
  const [viewStyle, setViewStyle] = React.useState<ViewStyle>('tags');
  const [showFileSource, setShowFileSource] = React.useState<boolean>(false);

  const onMergeValues = () =>
    setViewStyle(
      viewStyle === 'plain'
        ? 'tags'
        : viewStyle === 'tags' && !!controls && !!args
        ? 'values'
        : 'plain',
    );
  const onShowFileSource = () => setShowFileSource(!showFileSource);

  const actions = [];
  if (fileSource) {
    actions.push({
      title: showFileSource ? 'story code' : 'file code',
      onClick: onShowFileSource,
    });
  }
  if (args && args.length) {
    actions.push({ title: viewStyle, onClick: onMergeValues });
  }

  let source: string;
  if (!showFileSource) {
    let code = typeof children === 'string' ? children : '';
    if (viewStyle === 'values' && args && controls) {
      code = mergeControlValues(code, args, controls);
    }
    source = code;
  } else {
    source = fileSource || '';
  }
  return (
    <TaggedSource
      {...rest}
      args={viewStyle === 'tags' && !showFileSource ? args : undefined}
      actions={actions}
    >
      {source}
    </TaggedSource>
  );
};