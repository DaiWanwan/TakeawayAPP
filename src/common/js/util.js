/**
 * Created by anthony on 2018/1/30.
 * 解析url参数
 * @example  ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse() {
  let url = window.location.search;  //  拿到字符串??id=12345&a=b
  let obj = {};
  //  匹配?id=12345&a=b,以?和&为分割，将其分割为两部分
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  //  arr=['?id=12345','&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
};
