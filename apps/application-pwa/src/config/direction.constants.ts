const DIRECTION_STORAGE_KEY = 'aurum:direction'
const DIRECTION_COOKIE_NAME = 'aurum_direction'
const DEFAULT_DIRECTION = 'rtl' as const

const DIRECTION_INIT_SCRIPT = `(function(){try{var k='${DIRECTION_STORAGE_KEY}';var c='${DIRECTION_COOKIE_NAME}';var d=localStorage.getItem(k);if(d!=='ltr'&&d!=='rtl'){var m=document.cookie.match(new RegExp('(?:^|; )'+c+'=([^;]+)'));d=m?decodeURIComponent(m[1]):'${DEFAULT_DIRECTION}';}if(d!=='ltr'&&d!=='rtl')d='${DEFAULT_DIRECTION}';var r=document.documentElement;r.dir=d;r.lang=d==='rtl'?'fa':'en';document.cookie=c+'='+d+'; path=/; max-age=31536000; SameSite=Lax';}catch(e){}})();`

export { DEFAULT_DIRECTION, DIRECTION_COOKIE_NAME, DIRECTION_INIT_SCRIPT, DIRECTION_STORAGE_KEY }
