export function moveScroll(start, end, dok, prop) {
  let dis = 0;
  let speed = 5;
  const doms = dok;
  if (end < 0) {
    speed *= -1;
  }
  const t = setInterval(() => {
    dis += speed;
    doms[prop] = start + dis;
    if (Math.abs(dis) >= Math.abs(end)) {
      doms[prop] = start + end;
      clearInterval(t);
    }
  }, 2);
}
export function fe() {

}
