/*eslint-disable*/
/*
* 手机监听摇一摇动作
* */
const SHAKE_THRESHOLD = 2000;  //定义触发动作的阈值
let last_update = 0;         //上一次触发的时间
let x = 0, y = 0, z = 0, last_x = 0, last_y = 0, last_z = 0;//x,y,z当前加速度,last_z,last_x,last_y上次加速度
let num = 0;
let numMax = 3;
let callBack = ()=>{};

//监听摇一摇的动作
export function listenPhoneShake(fn) {
  callBack = fn;
  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', deviceMotionHandler,false);
    console.log("addEventListener devicemotion");
  } else {
    alert('抱歉，你的手机暂不支持摇一摇功能！');
  }
}

// --检测设备是否有摇一摇动作
function deviceMotionHandler(eventData) {
  const acceleration = eventData.accelerationIncludingGravity;
  const curTime = new Date().getTime();

  if ((curTime - last_update) > 100) {
    const diffTime = curTime - last_update;
    last_update = curTime;
    x = acceleration.x;
    y = acceleration.y;
    z = acceleration.z;
    const speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

    if (speed > SHAKE_THRESHOLD) {
      handelShakingMotion();
    }
    last_x = x;
    last_y = y;
    last_z = z;
  }
}

// 设备有摇一摇动作，则对页面已摇次数进行加1，若已经摇到最大次数numMax，则请求抢红包接口
function handelShakingMotion() {
  num++;
  if (num === numMax) {
    num = 0;
    callBack();
  }
}

export function removePhoneShake() {
  window.removeEventListener("devicemotion", deviceMotionHandler);
}
