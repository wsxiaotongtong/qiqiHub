//promise有三种状态，所以
const PENDING = 'PENDING';
const RESLOVE = 'RESLOVE';
const REJECTED = 'REJECTED';
const resolvePromise = (promise2, x, reslove, reject) => {
  if (promise2 === x) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<Promise> --'),
    ); //满足3.1
  }
  let lock; //定义一个锁限制状态只能变一次 满足3.4
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    //
    try {
      let then = x.then; //满足3.3  then有可能是getter上定义的属性 也许就定义了throw Err
      if (typeof then === 'function') {
        //满足3.3.2
        then.call(
          x,
          y => {
            //满足3.2 如果x的状态是pending就一直不执行这俩函数
            if (lock) return;
            lock = true;
            resolvePromise(promise2, y, reslove, reject); //递归解析 直到不是promise而是普通值
          },
          r => {
            if (lock) return;
            lock = true;
            reject(r);
          },
        );
      } else {
        //{a:1,then:1} 这总情况
        reslove(x);
      }
    } catch (e) {
      if (lock) return; //满足3.5
      lock = true;
      reject(e); //满足3.3.1
    }
  } else {
    reslove(x); //如果是普通值直接用x解决promise 满足3.6
  }
};
class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined; //成功的值
    this.reason = undefined; //失败的原因
    this.onResolvedCallbacks = []; //存放成功的队列
    this.onRejectedCallbacks = []; //存放失败的队列
    const reslove = value => {
      if (this.status === PENDING) {
        //限制状态只能改变一次
        this.status = RESLOVE; //改变状态
        this.value = value; //值
        this.onResolvedCallbacks.forEach(fn => fn()); //一个promise掉多个then按顺序执行 同时满足2.4
      }
    };
    const reject = reason => {
      if (this.status === PENDING) {
        //状态只能改变一次
        this.status = REJECTED;
        this.reason = reason; //原因
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    try {
      executor(reslove, reject);
    } catch (e) {
      reject(e);
    }
  }
  catch(errCallback) {
    return this.then(null, errCallback);
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v; //满足2.1
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : e => {
            throw e;
          };
    let promise2 = new MyPromise((reslove, reject) => {
      if ((this.status = RESLOVE)) {
        setTimeout(() => {
          //下面和这个定时器一样 因为不加定时器promise2获取不到 满足2.3
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, reslove, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if ((this.status = REJECTED)) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, reslove, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if ((this.status = PENDING)) {
        //到这如果是pending状态,那么将函数存起来等状态改变后在执行 满足2.2
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, reslove, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.value);
              resolvePromise(promise2, x, reslove, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });
    return promise2; //then 必须返回一个promise 满足2.5
  }
}
