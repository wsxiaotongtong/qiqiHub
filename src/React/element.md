## ReactElement

`ReactElement`通过`createElement`创建时需要三个参数:

- type
- config
- children
  `type`指的是`ReactElement`的类型：
- 字符串类型`div`,`span`,`p`表示原生 DOM,称为`HostComponent`.
- Class 类型就是继承`React.Component(PureComponent)`的组件，称为`ClassComponent`.
- function 类型就是`functional Component`
- 还有其他 react 中写好的 Symbol,例如`Fragment`等，等等；

`config`里面包含的是组件上‘DOM’的属性,但是在源码中`key`和`ref`的处理和其他的并不相同,这两个会单独放在`ReactElement`，而其他的会放在 props 上面。

`ReactElement`上面有一个\$\$typeof，是一个常量`REACT_ELEMENT_TYPE`,但是如果是`ReactDOM.createPortal`的时候这个常量是`REACT_PORTAL_TYPE`,不过他不是`createElement`创建的,不属于`ReactElement`.

```
const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner,
  };
  return element;
};
export function createElement(type, config, children) {
  const props = {};
  for (propName in config) {
    props[propName] = config[propName]; //将属性放到props里除了key,ref
  }
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;//将children放到props里
  }
  return ReactElement(
    type,
    key, //key
    ref, //ref
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}
```

##### 总结

`createElement`根据参数创建`ReactElement`,babel 编译后`createElement`的会生成一个树结构.

`ReactElement`只是一个用来承载信息的容器，他会告诉后续的操作这个节点的以下信息：

- `type`类型，用于判断如何创建节点
- `key`和`ref`这些特殊信息
- `props`新的属性与 children
- `$$typeof`用于确定是否属于`ReactElement`

这些信息对于后期构建应用的树结构是非常重要的，_而 React 通过提供这种类型的数据，来脱离平台的限制_
