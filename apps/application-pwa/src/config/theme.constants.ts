const THEME_STORAGE_KEY = 'aurum:theme'

const THEME_META_COLORS = {
  light: '#f7f7f7',
  dark: '#1f1f1f',
} as const

const THEME_INIT_SCRIPT = `(function(){try{var k='${THEME_STORAGE_KEY}';var s=localStorage.getItem(k);var t=s==='light'||s==='dark'?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(t);r.setAttribute('data-theme',t);r.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='dark'?'${THEME_META_COLORS.dark}':'${THEME_META_COLORS.light}');}catch(e){}})();`

export { THEME_INIT_SCRIPT, THEME_META_COLORS, THEME_STORAGE_KEY }
