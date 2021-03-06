// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/wangshun/Desktop/77Hub/qiqiHub/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('../dumi/layout').default],
    "component": ((props) => {
        const React = require('react');
        const { default: getDemoRenderArgs } = require('/Users/wangshun/Desktop/77Hub/qiqiHub/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
        const { default: Previewer } = require('dumi-theme-default/es/builtins/Previewer.js');
        const { usePrefersColor, context } = require('dumi/theme');

        
      const { demos } = React.useContext(context);
      const [renderArgs, setRenderArgs] = React.useState([]);

      // update render args when props changed
      React.useLayoutEffect(() => {
        setRenderArgs(getDemoRenderArgs(props, demos));
      }, [props.match.params.uuid, props.location.query.wrapper, props.location.query.capture]);

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
    
        })
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [require('../dumi/layout').default, require('/Users/wangshun/Desktop/77Hub/qiqiHub/node_modules/dumi-theme-default/es/layout.js').default],
    "routes": [
      {
        "path": "/react/element",
        "component": require('/Users/wangshun/Desktop/77Hub/qiqiHub/src/React/element.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/React/element.md",
          "updatedTime": 1617269408000,
          "slugs": [
            {
              "depth": 2,
              "value": "ReactElement",
              "heading": "reactelement"
            },
            {
              "depth": 5,
              "value": "??????",
              "heading": "??????"
            }
          ],
          "title": "ReactElement",
          "group": {
            "path": "/react",
            "title": "React"
          }
        },
        "title": "ReactElement - XTT"
      },
      {
        "path": "/react",
        "component": require('/Users/wangshun/Desktop/77Hub/qiqiHub/src/React/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/React/index.md",
          "updatedTime": 1616751089000,
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
        "title": "React API - XTT"
      },
      {
        "path": "/babel",
        "component": require('/Users/wangshun/Desktop/77Hub/qiqiHub/src/babel/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/babel/index.md",
          "updatedTime": 1628574786000,
          "slugs": [
            {
              "depth": 2,
              "value": "Babel",
              "heading": "babel"
            },
            {
              "depth": 4,
              "value": "?????????????????????",
              "heading": "?????????????????????"
            },
            {
              "depth": 4,
              "value": "babel ????????????",
              "heading": "babel-????????????"
            },
            {
              "depth": 4,
              "value": "AST ??????",
              "heading": "ast-??????"
            }
          ],
          "title": "Babel",
          "group": {
            "path": "/babel",
            "title": "Babel"
          }
        },
        "title": "Babel - XTT"
      },
      {
        "path": "/browser/macro-browser",
        "component": require('/Users/wangshun/Desktop/77Hub/qiqiHub/src/browser/macroBrowser.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/browser/macroBrowser.md",
          "updatedTime": 1647487537000,
          "slugs": [
            {
              "depth": 3,
              "value": "????????? \b",
              "heading": "?????????-"
            },
            {
              "depth": 4,
              "value": "????????????????????????",
              "heading": "????????????????????????"
            },
            {
              "depth": 4,
              "value": "TCP ??????",
              "heading": "tcp-??????"
            },
            {
              "depth": 5,
              "value": "??????????????? HTTP ??? TCP ????????????",
              "heading": "???????????????-http-???-tcp-?????????"
            },
            {
              "depth": 4,
              "value": "HTTP ????????????",
              "heading": "http-????????????"
            },
            {
              "depth": 4,
              "value": "URL ???????????????????????????????????????",
              "heading": "url-????????????????????????????????????"
            },
            {
              "depth": 5,
              "value": "????????????",
              "heading": "????????????"
            },
            {
              "depth": 5,
              "value": "URL ??????",
              "heading": "url-??????"
            },
            {
              "depth": 5,
              "value": "??????????????????",
              "heading": "??????????????????"
            },
            {
              "depth": 5,
              "value": "????????????",
              "heading": "????????????"
            },
            {
              "depth": 5,
              "value": "??????",
              "heading": "??????"
            }
          ],
          "title": "????????? \b",
          "group": {
            "path": "/browser",
            "title": "Browser"
          }
        },
        "title": "????????? \b - XTT"
      },
      {
        "path": "/leetcode",
        "component": require('/Users/wangshun/Desktop/77Hub/qiqiHub/src/leetcode/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/leetcode/index.md",
          "updatedTime": 1628574786000,
          "slugs": [
            {
              "depth": 2,
              "value": "Array",
              "heading": "array"
            },
            {
              "depth": 4,
              "value": "?????????",
              "heading": "?????????"
            },
            {
              "depth": 4,
              "value": "?????????????????????",
              "heading": "?????????????????????"
            },
            {
              "depth": 4,
              "value": "????????????",
              "heading": "????????????"
            },
            {
              "depth": 4,
              "value": "????????????",
              "heading": "????????????"
            },
            {
              "depth": 4,
              "value": "????????????",
              "heading": "????????????"
            }
          ],
          "title": "Array",
          "group": {
            "path": "/leetcode",
            "title": "Leetcode"
          }
        },
        "title": "Array - XTT"
      },
      {
        "path": "/leetcode/link",
        "component": require('/Users/wangshun/Desktop/77Hub/qiqiHub/src/leetcode/link.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/leetcode/link.md",
          "updatedTime": 1628574786000,
          "slugs": [
            {
              "depth": 2,
              "value": "LinkList",
              "heading": "linklist"
            },
            {
              "depth": 4,
              "value": "??????????????????????????????",
              "heading": "??????????????????????????????"
            },
            {
              "depth": 4,
              "value": "????????????",
              "heading": "????????????"
            },
            {
              "depth": 4,
              "value": "????????????",
              "heading": "????????????"
            }
          ],
          "title": "LinkList",
          "group": {
            "path": "/leetcode",
            "title": "Leetcode"
          }
        },
        "title": "LinkList - XTT"
      },
      {
        "path": "/leetcode/stack",
        "component": require('/Users/wangshun/Desktop/77Hub/qiqiHub/src/leetcode/stack.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/leetcode/stack.md",
          "updatedTime": 1628574786000,
          "slugs": [
            {
              "depth": 2,
              "value": "Stack",
              "heading": "stack"
            },
            {
              "depth": 4,
              "value": "???????????????",
              "heading": "???????????????"
            },
            {
              "depth": 4,
              "value": "???????????????",
              "heading": "???????????????-1"
            }
          ],
          "title": "Stack",
          "group": {
            "path": "/leetcode",
            "title": "Leetcode"
          }
        },
        "title": "Stack - XTT"
      },
      {
        "path": "/promise/impl-promise",
        "component": require('/Users/wangshun/Desktop/77Hub/qiqiHub/src/promise/implPromise.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/promise/implPromise.md",
          "updatedTime": 1617096626000,
          "slugs": [
            {
              "depth": 3,
              "value": "?????? Promise/A+ ???????????? Promise",
              "heading": "??????-promisea-????????????-promise"
            },
            {
              "depth": 4,
              "value": "1.Promise ??????",
              "heading": "1promise-??????"
            },
            {
              "depth": 4,
              "value": "2.then ??????",
              "heading": "2then-??????"
            },
            {
              "depth": 4,
              "value": "3.Promise ???????????? [[Resolve]](promise, x)",
              "heading": "3promise-????????????-resolvepromise-x"
            },
            {
              "depth": 4,
              "value": "4.promise ??????",
              "heading": "4promise-??????"
            },
            {
              "depth": 4,
              "value": "5.?????? promise",
              "heading": "5??????-promise"
            }
          ],
          "title": "?????? Promise/A+ ???????????? Promise",
          "group": {
            "path": "/promise",
            "title": "Promise"
          }
        },
        "title": "?????? Promise/A+ ???????????? Promise - XTT"
      },
      {
        "path": "/",
        "component": require('/Users/wangshun/Desktop/77Hub/qiqiHub/docs/index.md').default,
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
        "title": "Hello XTT! - XTT"
      },
      {
        "path": "/browser",
        "meta": {},
        "exact": true,
        "redirect": "/browser/macro-browser"
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
