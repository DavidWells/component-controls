import { StoriesGroup, Story, Stories } from '../types';
import traverse from '@babel/traverse';
import { extractFunctionParameters } from './get-function-parameters';
import { extractProperties } from './extract-properties';

export const extractCSFStories = (stories: StoriesGroup) => {
  const globals: Stories = {};
  const localStories: Stories = {};

  const extractArrowFunction = (
    path: any,
    declaration: any,
  ): Story | undefined => {
    if (
      declaration.init &&
      declaration.init.type === 'ArrowFunctionExpression'
    ) {
      const el = declaration.init.body;
      const name = declaration.id.name;
      const story: Story = {
        source: {
          start: {
            column: el.loc.start.column,
            line: el.loc.start.line,
          },
          end: {
            column: el.loc.end.column,
            line: el.loc.end.line,
          },
        },
      };
      story.name = name;
      traverse(path.node, extractFunctionParameters(story), path.scope, path);
      return story;
    }
    return undefined;
  };
  return {
    ExportDefaultDeclaration: (path: any) => {
      const { declaration } = path.node;
      const properties = extractProperties(declaration);
      stories.properties = properties;

      const title = properties
        ? properties.find(p => p.name === 'title')
        : null;
      stories.title =
        title && typeof title.value === 'string' ? title.value : undefined;
    },
    AssignmentExpression: (path: any) => {
      const node = path.node;
      if (
        node.left.type === 'MemberExpression' &&
        node.left.property.type === 'Identifier' &&
        node.left.property.name === 'story' &&
        node.right.type === 'ObjectExpression'
      ) {
        const storyName = node.left.object.name;
        const properties = extractProperties(node.right);
        const nameProp = properties
          ? properties.find(p => p.name === 'name')
          : null;
        const name = nameProp ? nameProp.value : storyName;
        globals[storyName] = {
          properties,
          name,
        };
        const story = stories.stories[storyName];

        if (story) {
          story.name = name;
          story.properties = properties;
        }
      }
    },
    VariableDeclaration: (path: any) => {
      const { declarations } = path.node;
      if (Array.isArray(declarations) && declarations.length > 0) {
        const declaration = declarations[0];
        if (declaration) {
          const name = declaration.id.name;
          //check if it was a named export
          if (!stories.stories[name]) {
            const story = extractArrowFunction(path, declaration);
            if (story && story.name) {
              localStories[story.name] = story;
            }
          }
        }
      }
    },
    ExportSpecifier: (path: any) => {
      const { node } = path;
      const localName = node.local.name;
      const exportedName = node.exported.name;
      const story = localStories[localName];
      if (story) {
        const global = globals[localName];
        if (global) {
          story.name = global.name;
          story.properties = global.properties;
        }
        stories.stories[exportedName] = story;
      }
    },
    ExportNamedDeclaration: (path: any) => {
      const { declaration } = path.node;
      if (declaration) {
        const { declarations } = declaration;
        if (Array.isArray(declarations) && declarations.length > 0) {
          const story = extractArrowFunction(path, declarations[0]);
          if (story) {
            const name = story.name || '';
            const global = globals[name];
            if (global) {
              story.name = global.name;
              story.properties = global.properties;
            }
            stories.stories[name] = story;
          }
        }
      }
    },
  };
};
