import { isObject } from "@vue/shared"
function createGet(readonly:boolean, shallow:boolean){
 function get(target, key, receiver) {
  return target[key]
  }
}
function createSet(readonly:boolean, shallow:boolean){
 
}
 const reactive = (target) => {
  if (!isObject(target)) {
    return target
  }
  //生成代理对象，代理对象的属性和原对象的属性一样，但是属性的值是一个函数，这个函数的作用是拦截对象的属性的访问，并且把访问的属性的值返回给原对象
  const observed = new Proxy(target, { 
    get(target, key, receiver) { //拦截对象的属性的访问，并且把访问的属性的值返回给原对象 target是原对象，key是访问的属性，receiver是代理对象
      console.log('get',target, key, receiver);
      
      return target[key]
    },
    set(target, key, value, receiver) {//target是原对象，key是访问的属性，value是访问的属性的值
      console.log('set',target, key, value, receiver);
      target[key] = value
      return true
    }
  })
  return observed
}

const aaa= reactive({a:3})
console.log(aaa.a);
aaa.a=4;

