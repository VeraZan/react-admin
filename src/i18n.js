import i18n from "i18next";
import zh_CNCommon from './locales/zh_CN/common';
import zh_CNMenu from './locales/zh_CN/menu';
import zh_CNProfile from './locales/zh_CN/account';

import { initReactI18next } from 'react-i18next';

i18n
.use(initReactI18next) //init i18next
.init({
  //引入资源文件
  resources: {
    zh_CN: {
      common: {// 这是namespace的名称
        ...zh_CNCommon, // 公共部分
        ...zh_CNProfile, // 注册登录
      },
      menu: {// 这是namespace的名称
        ...zh_CNMenu, // 左侧菜单
      },
    }
  },
  //选择默认语言，选择内容为上述配置中的key
  fallbackLng: "zh_CN",
  debug: false,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
})

export default i18n;