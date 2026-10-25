// 小团英语 · 前端逻辑
(()=>{
const isTouch=matchMedia("(hover:none) and (pointer:coarse)").matches;document.documentElement.classList.toggle("touch",isTouch);
const $=s=>document.querySelector(s),M=$("#main"),esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
// 本地存储（前缀 xt_），并迁移旧版本前缀 yt_ 的数据
try{Object.keys(localStorage).filter(k=>k.startsWith("yt_")).forEach(k=>{const n="xt_"+k.slice(3);if(localStorage.getItem(n)==null)localStorage.setItem(n,localStorage.getItem(k));localStorage.removeItem(k)})}catch(e){}
const S={get:(k,d)=>{try{return JSON.parse(localStorage.getItem("xt_"+k))??d}catch(e){return d}},set:(k,v)=>localStorage.setItem("xt_"+k,JSON.stringify(v))};
window.YT_DATA=window.YT_DATA||{};
const bookOf=id=>BOOKS.find(b=>b.id==id);
function byId(id){const c=COURSES.find(c=>c.id==id);if(c)return c;const m=/^(.+)_(\d+)$/.exec(id||""),b=m&&bookOf(m[1]);if(!b||!b.units[m[2]-1])return null;const k=+m[2];return {id,book:b,unit:k,title:`${b.title} · 第${k}单元`,en:b.en+" · Unit "+k,cat:b.cat,sub:b.sub,type:b.type,c:b.c,n:b.units[k-1],items:YT_DATA[id]||null}}
const isLoaded=id=>COURSES.some(c=>c.id==id)||!!YT_DATA[id];
function need(ids,cb){ids=[...new Set(ids)].filter(i=>byId(i)&&!isLoaded(i));if(!ids.length)return cb();let left=ids.length,fail=0;M.innerHTML='<p class="hint" style="margin-top:60px">正在加载词库，请稍候…</p>';
ids.forEach(i=>{const t=document.createElement("script");t.src="data/"+i+".js";t.onload=()=>{--left||done()};t.onerror=()=>{fail++;--left||done()};document.body.appendChild(t)});function done(){fail?M.innerHTML='<p class="hint" style="margin-top:60px">词库文件加载失败，请确认 data 文件夹完整后刷新页面。</p>':cb()}}
const cntOf=c=>c.items?c.items.length:c.n;
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("show");clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove("show"),1600)}
// ---- 发音：句子优先本地真人级录音，单词用有道真人发音；失败或 3 秒未开始时依次回退（有道 → 系统语音）
const VOICE_PREF=["Samantha","Ava","Allison","Google US English","Microsoft Aria","Jenny","Natural","Enhanced","Premium"];
let voice=null;function pickVoice(){if(!("speechSynthesis" in window))return;const v=speechSynthesis.getVoices(),us=v.filter(x=>/en[-_]US/i.test(x.lang)),en=v.filter(x=>/^en/i.test(x.lang));const score=x=>{let s=0;VOICE_PREF.forEach((p,k)=>{if(x.name.includes(p))s=Math.max(s,100-k)});if(/Natural|Enhanced|Premium/i.test(x.name))s+=50;return s};voice=[...us].sort((a,b)=>score(b)-score(a))[0]||en[0]||null}
if("speechSynthesis" in window){pickVoice();speechSynthesis.onvoiceschanged=pickVoice}
const xa=document.createElement("audio");xa.id="xa";xa.preload="auto";document.body.appendChild(xa);let sayTok=0;
function tts(t,rate){if(!("speechSynthesis" in window))return toast("当前浏览器不支持语音朗读，请使用 Chrome / Edge / Safari");speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang="en-US";u.rate=rate&&rate<1?0.7:0.92;if(voice)u.voice=voice;speechSynthesis.speak(u)}
function sayHint(t,rate){let h=$("#sayhint");if(!h){h=document.createElement("button");h.id="sayhint";h.className="sayhint";document.body.appendChild(h)}h.textContent="🔊 点击朗读";h.onclick=()=>{h.classList.remove("show");speak(t,rate)};h.classList.add("show");clearTimeout(h._t);h._t=setTimeout(()=>h.classList.remove("show"),6000)}
// 发音模式：f=美音女声（默认，本地真人级录音）/ m=美音男声 / uk=英音（有道）/ sys=系统语音；句子优先本地 audio/，单词用有道
function vmode(){let v=S.get("voice","f");if(v=="us"){v="f";S.set("voice",v)}return v}
function speak(t,rate,auto){const tok=++sayTok,mode=vmode();xa.pause();if("speechSynthesis" in window)speechSynthesis.cancel();const hh=$("#sayhint");if(hh)hh.classList.remove("show");
if(mode=="sys")return tts(t,rate);
const sent=/\s/.test(t.trim()),A=window.AUDIO_H||{},e=A[t],urls=[];
if(sent&&(mode=="f"||mode=="m")&&e){const v=(e[1]&(mode=="f"?1:2))?mode:(e[1]&1?"f":e[1]&2?"m":"");if(v)urls.push(`audio/${v}/${e[0]}.mp3`)}
urls.push(`https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(t)}&type=${mode=="uk"?1:2}`);
let k=0,started=false,timer=0;const rt=rate&&rate<1?0.75:1;
const fb=()=>{if(tok!=sayTok||started)return;clearTimeout(timer);if(++k<urls.length)return tryUrl();started=true;xa.pause();tts(t,rate)};
function tryUrl(){if(tok!=sayTok)return;xa.src=urls[k];xa.playbackRate=rt;xa.defaultPlaybackRate=rt;xa.onerror=()=>fb();timer=setTimeout(fb,3000);xa.onplaying=()=>{if(tok==sayTok){started=true;clearTimeout(timer)}};
const p=xa.play();if(p&&p.catch)p.catch(e=>{if(tok!=sayTok)return;if(e&&e.name=="NotAllowedError"){clearTimeout(timer);started=true;sayHint(t,rate)}else fb()})}
tryUrl()}
// ---- progress / lists
const prog=id=>S.get("prog",{})[id]||[];
function markDone(id,i){const td=new Date().toDateString(),dl=S.get("days",[]);if(!dl.includes(td))S.set("days",[...dl,td].slice(-400));const t=S.get("today",{d:td,n:0});S.set("today",t.d==td?{d:td,n:t.n+1}:{d:td,n:1});const p=S.get("prog",{});p[id]=[...new Set([...(p[id]||[]),i])];S.set("prog",p);S.set("last",{...S.get("last",{}),[id]:i})}
const pct=c=>Math.round(prog(c.id).length/cntOf(c)*100)||0;
const bookPct=b=>Math.round(b.units.reduce((a,n,k)=>a+prog(b.id+"_"+(k+1)).length,0)/b.n*100)||0;
function addHist(c,mode){const h=S.get("hist",[]).filter(x=>!(x.id==c.id&&x.mode==mode));h.unshift({id:c.id,mode,t:Date.now()});S.set("hist",h.slice(0,50))}
const key=(c,i)=>c.id+":"+i;
function toggle(list,c,i){const l=S.get(list,[]),k=key(c,i),on=l.includes(k);S.set(list,on?l.filter(x=>x!=k):[...l,k]);toast(on?"已移除":(list=="fav"?"已收藏 ⭐":"已加入生词本 📒"));return !on}
const has=(list,c,i)=>S.get(list,[]).includes(key(c,i));
// ---- theme / drawer
// ---- 主题切换（多邻国风 / 极简高级风 / 清新温暖风 / 深色科技风）
const THEMES=[["duolingo","多邻国风","#58CC02"],["minimal","极简高级风","#4F46E5"],["warm","清新温暖风","#C8664A"],["tech","深色科技风","#22D3EE"]];
if(!S.get("theme",null)&&S.get("dark",false))S.set("theme","tech");
function setTheme(t){if(!THEMES.some(x=>x[0]==t))t="duolingo";document.documentElement.dataset.theme=t;S.set("theme",t);document.querySelectorAll("[data-th]").forEach(b=>b.classList.toggle("on",b.dataset.th==t))}
const thMenu=THEMES.map(([k,n,c])=>`<button data-th="${k}"><i style="background:${c}"></i>${n}</button>`).join("");
$("#thmenu").innerHTML=`<div class="thttl">选择主题风格</div>`+thMenu;$("#thsheet").innerHTML=thMenu;
document.querySelectorAll("[data-th]").forEach(b=>b.onclick=()=>{setTheme(b.dataset.th);$("#thmenu").classList.remove("open");toast("已切换为「"+b.textContent+"」")});
$("#theme").onclick=e=>{e.stopPropagation();$("#thmenu").classList.toggle("open")};document.addEventListener("click",e=>{if(!e.target.closest("#thmenu"))$("#thmenu").classList.remove("open")});
setTheme(S.get("theme","duolingo"));
const drawer=o=>{$("#side").classList.toggle("open",o);$("#mask").classList.toggle("open",o)};$("#ham").onclick=()=>drawer(!$("#side").classList.contains("open"));$("#mask").onclick=()=>drawer(false);
// ---- sidebar tree
let filt={cat:null,sub:null},closed=S.get("closed",[]);
function tree(){const cnt=(k,v)=>COURSES.filter(c=>c[k]==v).reduce((a,c)=>a+c.items.length,0)+BOOKS.filter(b=>b[k]==v).reduce((a,b)=>a+b.n,0);
const has=g=>cnt("cat",g.name)>0,subsOf=g=>g.subs.filter(x=>COURSES.some(c=>c.cat==g.name&&c.sub==x)||BOOKS.some(b=>b.cat==g.name&&b.sub==x));
$("#side").innerHTML=`<div class="tree"><div class="ttl">分类</div><div class="cat ${!filt.cat?"on":""}" data-all><span>全部</span><span class="n">${COURSES.reduce((a,c)=>a+c.items.length,0)+BOOKS.reduce((a,b)=>a+b.n,0)}</span></div>`+CATS.filter(has).map(g=>{const ss=subsOf(g);return `<div class="${closed.includes(g.name)?"closed":""}"><div class="cat ${filt.cat==g.name&&!filt.sub?"on":""}" data-cat="${g.name}"><span>${g.hot?"🔥":""}${g.name}</span><span class="n">${cnt("cat",g.name)}${ss.length?`<span class="arr" data-tog="${g.name}">›</span>`:`<span class="arr sp"></span>`}</span></div>${ss.length?`<div class="subs">${ss.map(x=>`<div class="sub ${filt.sub==x?"on":""}" data-cat="${g.name}" data-sub="${x}"><span>${x}</span><span class="n">${cnt("sub",x)}</span></div>`).join("")}</div>`:""}</div>`}).join("")+`</div>`;
$("#side").querySelectorAll("[data-tog]").forEach(e=>e.onclick=ev=>{ev.stopPropagation();const n=e.dataset.tog;closed=closed.includes(n)?closed.filter(x=>x!=n):[...closed,n];S.set("closed",closed);tree()});
$("#side").querySelectorAll(".cat,.sub").forEach(e=>e.onclick=()=>{filt=e.dataset.all!==undefined?{cat:null,sub:null}:{cat:e.dataset.cat,sub:e.dataset.sub||null};drawer(false);const r=location.hash.split("/")[1];if(!["","words","sentences"].includes(r||""))location.hash="#/";else render();tree()})}
// ---- cards
const CI=CATS.map(g=>g.name),ICONS={"零基础英语":"🌱","实用英语":"💬","场景主题":"🏢","商务职场":"💼","新概念英语":"📘","医学类词库":"🩺","成人自考":"📗","全国英语等级":"🏅","小初高":"🎒","大学":"🎓","专升本":"📈","考研":"📝","剑桥":"🏰","雅思":"🌍"};
const ci=cat=>Math.max(0,CI.indexOf(cat))%6,icon=cat=>ICONS[cat]||"📚";
function card(c){const p=pct(c),st=p>0;return `<div class="course" data-t="${esc(c.title+c.en+c.sub)}"><div class="cover cv${ci(c.cat)}"><span class="ic">${icon(c.cat)}</span><span class="ty">${c.type=="s"?"句子":"单词"}</span><div class="zh">${c.title}</div><div class="en">${c.en}</div></div>
<div class="cbody"><div class="meta"><span>${cntOf(c)}${c.type=="s"?"句":"词"} · ${c.sub}</span><span class="stars">${c.rating?"★ "+c.rating:""}</span></div><div class="bar"><i style="width:${p}%"></i></div><div class="meta"><span>学习进度 ${p}%</span></div>
<div class="btns"><a class="btn" href="#/dict/${c.id}" style="text-align:center">${st?"已在学习":"开始学习"}</a>${c.type=="w"?`<a class="btn o" href="#/card/${c.id}" style="text-align:center">闪卡</a>`:`<a class="btn o" href="#/shadow/${c.id}" style="text-align:center">进入视频集</a>`}</div></div></div>`}
function bookCard(b){const p=bookPct(b);return `<div class="course" data-t="${esc(b.title+b.en+b.sub)}"><div class="cover cv${ci(b.cat)}"><span class="ic">${icon(b.cat)}</span><span class="ty">词库 · ${b.type=="s"?"句子":"单词"}</span><div class="zh">${b.title}</div><div class="en">${b.en}</div></div>
<div class="cbody"><div class="meta"><span>${b.n}${b.type=="s"?"句":"词"} · ${b.units.length}个单元</span><span class="stars"></span></div><div class="bar"><i style="width:${p}%"></i></div><div class="meta"><span>学习进度 ${p}%</span></div>
<div class="btns"><a class="btn" href="#/book/${b.id}" style="text-align:center">${p?"已在学习":"开始学习"}</a></div></div></div>`}
function blist(type){return BOOKS.filter(c=>(!type||c.type==type)&&(!filt.cat||c.cat==filt.cat)&&(!filt.sub||c.sub==filt.sub))}
function list(type){return COURSES.filter(c=>(!type||c.type==type)&&(!filt.cat||c.cat==filt.cat)&&(!filt.sub||c.sub==filt.sub))}
function streak(){const dl=new Set(S.get("days",[]));let n=0,d=new Date();if(!dl.has(d.toDateString()))d.setDate(d.getDate()-1);while(dl.has(d.toDateString())){n++;d.setDate(d.getDate()-1)}return n}
function greet(){const h=new Date().getHours();return h<6?"夜深了，注意休息":h<11?"早上好":h<13?"中午好":h<18?"下午好":"晚上好"}
function bindSearch(){const q=$("#cq");if(!q)return;q.oninput=()=>{const v=q.value.trim().toLowerCase();M.querySelectorAll("#cg .course").forEach(c=>c.style.display=!v||(c.dataset.t||"").toLowerCase().includes(v)?"":"none")}}
// ---- views
const V={};
V[""]=()=>{const tot=COURSES.reduce((a,c)=>a+c.items.length,0)+BOOKS.reduce((a,b)=>a+b.n,0),done=Object.values(S.get("prog",{})).reduce((a,l)=>a+l.length,0),acc=S.get("acc",{ok:0,bad:0}),h=S.get("hist",[]);
const L=list(),BL=blist();const td=S.get("today",{}),todayN=td.d==new Date().toDateString()?td.n:0,last=h[0]&&byId(h[0].id);
M.innerHTML=`<div class="hero"${filt.cat?' style="display:none"':""}><div class="goal" style="--p:${Math.min(100,Math.round(todayN/20*100))}"><div class="ring"><b>${todayN}</b><span>/ 20</span></div><div class="gl">今日目标</div></div><div class="hi">👋 ${greet()}，欢迎来到小团英语</div><h1>每天一点点，英语稳稳进步</h1><p>${COURSES.length} 门原创课程 + ${BOOKS.length} 本精选词库，共 ${tot.toLocaleString()} 句/词。看中文、听英文、逐词听写，练出真实语感。</p>
<div class="stats"><div><b>🔥 ${streak()}</b>连续学习(天)</div><div><b>${todayN}</b>今日已学</div><div><b>${done}</b>累计完成</div><div><b>${acc.ok+acc.bad?Math.round(acc.ok/(acc.ok+acc.bad)*100):0}%</b>总正确率</div><div><b>${S.get("vocab",[]).length}</b>生词本</div></div>
<a class="cta btn" href="${last?(last.book?"#/book/"+last.book.id:"#/dict/"+last.id):"#/dict/daily"}">${last?"▶ 继续学习："+(last.book?last.book.title:last.title):"▶ 从日常口语开始"}</a></div>
${h.length&&!filt.cat?`<h2>📌 继续学习</h2><div class="grid" style="margin-bottom:26px">${h.slice(0,4).map(x=>byId(x.id)).filter(Boolean).map(card).join("")}</div>`:""}
<input class="search" id="cq" placeholder="搜索课程" autocomplete="off"><h2>${filt.sub||filt.cat||"全部课程"} <span style="color:var(--m);font-size:14px">(${L.length+BL.length})</span></h2><div class="grid" id="cg">${L.map(card).join("")+BL.map(bookCard).join("")||"<p>该分类暂无课程，请在左侧选择其他分类。</p>"}</div>${FOOT}`};
V.words=()=>{const L=list("w"),BL=blist("w");M.innerHTML=`<h2>📖 单词中心 <span style="color:var(--m);font-size:14px">(${L.length+BL.length})</span></h2><p style="color:var(--m)">听写拼写、翻转闪卡、拼写测验。</p><input class="search" id="cq" placeholder="搜索课程" autocomplete="off"><div class="grid" id="cg">${L.map(card).join("")+BL.map(bookCard).join("")||"<p>该分类暂无单词课程，请在左侧选择其他分类。</p>"}</div>${FOOT}`};
V.sentences=()=>{const L=list("s"),BL=blist("s");M.innerHTML=`<h2>💬 句子中心 <span style="color:var(--m);font-size:14px">(${L.length+BL.length})</span></h2><p style="color:var(--m)">逐词听写，听懂每一个词。</p><input class="search" id="cq" placeholder="搜索课程" autocomplete="off"><div class="grid" id="cg">${L.map(card).join("")+BL.map(bookCard).join("")||"<p>该分类暂无句子课程，请在左侧选择其他分类。</p>"}</div>${FOOT}`};
const FOOT=``;
V.book=id=>{const b=bookOf(id);if(!b)return V[""]();M.innerHTML=`<div class="crumb" style="color:var(--m);margin-bottom:10px"><a href="#/">首页</a> / ${b.cat} / ${b.sub}</div><h2>${b.title} <span style="color:var(--m);font-size:14px">${b.n}${b.type=="s"?"句":"词"} · 每单元约50${b.type=="s"?"句":"词"} · 总进度 ${bookPct(b)}%</span></h2>
<div class="grid">${b.units.map((n,k)=>{const c=byId(b.id+"_"+(k+1)),p=pct(c);return `<div class="course"><div class="cover sm cv${ci(b.cat)}"><div class="zh">第 ${k+1} 单元</div><div class="en">Unit ${k+1}</div></div><div class="cbody"><div class="meta"><span>${n}${b.type=="s"?"句":"词"}</span><span>学习进度 ${p}%</span></div><div class="bar"><i style="width:${p}%"></i></div><div class="btns"><a class="btn" style="text-align:center" href="#/dict/${c.id}">听写</a>${b.type=="w"?`<a class="btn o" style="text-align:center" href="#/card/${c.id}">闪卡</a>`:`<a class="btn o" style="text-align:center" href="#/shadow/${c.id}">跟读</a>`}</div></div></div>`}).join("")}</div>${FOOT}`};
// ---- 题目顺序：随机（默认，优先未完成）/ 顺序
function shuf(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function mkOrd(c){const n=c.items.length,all=[...Array(n).keys()],done=new Set(prog(c.id));if(S.get("order","rand")=="seq"){const f=all.findIndex(k=>!done.has(k));return f>0?[...all.slice(f),...all.slice(0,f)]:all}return [...shuf(all.filter(k=>!done.has(k))),...shuf(all.filter(k=>done.has(k)))]}
const ordBtn=()=>`<button class="ordbtn" id="ordt" title="切换题目顺序">${S.get("order","rand")=="seq"?"🔢 顺序":"🔀 随机"}</button>`;
function bindOrd(re){const b=$("#ordt");if(b)b.onclick=()=>{const v=S.get("order","rand")=="seq"?"rand":"seq";S.set("order",v);toast(v=="seq"?"已切换为顺序练习":"已切换为随机练习");re()}}
// ---- dictation
let D=null;
const norm=w=>w.toLowerCase().replace(/[’]/g,"'").replace(/[^a-z0-9'\-]/g,"");
const toks=t=>t.split(/\s+/).filter(w=>norm(w));
V.dict=id=>{const c=byId(id);if(!c||!c.items)return V[""]();addHist(c,"听写");D={c,ord:mkOrd(c),i:0,ok:0,bad:0,done:false};drawD()};
function drawD(){const c=D.c,i=D.ord[D.i],it=c.items[i],w=toks(it.en),acc=D.ok+D.bad?Math.round(D.ok/(D.ok+D.bad)*100):0;D.done=false;
M.innerHTML=`<div class="panel"><div class="ptop"><div class="crumb dh"><a class="back" href="${c.book?"#/book/"+c.book.id:"#/"}">← 返回</a><b>听写练习</b><span>${esc(c.title)}</span></div><div class="pstat"><span>第<b>${D.i+1}</b>题/共${c.items.length}题</span><span>已答对 <b class="ok">${D.ok}</b></span><span>已答错 <b class="bad">${D.bad}</b></span><span>实时正确率 <b>${acc}%</b></span>${ordBtn()}</div></div>
<div class="bar"><i style="width:${(i+1)/c.items.length*100}%"></i></div>
<div class="zh-big">${esc(it.zh)}</div><div class="hint">${c.type=="w"?(esc(it.ph)||"")+"（共 "+w.length+" 个词）":"共 "+w.length+" 个单词"}</div>
<div class="blanks">${w.map((x,k)=>`<input data-k="${k}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" inputmode="text" enterkeyhint="next" style="width:${Math.max(3,norm(x).length+1.5)}ch">`).join("")}</div>
<div class="answer" id="ans"></div>
<div class="tools"><button class="btn o" id="slow">🐢 慢速朗读</button><button class="btn o" id="show">👁 显示答案</button><button class="btn o" id="voc">${has("vocab",c,i)?"📒 已在生词本":"📒 加入生词本"}</button></div>
<div class="dbar"><button id="prev">上一题<span class="kb"><kbd>Shift</kbd>+<kbd>←</kbd></span></button><button id="hintb">提示<span class="kb"><kbd>Space</kbd></span></button><button id="play">朗读<span class="kb"><kbd>Ctrl</kbd></span></button><button id="sub" class="pri">提交<span class="kb"><kbd>Enter</kbd></span></button><button id="fav">${has("fav",c,i)?"★ 已收藏":"☆ 收藏"}</button><button id="next">下一题<span class="kb"><kbd>Shift</kbd>+<kbd>→</kbd></span></button></div>
<p class="keys">提示：输入框为空时按 Space 提示（显示该词答案）；输入单词后按 Space 检查并跳到下一个词；Backspace 可退回上一个词。</p></div></div>`;
const ins=[...M.querySelectorAll(".blanks input")];ins.forEach(e=>e.addEventListener("focus",()=>{if(isTouch)setTimeout(()=>e.scrollIntoView({block:"center",behavior:"smooth"}),300)}));if(!isTouch)ins[0].focus();setTimeout(()=>speak(it.en,0,true),250);bindOrd(()=>{D.ord=mkOrd(c);D.i=0;drawD()});
let lastAdv=0;const adv=k=>{lastAdv=Date.now();(ins[k+1]||ins[k]).focus()};ins.forEach((e,k)=>{e.onkeydown=ev=>{if(ev.key==" "){ev.preventDefault();if(Date.now()-lastAdv<300)return;if(!e.value){e.value=norm(w[k]);e.classList.add("hinted");return}check1(e,w[k]);adv(k)}else if(ev.key=="Backspace"&&!e.value&&k>0){ev.preventDefault();ins[k-1].focus()}};e.oninput=()=>{e.classList.remove("ok","bad");if(/\s/.test(e.value)){const v=e.value.replace(/\s+/g,"");e.value=v;if(!v||Date.now()-lastAdv<300)return;check1(e,w[k]);adv(k)}}});
$("#play").onclick=()=>speak(it.en);$("#slow").onclick=()=>speak(it.en,0.6);$("#prev").onclick=()=>go(-1);$("#next").onclick=()=>go(1);$("#sub").onclick=submit;
$("#show").onclick=()=>{$("#ans").textContent=it.en;ins.forEach((e,k)=>e.placeholder=norm(w[k]))};
$("#fav").onclick=()=>{$("#fav").textContent=toggle("fav",c,i)?"★ 已收藏":"☆ 收藏"};$("#voc").onclick=()=>{$("#voc").textContent=toggle("vocab",c,i)?"📒 已在生词本":"📒 加入生词本"};$("#hintb").onclick=()=>{const e=M.querySelector(".blanks input:focus")||ins.find(x=>!x.value)||ins[0];const k=+e.dataset.k;e.value=norm(w[k]);e.classList.add("hinted");e.focus()}}
function check1(e,ans){if(!e.value)return;e.classList.toggle("ok",norm(e.value)==norm(ans));e.classList.toggle("bad",norm(e.value)!=norm(ans))}
function go(d){const n=D.i+d;if(n<0)return toast("已经是第一题");if(n>=D.c.items.length){toast("🎉 本课完成！");location.hash=D.c.book?"#/book/"+D.c.book.id:"#/";return}D.i=n;drawD()}
function submit(){if(D.done)return go(1);const ix=D.ord[D.i],it=D.c.items[ix],w=toks(it.en),ins=[...M.querySelectorAll(".blanks input")];let all=true;ins.forEach((e,k)=>{const ok=norm(e.value)==norm(w[k]);e.classList.toggle("ok",ok);e.classList.toggle("bad",!ok);if(!ok)all=false});
D.done=true;const a=S.get("acc",{ok:0,bad:0});if(all){D.ok++;a.ok++;markDone(D.c.id,ix);$("#ans").innerHTML="✅ "+esc(it.en)}else{D.bad++;a.bad++;$("#ans").innerHTML=`<span style="color:var(--red)">❌</span> 正确答案：${esc(it.en)}`;const l=S.get("vocab",[]);if(!l.includes(key(D.c,ix)))S.set("vocab",[...l,key(D.c,ix)])}
S.set("acc",a);const t=$(".pstat");t.children[1].querySelector("b").textContent=D.ok;t.children[2].querySelector("b").textContent=D.bad;t.children[3].querySelector("b").textContent=Math.round(D.ok/(D.ok+D.bad)*100)+"%";if(!all)toast("答错的题已自动加入生词本");speak(it.en)}
document.addEventListener("keydown",ev=>{if(!location.hash.startsWith("#/dict")||!D)return;if(ev.key=="Control"){ev.preventDefault();speak(D.c.items[D.ord[D.i]].en)}else if(ev.key=="Enter"){ev.preventDefault();submit()}else if(ev.shiftKey&&ev.key=="ArrowLeft"){ev.preventDefault();go(-1)}else if(ev.shiftKey&&ev.key=="ArrowRight"){ev.preventDefault();go(1)}});
// ---- flashcards + quiz
let F=null;
V.card=id=>{const c=byId(id);if(!c||!c.items||c.type!="w")return V[""]();addHist(c,"闪卡");F={c,i:0,mode:"card",ord:mkOrd(c)};drawF()};
function drawF(){const {c,i}=F,it=c.items[F.ord[i]];
M.innerHTML=`<div class="panel"><div class="ptop"><div class="crumb"><a href="${c.book?"#/book/"+c.book.id:"#/words"}">${c.book?c.book.title:"单词中心"}</a> / <b>${c.title}</b></div><div class="tabs ftabs" style="margin:0"><button class="${F.mode=="card"?"on":""}" data-m="card">翻转闪卡</button><button class="${F.mode=="quiz"?"on":""}" data-m="quiz">拼写测验</button>${ordBtn().replace("ordbtn","")}<a class="btn" style="flex:none" href="#/dict/${c.id}">听写模式</a></div></div>
<div class="bar"><i style="width:${(i+1)/c.items.length*100}%"></i></div><p class="hint">${i+1} / ${c.items.length}</p>
${F.mode=="card"?`<div class="flash" id="fl"><div class="in"><div class="f"><div class="w">${esc(it.w)}</div><div>${esc(it.ph)}</div><div style="margin-top:14px;font-size:12px;opacity:.8">点击翻面 · 手机可左右滑动切换</div></div><div class="b"><div style="font-size:22px;font-weight:700">${esc(it.zh)}</div>${it.ex?`<div style="margin-top:14px;font-family:Georgia,serif;font-size:17px">${esc(it.ex)}</div>`:""}</div></div></div>`
:`<div class="zh-big">${esc(it.zh)}</div><p class="hint">${esc(it.ph)} 首字母 <b>${esc(it.w[0])}</b> · ${it.w.length} 个字母</p><div class="blanks"><input id="qi" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" inputmode="text" enterkeyhint="done" style="width:${it.w.length+3}ch"></div><div class="answer" id="ans"></div>`}
<div class="tools"><button class="btn o" id="p">← 上一个</button><button class="btn o" id="sp">🔊 单词</button>${it.ex?`<button class="btn o" id="se">🔊 例句</button>`:""}${F.mode=="quiz"?`<button class="btn" id="ck">检查 ⏎</button>`:""}<button class="btn o" id="vv">${has("vocab",c,F.ord[i])?"📒 已在生词本":"📒 生词本"}</button><button class="btn" id="n">下一个 →</button></div></div>`;
M.querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{F.mode=b.dataset.m;drawF()});bindOrd(()=>{F.ord=mkOrd(c);F.i=0;drawF()});
$("#p").onclick=()=>{if(F.i>0){F.i--;drawF()}};$("#n").onclick=()=>{markDone(c.id,F.ord[F.i]);if(F.i<c.items.length-1){F.i++;drawF()}else toast("🎉 全部完成！")};
$("#sp").onclick=()=>speak(it.w);if($("#se"))$("#se").onclick=()=>speak(it.ex);$("#vv").onclick=()=>{$("#vv").textContent=toggle("vocab",c,F.ord[i])?"📒 已在生词本":"📒 生词本"};
if($("#fl")){$("#fl").onclick=()=>{$("#fl").classList.toggle("flip")};let sx=0,sy=0;$("#fl").addEventListener("touchstart",e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});$("#fl").addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)){e.preventDefault();(dx<0?$("#n"):$("#p")).click()}})}speak(it.w,0,true);
if($("#qi")){const q=$("#qi");q.focus();const ck=()=>{const ok=q.value.trim().toLowerCase()==it.w.toLowerCase();q.className=ok?"ok":"bad";$("#ans").innerHTML=ok?"✅ 正确！":`<span style="color:var(--red)">❌</span> ${esc(it.w)}`;const a=S.get("acc",{ok:0,bad:0});ok?a.ok++:a.bad++;S.set("acc",a);if(ok)markDone(c.id,F.ord[F.i])};$("#ck").onclick=ck;q.onkeydown=e=>{if(e.key=="Enter"){q.className?$("#n").click():ck()}}}}
// ---- shadowing
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
const stabs=a=>`<div class="tabs stabs">${[["sets","跟读视频集","#/shadow"],["vocab","生词本","#/me/vocab"],["fav","收藏视频","#/me/fav"],["hist","历史记录","#/me/hist"]].map(([k,n,h])=>`<a href="${h}"><button class="${k==a?"on":""}">${n}</button></a>`).join("")}</div>`;
function shadowCard(c){const p=c.units?bookPct(c):pct(c),href=c.units?"#/book/"+c.id:"#/shadow/"+c.id;return `<div class="course" data-t="${esc(c.title)}"><div class="cover cv${ci(c.cat)}"><span class="ic">🎙️</span><span class="ty">跟读视频集</span><div class="zh">${c.title}</div><div class="en">${c.en}</div></div><div class="cbody"><div class="meta"><span>${c.units?c.n:c.items.length}句 · ${c.sub}</span></div><div class="bar"><i style="width:${p}%"></i></div><div class="meta"><span>学习进度 ${p}%</span></div><div class="btns"><a class="btn" href="${href}">进入视频集</a></div></div></div>`}
V.shadow=id=>{if(!id){M.innerHTML=`<h2>🎙️ 跟读</h2>${stabs("sets")}<p style="color:var(--m)">听原声 → 开口跟读 → 自动评分（需使用 Chrome / Edge 并允许麦克风）。</p><div class="grid">${COURSES.filter(c=>c.type=="s").map(shadowCard).join("")+BOOKS.filter(b=>b.type=="s").map(shadowCard).join("")}</div>`;return}
const c=byId(id);if(!c||!c.items)return V.shadow();addHist(c,"跟读");let ord=mkOrd(c),pos=0,i=ord[0];
const draw=()=>{i=ord[pos];const it=c.items[i];M.innerHTML=`<div class="panel"><div class="ptop"><div class="crumb"><a href="#/shadow">跟读</a> / <b>${c.title}</b></div><div class="pstat"><span>第 ${pos+1} / ${c.items.length} 句</span>${ordBtn()}</div></div>
<div class="zh-big" style="font-family:Georgia,serif">${esc(it.en)}</div><div class="hint">${esc(it.zh)}</div>
<div class="tools"><button class="btn o" id="pl">🔊 听原声</button><button class="btn o" id="sl">🐢 慢速</button></div><div class="micwrap"><button class="mic" id="rec" aria-label="开始跟读">🎙️</button><div class="hint" id="mict">点击麦克风开始跟读</div></div>
<div id="res" style="margin-top:20px;text-align:center"></div><div class="tools"><button class="btn o" id="pv">← 上一句</button><button class="btn o" id="nx">下一句 →</button></div>
${SR?"":`<p class="hint" style="margin-top:16px">⚠️ 当前浏览器不支持语音识别（建议使用 Chrome / Edge）。你仍可听原声后自行跟读，点击“自评完成”记录进度。</p>`}</div>`;
$("#pl").onclick=()=>speak(it.en);$("#sl").onclick=()=>speak(it.en,0.6);$("#pv").onclick=()=>{if(pos>0){pos--;draw()}else toast("已经是第一句")};$("#nx").onclick=()=>{if(pos<c.items.length-1){pos++;draw()}else toast("🎉 本课跟读完成")};bindOrd(()=>{ord=mkOrd(c);pos=0;draw()});
if(!SR){$("#rec").textContent="✅";$("#mict").textContent="点击记录“自评完成”";$("#rec").onclick=()=>{markDone(c.id,i);toast("已记录")};}else $("#rec").onclick=()=>{const r=new SR();r.lang="en-US";r.interimResults=false;r.maxAlternatives=1;$("#rec").classList.add("on");$("#mict").textContent="正在聆听，请朗读句子…";$("#rec").disabled=true;
r.onresult=e=>{const said=e.results[0][0].transcript,sc=sim(it.en,said);if(sc>=80)markDone(c.id,i);$("#res").innerHTML=`<div class="score">${sc}</div><div class="hint">${sc>=90?"太棒了！发音很地道 🎉":sc>=70?"不错，再练一遍会更好 👍":"多听几遍原声再试试 💪"}</div><p class="diff" style="font-family:Georgia,serif;font-size:18px">${diff(it.en,said)}</p><p class="hint">识别结果：${esc(said)}</p>`};
r.onerror=e=>{$("#res").innerHTML=`<p class="hint">识别失败（${esc(e.error)}）。请检查麦克风权限后重试。</p>`};r.onend=()=>{$("#rec").classList.remove("on");$("#mict").textContent="点击麦克风再读一次";$("#rec").disabled=false};try{r.start()}catch(e){toast("无法启动录音")}};speak(it.en,0,true)};draw()};
function sim(a,b){const A=toks(a).map(norm),B=toks(b).map(norm),m=lcs(A,B);return Math.round(2*m/(A.length+B.length)*100)||0}
function lcs(A,B){const d=Array(A.length+1).fill(0).map(()=>Array(B.length+1).fill(0));for(let i=1;i<=A.length;i++)for(let j=1;j<=B.length;j++)d[i][j]=A[i-1]==B[j-1]?d[i-1][j-1]+1:Math.max(d[i-1][j],d[i][j-1]);return d[A.length][B.length]}
function diff(a,b){const B=new Set(toks(b).map(norm));return toks(a).map(w=>`<span class="${B.has(norm(w))?"m":"x"}">${esc(w)}</span>`).join(" ")}
// ---- resources
V.resources=()=>{const cats=["全部",...new Set(R.map(r=>r[3]))];let cur="全部",q="";
const draw=()=>{const L=R.filter(r=>(cur=="全部"||r[3]==cur)&&(!q||r.join(" ").toLowerCase().includes(q)));
M.innerHTML=`<h2>🌐 资源推荐 <span style="color:var(--m);font-size:14px">GitHub 高星项目 & X 高互动分享（数据核实于 2026-10-25）</span></h2><input class="search" id="rq" placeholder="搜索资源，如：雅思、单词、AI" value="${esc(q)}"><div class="tabs">${cats.map(x=>`<button class="${x==cur?"on":""}">${x}</button>`).join("")}</div>
<div class="grid">${L.map(r=>`<div class="res"><a class="t" href="${r[1]}" target="_blank" rel="noopener">${esc(r[0])} ↗</a><div class="s">${r[2]}</div><div><span class="tag">${r[3]}</span>${r[4].split(",").map(x=>`<span class="tag">${x}</span>`).join("")}</div><div style="font-size:14px">${esc(r[6])}</div><div class="why">💡 ${esc(r[7])}</div></div>`).join("")}</div>${FOOT}`;
M.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{cur=b.textContent;draw()});const i=$("#rq");i.oninput=()=>{q=i.value.toLowerCase();draw();const n=$("#rq");n.focus();n.setSelectionRange(q.length,q.length)}};draw()};
// ---- me: vocab, fav, history
V.me=tab=>{tab=tab||"vocab";const ids=tab=="hist"?[]:S.get(tab,[]).map(k=>k.split(":")[0]);if(ids.some(i=>!isLoaded(i)&&byId(i)))return need(ids,()=>V.me(tab));const names={vocab:"生词本",fav:"收藏视频",hist:"历史记录"};
let body="";if(tab=="hist"){const h=S.get("hist",[]);body=h.map(x=>{const c=byId(x.id);return c?`<div class="row"><div><b>${c.title}</b> <span class="tag">${x.mode}</span><div class="x">${new Date(x.t).toLocaleString("zh-CN")} · 进度 ${pct(c)}%</div></div><a class="btn" style="flex:none" title="继续上次的练习" href="#/${x.mode=="跟读"?"shadow":x.mode=="闪卡"?"card":"dict"}/${c.id}">继续</a></div>`:""}).join("")}
else{body=S.get(tab,[]).map(k=>{const [id,i]=k.split(":"),c=byId(id),it=c&&c.items[+i];return it?`<div class="row"><div><b style="font-family:Georgia,serif">${esc(it.en)}</b> ${it.ph?`<span class="x">${esc(it.ph)}</span>`:""}<div class="x">${esc(it.zh)} · ${c.title}</div></div><div style="display:flex;gap:6px"><button class="btn o" style="flex:none" data-say="${esc(it.en)}">🔊</button><button class="btn o" style="flex:none" data-del="${k}">移除</button></div></div>`:""}).join("")}
M.innerHTML=`<h2>🎙️ 跟读 · ${names[tab]}</h2><div class="tabs">${stabs(tab).replace(/^<div class="tabs stabs">|<\/div>$/g,"")}<button id="clr" title="清空当前列表">清空</button></div><div class="list">${body||`<p style="color:var(--m)">${tab=="hist"?"还没有学习记录，去首页挑一门课程开始吧。":tab=="fav"?"还没有收藏。练习时点击“☆ 收藏”即可收藏句子或单词。":"生词本是空的。听写答错的题会自动加入，也可以手动点击“📒 生词本”添加。"}</p>`}</div>`;
M.querySelectorAll("[data-say]").forEach(b=>b.onclick=()=>speak(b.dataset.say));M.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{S.set(tab,S.get(tab,[]).filter(x=>x!=b.dataset.del));V.me(tab)});
$("#clr").onclick=()=>{if(confirm("确定清空"+names[tab]+"？")){S.set(tab,[]);V.me(tab)}}};
// ---- AI助手
const PROMPTS=[["口语陪练","你是一位耐心的英语口语老师。请和我用英语进行日常对话练习，话题是「{话题}」。要求：1) 每次只说 1–2 句话，用简单的英语；2) 如果我的句子有语法或用词错误，请先用中文指出并给出更地道的说法，再继续对话；3) 我的英语水平是{入门/中级/高级}。"],
["作文批改","请帮我批改下面这篇英语作文，目标考试是{四级/六级/考研/雅思}。请按以下格式输出：1) 总体评分和简短中文点评；2) 逐句列出语法、拼写、用词错误，并给出修改建议和原因（中文解释）；3) 给出一篇保留我原意、更地道的修改版；4) 列出 5 个值得积累的高级表达。\n\n作文：\n{粘贴你的作文}"],
["语法讲解","请用中文给英语学习者讲解「{语法点，例如：现在完成时}」。要求：1) 用一句话说明核心用法；2) 列出 3 个常见使用场景，每个配 2 个英文例句和中文翻译；3) 指出中国学生最常犯的 3 个错误并纠正；4) 最后出 5 道练习题，答案放在最后。"]];
V.ai=()=>{const aiR=R.filter(r=>r[3]=="AI 工具/Skills");M.innerHTML=`<h2>🤖 AI助手</h2><div class="panel" style="max-width:none">
<p>把 AI 当作随时在线的英语老师：陪你练口语、批改作文、讲解语法。下面的提示词模板可以直接复制到任意 AI 对话工具中使用，把 <b>{花括号}</b> 里的内容换成你自己的即可。</p>
<h3>使用建议</h3><ul class="ul"><li>说清楚你的水平和目标（如“四级 450 分，想提高写作”）</li><li>让 AI 用中文解释错误、用英文给例句，学得更快</li><li>每次只练一个主题，练完把新学的表达加入生词本</li><li>AI 也会出错，重要的语法和用法请对照词典或教材核实</li></ul>
${PROMPTS.map(([n,t],k)=>`<div class="prompt"><div class="ph"><b>${n}</b><button class="btn o" data-cp="${k}">复制提示词</button></div><pre>${esc(t)}</pre></div>`).join("")}
<h3>推荐的 AI 学习资源</h3><div class="list">${aiR.map(r=>`<div class="row"><div><a href="${r[1]}" target="_blank" rel="noopener" style="color:var(--acc);font-weight:600">${esc(r[0])} ↗</a><div class="x">${esc(r[6])}</div></div><span class="x">${r[2]}</span></div>`).join("")}</div></div>${FOOT}`;
M.querySelectorAll("[data-cp]").forEach(b=>b.onclick=()=>{const t=PROMPTS[b.dataset.cp][1];(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>toast("已复制到剪贴板"),()=>{const a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();document.execCommand("copy");a.remove();toast("已复制到剪贴板")})})};
// ---- 意见反馈
V.feedback=()=>{const L=S.get("feedback",[]);M.innerHTML=`<h2>💌 意见反馈</h2><div class="panel"><p style="color:var(--m);margin-top:0">遇到问题、发现内容错误，或者有想要的新课程？告诉我们吧。</p>
<form id="fb"><label>反馈类型</label><select id="fbt" class="search"><option>功能建议</option><option>内容纠错</option><option>使用问题</option><option>其他</option></select>
<label>反馈内容</label><textarea id="fbc" class="search" rows="5" placeholder="请尽量描述清楚，例如：哪门课程、第几题、出现了什么问题" required></textarea>
<label>联系方式（选填）</label><input id="fbm" class="search" placeholder="邮箱或微信，方便我们回复你"><button class="btn" type="submit" style="flex:none;padding:12px 28px">提交反馈</button></form>
<div id="fbok"></div>${L.length?`<h3>已提交的反馈（${L.length}）</h3><div class="list">${L.slice().reverse().map(f=>`<div class="row"><div><span class="tag">${esc(f.t)}</span>${esc(f.c)}<div class="x">${new Date(f.at).toLocaleString("zh-CN")}</div></div></div>`).join("")}</div>`:""}
<p class="hint" style="text-align:left;margin-top:16px">说明：反馈目前仅保存在你的浏览器本地，不会上传到服务器。</p></div>`;
$("#fb").onsubmit=e=>{e.preventDefault();const c=$("#fbc").value.trim();if(!c)return toast("请填写反馈内容");S.set("feedback",[...S.get("feedback",[]),{t:$("#fbt").value,c,m:$("#fbm").value.trim(),at:Date.now()}]);V.feedback();$("#fbok").innerHTML='<div class="okbox">🎉 感谢你的反馈！我们会认真阅读每一条建议。</div>'}};
// ---- 发音设置（美音女声 / 美音男声 / 英音 / 系统语音）
function drawVsel(){document.querySelectorAll(".vsel").forEach(el=>{el.innerHTML=[["f","美音女声"],["m","美音男声"],["uk","英音"],["sys","系统语音"]].map(([k,n])=>`<button data-v="${k}" class="${vmode()==k?"on":""}">${n}</button>`).join("");el.querySelectorAll("[data-v]").forEach(b=>b.onclick=e=>{e.stopPropagation();S.set("voice",b.dataset.v);drawVsel();toast("发音已切换为「"+b.textContent+"」");speak("Hello, nice to meet you.")})})}
// ---- 通知 / 头像菜单
const NOTES=["👋 欢迎使用小团英语，点击右上角头像可查看生词本、收藏和历史记录","📚 新增词库：成人自考英语词汇、全国英语等级考试三级（PETS-3）","🎨 支持 4 种主题风格，点击 🎨 即可切换"];
$("#bellmenu").innerHTML=`<div class="thttl">通知</div>`+NOTES.map(n=>`<div class="note">${n}</div>`).join("");
$("#avmenu").innerHTML=`<div class="thttl">我的</div><a href="#/me/vocab">📒 生词本</a><a href="#/me/fav">⭐ 收藏</a><a href="#/me/hist">🕘 历史记录</a><a href="#/resources">🌐 资源推荐</a><a href="#/guide">📘 使用指南</a><div class="thttl">🔊 发音</div><div class="vsel"></div>`;
[["#bell","#bellmenu"],["#avatar","#avmenu"]].forEach(([b,m])=>{$(b).onclick=e=>{e.stopPropagation();document.querySelectorAll(".dd").forEach(x=>x!=$(m)&&x.classList.remove("open"));$(m).classList.toggle("open");if(b=="#bell"){S.set("bellseen",true);$("#bell").classList.remove("dot")}}});
drawVsel();if(!S.get("bellseen",false))$("#bell").classList.add("dot");
document.addEventListener("click",e=>{if(!e.target.closest(".dd"))document.querySelectorAll(".dd").forEach(x=>x.classList.remove("open"));else if(e.target.tagName=="A")e.target.closest(".dd").classList.remove("open")});
// ---- guide
const GUIDE=`<h2>📘 使用指南</h2><div class="panel" style="max-width:none;line-height:1.9">
<h3>🧭 导航说明</h3><p>顶部导航：<b>首页</b>、<b>单词中心</b>、<b>句子中心</b>、<b>跟读</b>、<b>AI助手</b>、<b>意见反馈</b>；右侧依次是 🎨 主题风格、🔔 通知、👤 我的（生词本 / 收藏 / 历史记录 / 资源推荐 / 使用指南）。左侧“分类”可按 全部 / 零基础英语 / 实用英语 / 小初高 / 大学 / 考研 / 雅思 等筛选课程，点 › 展开子分类。课程卡片显示条数和“学习进度”，按钮“开始学习 / 已在学习”进入听写，“进入视频集”进入跟读。</p>
<h3>🎧 听写练习（核心功能）</h3><p>点“← 返回”可回到课程。页面显示中文，系统自动朗读英文。每个下划线框对应一个英文单词，边听边输入，顶部显示“第N题/共M题”和正确率。</p>
<ul><li><kbd>Space</kbd>（提示）：输入框为空时显示该词答案；已输入时检查当前单词并跳到下一个框（绿色=正确，红色=错误）</li><li><kbd>Backspace</kbd>：当前框为空时退回上一个框</li><li><kbd>Enter</kbd>：提交整句；再按一次进入下一题</li><li><kbd>Ctrl</kbd>：再次朗读</li><li>题目默认<b>随机顺序</b>（优先出现还没完成的题），可点右上角“🔀 随机 / 🔢 顺序”切换，闪卡、拼写测验和跟读同样适用</li><li><kbd>Shift</kbd>+<kbd>←</kbd> / <kbd>Shift</kbd>+<kbd>→</kbd>：上一题 / 下一题</li><li>底部按钮栏：上一题 / 提示 / 朗读 / 提交 / 收藏 / 下一题；“🐢 慢速朗读”放慢语速；答错的题会自动加入生词本</li></ul>
<h3>🃏 闪卡模式（单词课程）</h3><p>正面是英文单词和音标，点击卡片翻面查看中文释义（及例句）。点“下一个”即记为已学，可点“🔀 打乱”随机顺序。</p>
<h3>✍️ 拼写测验（单词课程）</h3><p>在闪卡页顶部切换到“拼写测验”。看中文和首字母提示，输入完整单词后按 <kbd>Enter</kbd> 检查，再按 <kbd>Enter</kbd> 进入下一个。</p>
<h3>🎙️ 跟读</h3><p>“跟读”页面有 4 个标签：<b>跟读视频集</b>（所有句子课程）、<b>生词本</b>、<b>收藏视频</b>（你收藏的句子/单词）、<b>历史记录</b>。点“进入视频集”开始练习：先点“🔊 听原声”，再点“🎙️ 开始跟读”对着麦克风读出句子，系统会给出 0–100 的相似度评分，并标出读对（绿色）和漏读（红色划线）的单词。需要使用 Chrome 或 Edge 浏览器并允许麦克风权限；不支持时可听完原声后点“✅ 自评完成”。</p>
<h3>📚 课程与词库</h3><p>左侧分类树可按阶段筛选（手机上点左上角 ☰ 打开）。词库按每单元约 50 词拆分，点进去选择单元即可练习。</p>
<h3>🤖 AI助手 与 💌 意见反馈</h3><p>AI助手提供可一键复制的提示词模板（口语陪练、作文批改、语法讲解）和 AI 学习资源；意见反馈可提交建议，内容保存在本机。</p>
<h3>👤 我的</h3><p>学习进度、生词本、收藏和历史记录都保存在当前浏览器中（无需注册）。更换浏览器或清除浏览器数据会丢失记录。</p>
<h3>💡 小贴士</h3><ul><li>句子默认使用<b>真人级发音（美音女声）</b>，可在右上角头像菜单或手机“更多”里切换 <b>美音女声 / 美音男声 / 英音 / 系统语音</b>；单词使用有道真人发音（美音或英音）；音频加载失败时会自动改用有道发音或系统语音</li><li>iPhone / iPad 首次进入题目时可能无法自动播放，点屏幕下方的“🔊 点击朗读”或“朗读”按钮即可</li><li>“🐢 慢速”会以 0.75 倍速播放</li><li>右上角 🎨 可切换 4 种主题风格（多邻国风 / 极简高级风 / 清新温暖风 / 深色科技风）</li><li>每天 15–20 分钟、坚持听写比一次学很久更有效</li></ul></div>`;
V.guide=()=>{M.innerHTML=GUIDE+FOOT};
if(!S.get("seen",false)){setTimeout(()=>{const d=document.createElement("div");d.className="tip";d.innerHTML=`<div class="tipbox"><h3>👋 欢迎来到小团英语</h3><p>1. 在左侧分类或首页选择一门课程<br>2. 点“开始学习”进入<b>听写练习</b>：看中文、听英文、逐词输入<br>3. 单词课程还可以用<b>闪卡</b>和<b>拼写测验</b>；句子课程可以<b>跟读</b>打分<br>4. 快捷键：空格=下一个词，Enter=提交，Ctrl=朗读</p><div class="btns"><a class="btn o" href="#/guide" id="tg">查看完整使用指南</a><button class="btn" id="tk">我知道了</button></div></div>`;document.body.appendChild(d);const close=()=>{d.remove();S.set("seen",true)};d.querySelector("#tk").onclick=close;d.querySelector("#tg").onclick=close},400)}
// ---- 移动端：搜索按钮 / PWA
$("#msearch").onclick=()=>{const go=()=>{const q=$("#cq");if(q){q.focus();q.scrollIntoView({block:"center"})}};if((location.hash.split("/")[1]||"")=="")go();else{location.hash="#/";setTimeout(go,120)}};
if("serviceWorker" in navigator&&(location.protocol=="https:"||["localhost","127.0.0.1"].includes(location.hostname)))window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
// ---- router
function render(){if("speechSynthesis" in window)speechSynthesis.cancel();const [,r="",a]=location.hash.split("/");document.querySelectorAll("#nav a").forEach(e=>e.classList.toggle("on",e.getAttribute("href")=="#/"+(["dict","card","book"].includes(r)?"":r=="me"?"shadow":r)));const go2=()=>{(V[r]||V[""])(a);bindSearch();window.scrollTo(0,0)};if(["dict","card","shadow"].includes(r)&&a&&byId(a)&&!isLoaded(a))need([a],go2);else go2()}
const sheet=o=>$("#sheet").classList.toggle("open",o);$("#more").onclick=()=>sheet(true);$("#sheetclose").onclick=()=>sheet(false);$("#sheet").onclick=e=>{if(e.target.id=="sheet"||e.target.tagName=="A")sheet(false)};$("#opencat").onclick=()=>{sheet(false);drawer(true)};
window.addEventListener("hashchange",()=>{const r=location.hash.split("/")[1]||"";document.querySelectorAll("#tabbar a[data-r]").forEach(a=>a.classList.toggle("on",a.dataset.r==(["dict","card","book"].includes(r)?"":r=="me"?"shadow":r)));$("#more").classList.toggle("on",["resources","guide","ai","feedback"].includes(r))});
window.addEventListener("hashchange",render);tree();render();window.dispatchEvent(new HashChangeEvent("hashchange"));
})();
