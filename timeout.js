/*eslint-disable*/
 const timeout = (delay)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve();
        },delay)
    })
}

export default timeout;