import { observable, action, runInAction } from 'mobx';

const createLoading = target => {

	const instance = new target();

	const load = function (...arg){
		target.call(this,...arg);
		this.loading = observable({});

		const keys = Reflect.ownKeys(instance)
			.concat(Reflect.ownKeys(instance.__proto__))
			.filter(key=> typeof instance[key] === 'function' && key !== 'constructor');

		keys.forEach(key=>{
			const method = instance[key];
			this[key] = function(...args){
				const rtn = method(args);
				if(rtn instanceof Promise){
					return new Promise((resolve, reject) => {
						runInAction(()=>{
							this.loading[key] = true;
						});
						rtn.then(resolve)
							.catch(reject)
							.finally(() => {
								runInAction(()=>{
									this.loading[key] = false;
								});
							})
					})
				}else{
					return rtn
				}
			}
		});
	};

	load.prototype = instance;

	return load
};
