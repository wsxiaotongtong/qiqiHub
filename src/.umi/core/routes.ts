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
        "path": "/react",
        "component": require('/Users/wangshun/Desktop/conclusion/src/React/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/React/index.md",
          "updatedTime": 1616751089000,
          "componentName": "React",
          "slugs": [
            {
              "depth": 2,
              "value": "React API",
              "heading": "react-api"
            },
            {
              "depth": 3,
              "value": "React.Children",
              "heading": "reactchildren"
            },
            {
              "depth": 3,
              "value": "React.createRef",
              "heading": "reactcreateref"
            },
            {
              "depth": 3,
              "value": "Component & PureComponent",
              "heading": "component--purecomponent"
            },
            {
              "depth": 3,
              "value": "createContext",
              "heading": "createcontext"
            },
            {
              "depth": 3,
              "value": "createElement",
              "heading": "createelement"
            }
          ],
          "title": "React API",
          "group": {
            "path": "/react",
            "title": "React"
          }
        },
        "title": "React API"
      },
      {
        "path": "/promise/impl-promise",
        "component": require('/Users/wangshun/Desktop/conclusion/src/promise/implPromise.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/promise/implPromise.md",
          "updatedTime": 1617096427879,
          "slugs": [
            {
              "depth": 3,
              "value": "根据Promise/A+ 规范实现 Promise",
              "heading": "根据promisea-规范实现-promise"
            },
            {
              "depth": 4,
              "value": "1.Promise 状态",
              "heading": "1promise-状态"
            },
            {
              "depth": 4,
              "value": "2.then 方法",
              "heading": "2then-方法"
            },
            {
              "depth": 4,
              "value": "3.Promise 解决程序 [[Resolve]](promise, x)",
              "heading": "3promise-解决程序-resolvepromise-x"
            },
            {
              "depth": 4,
              "value": "4.promise实现",
              "heading": "4promise实现"
            },
            {
              "depth": 4,
              "value": "5.测试promise",
              "heading": "5测试promise"
            }
          ],
          "title": "根据Promise/A+ 规范实现 Promise",
          "group": {
            "path": "/promise",
            "title": "Promise"
          }
        },
        "title": "根据Promise/A+ 规范实现 Promise"
      },
      {
        "path": "/",
        "component": require('/Users/wangshun/Desktop/conclusion/docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1616751089000,
          "slugs": [
            {
              "depth": 2,
              "value": "Hello XTT!",
              "heading": "hello-xtt"
            }
          ],
          "title": "Hello XTT!"
        },
        "title": "Hello XTT!"
      },
      {
        "path": "/promise",
        "meta": {},
        "exact": true,
        "redirect": "/promise/impl-promise"
      }
    ],
    "title": "XTT",
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
