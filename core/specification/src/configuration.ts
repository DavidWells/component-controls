import { StoryRenderFn } from './utility';

/**
 * global configuration
 * stored in a file named main.js/main.ts
 */
export interface Configuration {
  /**
   * wild card search string for the stories
   * internally using `glob` for the search: https://www.npmjs.com/package/glob
   * example: "./stories/**/ /*.stories.(js|tsx|mdx)"
   */
  stories: string[];

  /**
   * story decorator functions - used to wrap stories
   * example: [story => <ThemeProvider>{story()}</ThemeProvider>]
   */
  decorators?: StoryRenderFn[];
}
