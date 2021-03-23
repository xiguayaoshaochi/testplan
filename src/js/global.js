
import cloudbase from "@cloudbase/js-sdk";



window.onload = function name(params) {
  document.getElementsByTagName('body')[0].style.opacity = 1;
}

export const app = cloudbase.init({
  env: "test-1gotf68l43775c18"
});

export const auth = app.auth({
  persistence: "local" //用户显式退出或更改密码之前的30天一直有效
});

