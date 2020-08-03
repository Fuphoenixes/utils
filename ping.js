function request_image(url) {
  return new Promise(function (resolve, reject) {
    const img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function () {
      reject(url);
    };
    img.src = url + '?random-no-cache=' + Math.floor((1 + Math.random()) * 0x10000).toString(16);
  });
}

function ping(url, limit, multiplier) {
  return new Promise(function (resolve, reject) {
    if(!window.navigator.onLine){
      reject(Error('没有网络'))
    }
    const start = (new Date()).getTime();
    const response = function () {
      let delta = ((new Date()).getTime() - start);
      delta *= (multiplier || 1);
      resolve(delta);
    };
    request_image(url).then(response).catch(response);

    // Set a timeout for max-pings, 5s.
    setTimeout(function () {
      reject(Error('请求超时'));
    }, limit || 2000);
  });
}

export default ping