import { isObject } from "@vue/shared"

const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  RAW = '__v_raw',
}

const reactiveMap = new WeakMap() // 用来存储对象和代理对象的对应关系

export function isReactive(value) {
  // 如果 value 是 proxy 的话
  // 会触发 get 操作，而在 createGetter 里面会判断
  // 如果 value 是普通对象的话
  // 那么会返回 undefined ，那么就需要转换成布尔值
  return !!value[ReactiveFlags.IS_REACTIVE];
}

export const reactive = (target) => {

  if (!isObject(target)) { // 如果不是对象，直接返回
    return target
  }

  if(target[ReactiveFlags.IS_REACTIVE]){ // 如果已经是响应式的了，直接返回
    return target
  }

  if (reactiveMap.has(target)) { // 如果已经代理过了，就直接返回代理后的对象
    return reactiveMap.get(target)
  }

  //生成代理对象
  const   observed = new Proxy(target, {
    get(target, key, receiver) { //拦截对象的属性的访问，并且把访问的属性的值返回给原对象 target是原对象，key是访问的属性，receiver是代理对象
      console.log('get',target, key, receiver); //监控对象的属性的访问
      if(key === ReactiveFlags.IS_REACTIVE) { //如果访问的是__v_isReactive属性，就返回true(表示是一个代理对象)
        return true
      } //如果访问的是__v_isReactive属性，就返回true

      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {//target是原对象，key是访问的属性，value是访问的属性的值
      console.log('set',target, key, value, receiver); //监控对象的属性的设置 

      return Reflect.set(target, key, value, receiver) 
    }
  })
  reactiveMap.set(target, observed) //把原对象和代理对象的对应关系存储起来
  return observed
}

const aaa= reactive({a:3})

