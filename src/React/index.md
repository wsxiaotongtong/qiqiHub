## React API

### React.Children

Reacr.Children 提供了一些处理 props.children 的方法 例如 map,forEach 等等

### React.createRef

react 创建 ref 的三种方式 string ref 将会移除 只能用以下两种方式

```
this.ref = React.createRef()
return <div ref={this.ref} />
// or
return <div ref={(node) => this.funRef = node} />
```

createRef 这个方法只返回了一个对象 里面有一个 current 属性

```
export function createRef() {
  const refObject = {
    current: null,
  };
  return refObject;
}
```

### Component & PureComponent

react 提供了两个 Base Class 其实就是继承的关系 唯一的区别就是在 PureComponent 上多了一个属性

`pureComponentPrototype.isPureReactComponent = true;`

如果组件的实例上有这个属性 就做了一层比较 源码实现：

```
if (ctor.prototype && ctor.prototype.isPureReactComponent) {
  return (
    !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
  );
}
```

### createContext

createContext 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。

```
const { Provider, Consumer } = React.createContext('defaultValue')

const ProviderComp = (props) => (
  <Provider value={'realValue'}>
  </Provider>
)
const ConsumerComp = () => (
  <Consumer>
    {(value) => <p>{value}</p>}
  </Consumber>
)
```

源码中 Provider 和 Consumer 都是引用同一 context:

```
context.Provider = {
  $$typeof: REACT_PROVIDER_TYPE,
  _context: context,
};
context.Consumer = context;
```

### createElement

createElement 是用来创建 ReactElement 的 但是在 react 中没有使用他的地方 其实他是在 jsx 编译完成 js 后才会出现

```
jsx
<div className='app'>
  <p>Hello world</p>
</div>

js
React.createElement("div", {
  className: "app"
}, React.createElement("p", null, "Hello world"));
```
