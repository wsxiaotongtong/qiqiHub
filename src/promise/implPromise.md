### 根据 Promise/A+ 规范实现 Promise

#### 1.Promise 状态

1. promise 有三种状态且必须是三种状态中的一种,等待态 pending,解决态 fulfilled 或拒绝态 rejected.
2. 当处于 pending 状态 可以变成 fulfilled 或 rejected 中的一种.
3. 当处于 fulfilled 状态 状态不允许改变 且有一个 value.
4. 当处于 rejected 状态 状态不允许改变 且有一个 reason.

**总结：状态只能从 pending 改变一次 且要给一个 value**

#### 2.then 方法

1. then 接收两个可选参数 onFulfilled,onRejected 且如果不是函数就要忽略(其实就是如果不是函数就给个默认函数).
2. onFulfilled/onRejected 必须在 promise 被解决/拒绝(reslove/reject)后执行且(reslove/reject)的值最为第一个参数.
3. 确保 onFulfilled 和 onRejected 异步地执行,并且应该在 then 方法被调用的那一轮事件循环之后用新的执行栈执行(创建一个宏任务 setTimeout).
4. 同一个 promise 上的 then 可能会被调用多次所以 onFulfilled/onRejected 要按照 then 的顺序执行(for 队列里都执行一遍).
5. then 必须返回一个 promise.

**总结：then 有两个参数且必须返回一个 promise，onFulfilled(onRejected)异步按顺序执行**

#### 3.Promise 解决程序 [[Resolve]](promise, x)

1. 如果 promise 和 x 是同一个对象,抛出 TypeError 使 promise 变成拒绝状态.
2. 如果 x 是 promise 且是 pending 那么 promise 保持等待直到解决或者拒绝,如果是 fulfilled/rejected 那么用相同的值/原因，解决/拒绝 promise.
3. 如果 x 是对象或者函数,将 x.then 赋值到 then.
   1. 如果 x.then 出错抛出异常 e,那么用 e 作为原因拒绝 promise.
   2. 如果 then 是一个函数，用 x 作为 this 调用它.then 方法的两个参数为 resolvePromise,rejectPromise,如果 resolvePromise 用一个值 y 调用，运行[[Resolve]](promise, y),因为 y 有可能还是 promise(递归获取不是 promise 的情况),如果 rejectPromise 用一个原因 r 调用，用 r 拒绝 promise.
4. resolvePromise,rejectPromise 两者只能调用一次,也就是说状态只能改变一次.
5. 如果调用 then 抛出异常 e,如果状态已经改变过一次(resolvePromise,rejectPromise 被调用过)则忽略,否则用 e 作为 reason 拒绝 promise.
6. 如果 then 不是一个函数或者对象，用 x 解决 promise。

**总结：x 是 promise 对象还是函数还是普通值进行不同处理**

#### 4.promise 实现

```
//promise有三种状态，所以
const PENDING = 'PENDING';
const RESLOVE = 'RESLOVE';
const REJECTED = 'REJECTED';
const resolvePromise = (promise2,x,reslove,reject) =>{
    if(promise2===x){
        return reject(new TypeError('Chaining cycle detected for promise #<Promise> --'))//满足3.1
    }
    let lock; //定义一个锁限制状态只能变一次 满足3.4
    if((typeof x === 'object' && x !== null)||typeof x === 'function'){ //
        try{
            let then = x.then; //满足3.3  then有可能是getter上定义的属性 也许就定义了throw Err
            if(typeof then === 'function'){ //满足3.3.2
                then.call(x,y=>{  //满足3.2 如果x的状态是pending就一直不执行这俩函数
                    if(lock)return;
                    lock = true;
                    resolvePromise(promise2,y,reslove,reject);//递归解析 直到不是promise而是普通值
                },r=>{
                    if(lock)return;
                    lock = true;
                    reject(r)
                })
            }else{  //{a:1,then:1} 这总情况
                reslove(x)
            }
        }catch(e){
            if(lock)return;  //满足3.5
            lock = true
            reject(e) //满足3.3.1
        }
    }else{
        reslove(x); //如果是普通值直接用x解决promise 满足3.6
    }
}
class MyPromise{
    constructor(executor){
        this.status = PENDING;
        this.value = undefined;//成功的值
        this.reason = undefined;//失败的原因
        this.onResolvedCallbacks = [];//存放成功的队列
        this.onRejectedCallbacks = [];//存放失败的队列
        const reslove = (value) =>{
            if(this.status===PENDING){  //限制状态只能改变一次
                this.status = RESLOVE;  //改变状态
                this.value = value;     //值
                this.onResolvedCallbacks.forEach(fn=>fn()); //一个promise掉多个then按顺序执行 同时满足2.4
            }
        }
        const reject = (reason) =>{
            if(this.status===PENDING){ //状态只能改变一次
                this.status = REJECTED;
                this.reason = reason;  //原因
                this.onRejectedCallbacks.forEach(fn=>fn());
            }
        }
        try{
            executor(reslove,reject)
        }catch(e){
            reject(e)
        }
    }
    catch(errCallback){
        return this.then(null,errCallback)
    }
    then(onFulfilled,onRejected){
        onFulfilled = typeof onFulfilled === 'function'?onFulfilled:v=>v; //满足2.1
        onRejected = typeof onRejected === 'function'?onRejected:e=>{throw e};
        let promise2 = new MyPromise((reslove,reject)=>{
            if(this.status === RESLOVE){
                setTimeout(() => { //下面和这个定时器一样 因为不加定时器promise2获取不到 满足2.3
                    try{
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2,x,reslove,reject);
                    }catch(e){
                        reject(e);
                    }
                },0)
            }
            if(this.status === REJECTED){
                setTimeout(() => {
                    try{
                        let x = onRejected(this.reason);
                        resolvePromise(promise2,x,reslove,reject);
                    }catch(e){
                        reject(e);
                    }
                },0)
            }
            if(this.status === PENDING){ //到这如果是pending状态,那么将函数存起来等状态改变后在执行 满足2.2
                this.onResolvedCallbacks.push(()=>{
                    setTimeout(() => {
                        try{
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2,x,reslove,reject);
                        }catch(e){
                            reject(e);
                        }
                    },0)
                })
                this.onResolvedCallbacks.push(()=>{
                    setTimeout(() => {
                        try{
                            let x = onRejected(this.value);
                            resolvePromise(promise2,x,reslove,reject);
                        }catch(e){
                            reject(e);
                        }
                    },0)
                })
            }
        })
        return promise2 //then 必须返回一个promise 满足2.5
    }

}
```

#### 5.测试 promise

```
<!-- npm install -g promises-aplus-tests -->
Promise.defer = Promise.deferred = function () {  //实现延迟对象
    let dfd = {}
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}
module.exports = Promise;
<!-- promises-aplus-tests ./文件名 -->
```
