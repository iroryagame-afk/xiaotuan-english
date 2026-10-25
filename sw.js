// 小团英语 · Service Worker：缓存应用外壳，词库单元按需缓存（相对路径，支持子目录部署）
const V="xt-v1",SHELL=["./","index.html","css/style.css","js/courses.js","js/resources.js","js/imported.js","js/app.js","manifest.json","icons/icon-192.png","icons/icon-512.png","icons/apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!=V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!="GET"||new URL(r.url).origin!=location.origin)return;
// 外壳：网络优先（保证更新），离线回退缓存；词库数据：缓存优先
const isData=r.url.includes("/data/");
e.respondWith(isData?caches.match(r).then(m=>m||fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put(r,c));return res})):
fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put(r,c));return res}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))))});
