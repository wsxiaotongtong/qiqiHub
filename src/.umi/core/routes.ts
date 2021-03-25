// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/wangshun/Desktop/conclusion/node_modules/_@umijs_runtime@3.4.4@@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('/Users/wangshun/Desktop/conclusion/node_modules/_@umijs_preset-dumi@1.1.10@@umijs/preset-dumi/lib/theme/layout').default],
    "component": (props) => {
        const { default: getDemoRenderArgs } = require('/Users/wangshun/Desktop/conclusion/node_modules/_@umijs_preset-dumi@1.1.10@@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
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
    "wrappers": [require('/Users/wangshun/Desktop/conclusion/node_modules/_@umijs_preset-dumi@1.1.10@@umijs/preset-dumi/lib/theme/layout').default, require('/Users/wangshun/Desktop/conclusion/node_modules/_@umijs_preset-dumi@1.1.10@@umijs/preset-dumi/node_modules/dumi-theme-default/src/layout.tsx').default],
    "routes": [
      {
        "path": "/",
        "component": require('/Users/wangshun/Desktop/conclusion/src/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/index.md",
          "updatedTime": 1616479070349,
          "slugs": [
            {
              "depth": 1,
              "value": "Hello dumi!",
              "heading": "hello-dumi"
            }
          ],
          "title": "Hello dumi!"
        },
        "title": "Hello dumi!"
      },
      {
        "path": "/sud/123",
        "component": require('/Users/wangshun/Desktop/conclusion/src/sud/123.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/sud/123.md",
          "updatedTime": 1616478839773,
          "slugs": [
            {
              "depth": 1,
              "value": "Hello 123!",
              "heading": "hello-123"
            }
          ],
          "title": "Hello 123!",
          "group": {
            "path": "/sud",
            "title": "Sud"
          }
        },
        "title": "Hello 123!"
      },
      {
        "path": "/sud/234",
        "component": require('/Users/wangshun/Desktop/conclusion/src/sud/234.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/sud/234.md",
          "updatedTime": 1616478970512,
          "slugs": [],
          "title": "234",
          "group": {
            "path": "/sud",
            "title": "Sud"
          }
        },
        "title": "234"
      },
      {
        "path": "/sud copy/123",
        "component": require('/Users/wangshun/Desktop/conclusion/src/sud copy/123.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/sud copy/123.md",
          "updatedTime": 1616479053996,
          "slugs": [
            {
              "depth": 1,
              "value": "Hello 123!",
              "heading": "hello-123"
            }
          ],
          "title": "Hello 123!",
          "group": {
            "path": "/sud copy",
            "title": "Sud copy"
          }
        },
        "title": "Hello 123!"
      },
      {
        "path": "/sud copy/234",
        "component": require('/Users/wangshun/Desktop/conclusion/src/sud copy/234.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/sud copy/234.md",
          "updatedTime": 1616479053997,
          "slugs": [],
          "title": "234",
          "group": {
            "path": "/sud copy",
            "title": "Sud copy"
          }
        },
        "title": "234"
      },
      {
        "path": "/sud copy/sud/123",
        "component": require('/Users/wangshun/Desktop/conclusion/src/sud copy/sud/123.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/sud copy/sud/123.md",
          "updatedTime": 1616479056095,
          "slugs": [
            {
              "depth": 1,
              "value": "Hello 123!",
              "heading": "hello-123"
            }
          ],
          "title": "Hello 123!",
          "group": {
            "path": "/sud copy/sud",
            "title": "Sud copy/sud"
          }
        },
        "title": "Hello 123!"
      },
      {
        "path": "/sud copy/sud/234",
        "component": require('/Users/wangshun/Desktop/conclusion/src/sud copy/sud/234.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/sud copy/sud/234.md",
          "updatedTime": 1616479056096,
          "slugs": [],
          "title": "234",
          "group": {
            "path": "/sud copy/sud",
            "title": "Sud copy/sud"
          }
        },
        "title": "234"
      },
      {
        "path": "/sud copy 2/123",
        "component": require('/Users/wangshun/Desktop/conclusion/src/sud copy 2/123.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/sud copy 2/123.md",
          "updatedTime": 1616479058756,
          "slugs": [
            {
              "depth": 1,
              "value": "Hello 123!",
              "heading": "hello-123"
            }
          ],
          "title": "Hello 123!",
          "group": {
            "path": "/sud copy 2",
            "title": "Sud copy 2"
          }
        },
        "title": "Hello 123!"
      },
      {
        "path": "/sud copy 2/234",
        "component": require('/Users/wangshun/Desktop/conclusion/src/sud copy 2/234.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/sud copy 2/234.md",
          "updatedTime": 1616479058757,
          "slugs": [],
          "title": "234",
          "group": {
            "path": "/sud copy 2",
            "title": "Sud copy 2"
          }
        },
        "title": "234"
      },
      {
        "path": "/sud copy 3/123",
        "component": require('/Users/wangshun/Desktop/conclusion/src/sud copy 3/123.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/sud copy 3/123.md",
          "updatedTime": 1616479067737,
          "slugs": [
            {
              "depth": 1,
              "value": "Hello 123!",
              "heading": "hello-123"
            }
          ],
          "title": "Hello 123!",
          "group": {
            "path": "/sud copy 3",
            "title": "Sud copy 3"
          }
        },
        "title": "Hello 123!"
      },
      {
        "path": "/sud copy 3/234",
        "component": require('/Users/wangshun/Desktop/conclusion/src/sud copy 3/234.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/sud copy 3/234.md",
          "updatedTime": 1616479067738,
          "slugs": [],
          "title": "234",
          "group": {
            "path": "/sud copy 3",
            "title": "Sud copy 3"
          }
        },
        "title": "234"
      },
      {
        "path": "/sud copy 4/123",
        "component": require('/Users/wangshun/Desktop/conclusion/src/sud copy 4/123.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/sud copy 4/123.md",
          "updatedTime": 1616479068797,
          "slugs": [
            {
              "depth": 1,
              "value": "Hello 123!",
              "heading": "hello-123"
            }
          ],
          "title": "Hello 123!",
          "group": {
            "path": "/sud copy 4",
            "title": "Sud copy 4"
          }
        },
        "title": "Hello 123!"
      },
      {
        "path": "/sud copy 4/234",
        "component": require('/Users/wangshun/Desktop/conclusion/src/sud copy 4/234.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/sud copy 4/234.md",
          "updatedTime": 1616479068798,
          "slugs": [],
          "title": "234",
          "group": {
            "path": "/sud copy 4",
            "title": "Sud copy 4"
          }
        },
        "title": "234"
      },
      {
        "path": "/sud copy 5/123",
        "component": require('/Users/wangshun/Desktop/conclusion/src/sud copy 5/123.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/sud copy 5/123.md",
          "updatedTime": 1616479069438,
          "slugs": [
            {
              "depth": 1,
              "value": "Hello 123!",
              "heading": "hello-123"
            }
          ],
          "title": "Hello 123!",
          "group": {
            "path": "/sud copy 5",
            "title": "Sud copy 5"
          }
        },
        "title": "Hello 123!"
      },
      {
        "path": "/sud copy 5/234",
        "component": require('/Users/wangshun/Desktop/conclusion/src/sud copy 5/234.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/sud copy 5/234.md",
          "updatedTime": 1616479069439,
          "slugs": [],
          "title": "234",
          "group": {
            "path": "/sud copy 5",
            "title": "Sud copy 5"
          }
        },
        "title": "234"
      },
      {
        "path": "/sud",
        "meta": {},
        "exact": true,
        "redirect": "/sud/123"
      },
      {
        "path": "/sud copy",
        "meta": {},
        "exact": true,
        "redirect": "/sud copy/123"
      },
      {
        "path": "/sud copy/sud",
        "meta": {},
        "exact": true,
        "redirect": "/sud copy/sud/123"
      },
      {
        "path": "/sud copy 2",
        "meta": {},
        "exact": true,
        "redirect": "/sud copy 2/123"
      },
      {
        "path": "/sud copy 3",
        "meta": {},
        "exact": true,
        "redirect": "/sud copy 3/123"
      },
      {
        "path": "/sud copy 4",
        "meta": {},
        "exact": true,
        "redirect": "/sud copy 4/123"
      },
      {
        "path": "/sud copy 5",
        "meta": {},
        "exact": true,
        "redirect": "/sud copy 5/123"
      }
    ],
    "title": "dumi",
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
