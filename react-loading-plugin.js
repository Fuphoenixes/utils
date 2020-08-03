import React, { Component, Fragment } from 'react';

const reactFunKeys = [
	'constructor',
	'componentWillMount',
	'UNSAFE_componentWillMount',
	'render',
	'componentDidMount',
	'componentWillReceiveProps',
	'UNSAFE_componentWillReceiveProps',
	'shouldComponentUpdate',
	'componentWillUpdate',
	'UNSAFE_componentWillUpdate',
	'componentDidUpdate',
	'componentWillUnmount',
	'getSnapshotBeforeUpdate'
];

const createLoading = WrappedComponent => class extends Component {
	constructor(props){
		super(props);
		this.state = {
			loading: {}
		};
		const that = this;
		const version = Number(React.version.split('.')[0] + '.' + React.version.split('.')[1]);
		const hookName = version >= 17 ? 'componentDidMount' : version < 16.3 ? 'componentWillMount' : 'UNSAFE_componentWillMount';
		const hookFun = WrappedComponent.prototype[hookName];
		WrappedComponent.prototype[hookName] = function() {
			const instance = this;
			const keys = Reflect.ownKeys(instance).concat(Reflect.ownKeys(instance.__proto__));
			const csmFunKeys = keys.filter(key=>!reactFunKeys.includes(key) && typeof instance[key] === 'function');
			csmFunKeys.forEach(key=>{
				const method = instance[key];
				instance[key] = function(...args){
					const rtn = method.apply(this,args);
					//监听异步函数
					if(rtn instanceof Promise){
						return new Promise((resolve, reject) => {
							that.state.loading[key] = true;
							this.setState({
								loading: that.state.loading
							});
							rtn.then(resolve)
								.catch(reject)
								.finally(() => {
									that.state.loading[key] = false;
									this.setState({
										loading: that.state.loading
									});
								})
						})
					}else{
						return rtn
					}
				}
			});
			hookFun && hookFun.call(this);
		};
	}

	render() {
		const { loading } = this.state;
		return (<WrappedComponent {...this.props} loading={loading}/>);
	}
};

export default createLoading;

// @createLoading
// class ReactComponent extends Component {
//   state = {};
//
//   componentDidMount(){
//     this.getData();
//   }
//
//   getList(){
//
//   }
//
//   getData = async ()=>{
//     const res = await timeout(2000);
//   };
//
//   render() {
//     const { loading } = this.props;
//     return (
//       <div>
//         <ActivityIndicator toast text="加载中..." animating={loading.getData}/>
//       </div>
//     );
//   }
// }
//
// export default ReactComponent;
