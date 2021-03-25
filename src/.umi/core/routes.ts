// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/wangshun/Desktop/conclusion/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('/Users/wangshun/Desktop/conclusion/node_modules/@umijs/preset-dumi/lib/theme/layout').default],
    "component": (props) => {
        const { default: getDemoRenderArgs } = require('/Users/wangshun/Desktop/conclusion/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
        const { default: Previewer } = require('dumi-theme-default/src/builtins/Previewer.tsx');
        const { default: demos } = require('@@/dumi/demos');
        const { usePrefersColor } = require('dumi/theme');

        
      const renderArgs = getDemoRenderArgs(props, demos);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
        }
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [require('/Users/wangshun/Desktop/conclusion/node_modules/@umijs/preset-dumi/lib/theme/layout').default, require('/Users/wangshun/Desktop/conclusion/node_modules/dumi-theme-default/src/layout.tsx').default],
    "routes": [
      {
        "path": "/foo",
        "component": require('/Users/wangshun/Desktop/conclusion/src/Foo/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/Foo/index.md",
          "updatedTime": 1616660609507,
          "componentName": "Foo",
          "slugs": [
            {
              "depth": 2,
              "value": "Foo",
              "heading": "foo"
            }
          ],
          "title": "Foo",
          "group": {
            "path": "/foo",
            "title": "Foo"
          }
        },
        "title": "Foo"
      },
      {
        "path": "/",
        "component": require('/Users/wangshun/Desktop/conclusion/docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1616660609504,
          "slugs": [
            {
              "depth": 2,
              "value": "Hello docs!",
              "heading": "hello-docs"
            }
          ],
          "title": "Hello docs!"
        },
        "title": "Hello docs!"
      }
    ],
    "title": "docs",
    "component": (props) => props.children
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
