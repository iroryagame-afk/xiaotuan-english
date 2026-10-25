// 小团英语 · 扩展功能：逐句三项评分、错词对比卡、单词微复习（间隔重复）、小游戏、语速/水平目标设置与今日任务
(function(){
let X=null,X_V_review,X_V_games,X_V_game,X_V_settings;const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const S={get:(k,d)=>{try{const v=JSON.parse(localStorage.getItem("xt_"+k));return v==null?d:v}catch(e){return d}},set:(k,v)=>localStorage.setItem("xt_"+k,JSON.stringify(v))};
const norm=w=>String(w).toLowerCase().replace(/[’]/g,"'").replace(/[^a-z0-9'\-]/g,"");
const toks=t=>String(t).split(/\s+/).map(norm).filter(Boolean);
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const today=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5);
const short=z=>String(z).split(/[；;]/)[0].trim().slice(0,24);
function lev(a,b){const m=a.length,n=b.length;if(!m)return n;if(!n)return m;let p=[...Array(n+1).keys()];for(let i=1;i<=m;i++){const c=[i];for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]==b[j-1]?0:1));p=c}return p[n]}
const wsim=(a,b)=>1-lev(a,b)/Math.max(a.length,b.length,1);

// ========== 1) 逐句三项评分 ==========
function score(target,said,conf,durMs,audioDur){
 const T=toks(target),Sd=toks(said);const used=new Set(),match=[];
 // 为每个目标词寻找最相近的识别词（按顺序优先），≥0.75 视为读出
 let from=0;T.forEach((w,i)=>{let best=-1,bs=0;for(let j=0;j<Sd.length;j++){if(used.has(j))continue;const s=wsim(w,Sd[j])-(j<from?0.1:0);if(s>bs){bs=s;best=j}}
  if(bs>=0.75){used.add(best);from=best+1;match.push({w,s:bs})}else match.push({w,s:0})});
 const hit=match.filter(m=>m.s>0);
 const comp=Math.round(hit.length/Math.max(T.length,1)*100);
 const acc=hit.length?hit.reduce((a,m)=>a+m.s,0)/hit.length:0;
 const c=typeof conf=="number"&&conf>0?conf:null;
 const pron=Math.round(100*(c!=null?0.7*acc*comp/100+0.3*c:acc*comp/100));
 const exp=(isFinite(audioDur)&&audioDur>0?audioDur*1000:T.length*400)+300;
 const ratio=durMs>0?durMs/exp:1;
 let flu=ratio<=1.25?100:Math.max(0,100-(ratio-1.25)*80);if(ratio<0.5)flu-=20;
 flu=Math.round(Math.max(0,Math.min(100,flu*(0.6+0.4*comp/100))));
 const total=Math.round(pron*0.4+flu*0.3+comp*0.3);
 return {pron,flu,comp,total,match,target,durMs,exp,conf:c};
}
const ring=(v,l)=>`<div class="sc3"><div class="ring sm" style="--p:${v}"><b>${v}</b></div><span>${l}</span></div>`;
function scoreCard(R,said){
 return `<div class="scard"><div class="scmain"><div class="score">${R.total}</div><div class="hint">${R.total>=90?"太棒了！读得很地道 🎉":R.total>=70?"不错，再练一遍会更好 👍":"多听几遍原声再试试 💪"}</div></div>
 <div class="sc3w">${ring(R.pron,"发音")}${ring(R.flu,"流利度")}${ring(R.comp,"完整度")}</div>
 <p class="diff">${R.match.map(m=>`<span class="${m.s>0?"m":"x"}" title="${m.s>0?"匹配度 "+Math.round(m.s*100)+"%":"未识别到"}">${esc(m.w)}</span>`).join(" ")}</p>
 <p class="hint">识别结果：${esc(said)}</p>
 <p class="snote">ℹ️ 评分为基于浏览器语音识别结果的估算：完整度=识别到的目标词占比；发音=逐词模糊匹配准确度${R.conf!=null?"结合识别置信度":""}；流利度=朗读时长（${(R.durMs/1000).toFixed(1)}秒）与参考时长（约${(R.exp/1000).toFixed(1)}秒）的比较。仅供练习参考。</p></div>`;
}

// ========== 2) 错词对比卡 ==========
const HOMO=[["their","there","they're"],["to","too","two"],["its","it's"],["your","you're"],["then","than"],["whose","who's"],["know","no"],["write","right"],["hear","here"],["weather","whether"],["accept","except"],["affect","effect"],["by","buy","bye"],["for","four"],["piece","peace"],["one","won"],["see","sea"],["week","weak"]];
function why(u,c){const a=String(u).trim(),b=String(c).replace(/[^A-Za-z0-9'’\-]/g,"");const na=norm(a),nb=norm(b);
 if(!na)return "漏写了这个单词";
 if(na==nb&&a!=b)return "大小写不同";
 if(HOMO.some(g=>g.includes(na)&&g.includes(nb)))return "同音/近音词混淆："+b+" ≠ "+a;
 if(nb==na+"s"||nb==na+"es")return "单复数：结尾少了 -s";
 if(na==nb+"s"||na==nb+"es")return "单复数：结尾多了 -s";
 if(nb==na+"ed"||nb==na+"d")return "时态：少了过去式 -ed";
 if(nb.endsWith("ing")&&!na.endsWith("ing")&&nb.startsWith(na.slice(0,Math.max(2,na.length-1))))return "时态：少了 -ing";
 if(na.slice(0,2)==nb.slice(0,2)&&(/(ed|ing)$/.test(na)||/(ed|ing)$/.test(nb))&&lev(na,nb)<=3&&!(na.endsWith("ing")&&nb.endsWith("ing")))return "时态形式写错了";
 if(lev(na,nb)>Math.max(na.length,nb.length)/2)return "写成了别的单词";
 if(na.length<nb.length&&lev(na,nb)==nb.length-na.length)return "漏写字母";
 if(na.length>nb.length&&lev(na,nb)==na.length-nb.length)return "多写字母";
 return lev(na,nb)<=2?"拼写错误（个别字母）":"拼写错误";}
function diffCard(it,vals,words){
 const rows=words.map((w,k)=>({u:vals[k]||"",c:w})).filter(r=>norm(r.u)!=norm(r.c)||(r.u&&r.u.trim()!=r.c.replace(/[^A-Za-z0-9'’\-]/g,"")&&norm(r.u)==norm(r.c)&&false));
 return `<div class="dcard"><div class="dch">❌ 有 ${rows.length} 处错误</div>${rows.map(r=>`<div class="drow"><span class="dbad">${esc(r.u.trim()||"（空）")}</span><span class="darr">→</span><span class="dok">${esc(r.c.replace(/[^A-Za-z0-9'’\-]/g,""))}</span><span class="dwhy">${why(r.u,r.c)}</span></div>`).join("")}
 <div class="dfull"><div class="den">${esc(it.en)}</div><div class="dzh">${esc(it.zh)}</div></div></div>`;
}

// ========== 3) 单词微复习（SM-2 简化：1,2,4,7,15,30 天） ==========
const INT=[1,2,4,7,15,30];
function pool(){const ks=new Set();const P=S.get("prog",{});Object.keys(P).forEach(id=>{const c=X.byId(id);if(c&&c.type=="w")P[id].forEach(i=>ks.add(id+":"+i))});S.get("vocab",[]).forEach(k=>{const c=X.byId(k.split(":")[0]);if(c&&c.type=="w")ks.add(k)});return [...ks]}
function dueKeys(){const st=S.get("srs",{}),d=today();return pool().filter(k=>!st[k]||st[k].due<=d)}
function grade(k,ok){const st=S.get("srs",{}),o=st[k]||{lv:-1,due:0};const lv=ok?Math.min(o.lv+1,INT.length-1):0;st[k]={lv,due:today()+INT[Math.max(lv,0)]};S.set("srs",st)}
function reviewBanner(){const n=dueKeys().length;return `<a class="rvb" href="#/review"><span class="rvi">🔁</span><span><b>今日复习</b><small>${n?"3 分钟微复习，巩固学过的单词":"暂无待复习单词，学几个新词后再来吧"}</small></span><span class="badge ${n?"":"z"}">${n}</span></a>`}
let RV=null;
function loadFor(keys,cb){X.need([...new Set(keys.map(k=>k.split(":")[0]))],cb)}
X_V_review=function(){const due=dueKeys();if(!due.length){X.M.innerHTML=`<h2>🔁 今日复习</h2><div class="panel empty"><div class="big">🎉</div><p>今天没有需要复习的单词。</p><p class="hint">学过的单词、听写答错的单词和生词本里的单词会按 1、2、4、7、15、30 天的间隔自动安排复习。</p><a class="btn" href="#/words" style="flex:none">去学新单词</a></div>`;return}
 loadFor(due,()=>{const items=shuf(due).slice(0,30).map(k=>{const [id,i]=k.split(":"),c=X.byId(id);return c&&c.items&&c.items[+i]?{k,c,it:c.items[+i]}:null}).filter(Boolean);
  RV={items,pos:0,step:0,ok:0,bad:0,t0:Date.now(),wrong:false,done:[]};drawRV()})};
function rvTimer(){const left=Math.max(0,180-Math.floor((Date.now()-RV.t0)/1000));return `${Math.floor(left/60)}:${String(left%60).padStart(2,"0")}`}
function opts(r){const others=shuf(r.c.items.filter(x=>x.w!=r.it.w)).slice(0,3).map(x=>short(x.zh));return shuf([short(r.it.zh),...others])}
function drawRV(){if(!RV)return;const left=180-(Date.now()-RV.t0)/1000;if(RV.pos>=RV.items.length||(left<=0&&RV.step==0))return rvEnd();
 const r=RV.items[RV.pos],it=r.it,st=["① 听音跟读","② 拼写填空","③ 选择释义"][RV.step];let body="";
 if(RV.step==0)body=`<div class="rvw">${esc(it.w)}</div><div class="hint">${esc(it.ph||"")} · ${esc(short(it.zh))}</div><div class="micwrap"><button class="mic" id="rvmic">🎙️</button><div class="hint" id="rvt">听发音后跟读一遍${X.SR?"，点麦克风开始":"，读完点“下一步”"}</div></div><div class="tools"><button class="btn o" id="rvpl">🔊 再听一遍</button><button class="btn" id="rvnx">下一步 →</button></div>`;
 if(RV.step==1){const w=it.w,mask=w.split("").map((ch,i)=>i==0||i==w.length-1||!/[a-z]/i.test(ch)||i%3==1?ch:"_").join("");body=`<div class="hint" style="font-size:16px">${esc(short(it.zh))}</div><div class="rvw mask">${esc(mask)}</div><div class="blanks"><input id="rvin" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="补全整个单词" style="width:${w.length+6}ch"></div><div class="answer" id="rvans"></div><div class="tools"><button class="btn o" id="rvpl">🔊 听发音</button><button class="btn" id="rvck">检查 ⏎</button></div>`}
 if(RV.step==2){RV.op=RV.op||opts(r);body=`<div class="rvw">${esc(it.w)}</div><div class="hint">选择正确的中文释义</div><div class="opts">${RV.op.map((o,k)=>`<button class="opt" data-o="${k}">${esc(o)}</button>`).join("")}</div>`}
 X.M.innerHTML=`<div class="panel rv"><div class="ptop"><div class="crumb dh"><a class="back" href="#/words">← 返回</a><b>今日复习</b><span>${st}</span></div><div class="pstat"><span>⏱ <b id="rvclk">${rvTimer()}</b></span><span>第<b>${RV.pos+1}</b>/${RV.items.length}个</span><span>✅ <b class="ok">${RV.ok}</b></span><span>❌ <b class="bad">${RV.bad}</b></span></div></div><div class="bar"><i style="width:${(RV.pos*3+RV.step)/(RV.items.length*3)*100}%"></i></div>${body}</div>`;
 clearInterval(RV.iv);RV.iv=setInterval(()=>{const c=$("#rvclk");if(!c||!location.hash.startsWith("#/review"))return clearInterval(RV.iv);c.textContent=rvTimer()},1000);
 const pl=$("#rvpl");if(pl)pl.onclick=()=>X.speak(it.w);if(RV.step<2)X.speak(it.w,0,true);
 if(RV.step==0){$("#rvnx").onclick=()=>{RV.step=1;drawRV()};$("#rvmic").onclick=()=>{if(!X.SR){RV.step=1;return drawRV()}const rc=new X.SR();rc.lang="en-US";$("#rvmic").classList.add("on");$("#rvt").textContent="正在聆听…";rc.onresult=e=>{const s=e.results[0][0].transcript,sc=Math.round(wsim(norm(it.w),norm(s.split(/\s+/)[0]||""))*100);$("#rvt").innerHTML=`识别：${esc(s)} · 匹配度 <b>${sc}</b>`};rc.onerror=()=>{$("#rvt").textContent="没有听清，可以再试一次或直接下一步"};rc.onend=()=>$("#rvmic").classList.remove("on");try{rc.start()}catch(e){}}}
 if(RV.step==1){const q=$("#rvin");q.focus();const ck=()=>{if(q.dataset.d)return(RV.step=2,drawRV());const ok=q.value.trim().toLowerCase()==it.w.toLowerCase();q.dataset.d=1;q.className=ok?"ok":"bad";if(!ok)RV.wrong=true;$("#rvans").innerHTML=ok?"✅ 正确":`<span style="color:var(--bad)">❌</span> ${esc(it.w)}`;$("#rvck").textContent="下一步 →"};$("#rvck").onclick=ck;q.onkeydown=e=>{if(e.key=="Enter")ck()}}
 if(RV.step==2)X.M.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const ok=RV.op[b.dataset.o]==short(it.zh);X.M.querySelectorAll(".opt").forEach(x=>{x.disabled=true;if(RV.op[x.dataset.o]==short(it.zh))x.classList.add("ok")});if(!ok){b.classList.add("bad");RV.wrong=true}
  const good=!RV.wrong;grade(r.k,good);good?RV.ok++:RV.bad++;RV.done.push({w:it.w,ok:good});setTimeout(()=>{RV.pos++;RV.step=0;RV.op=null;RV.wrong=false;drawRV()},800)})}
function rvEnd(){clearInterval(RV.iv);const sec=Math.round((Date.now()-RV.t0)/1000),rest=dueKeys().length;
 X.M.innerHTML=`<div class="panel empty"><div class="big">🎉</div><h2>复习完成</h2><div class="stats sum"><div><b>${RV.done.length}</b>复习单词</div><div><b class="okc">${RV.ok}</b>全部答对</div><div><b class="badc">${RV.bad}</b>需加强</div><div><b>${Math.floor(sec/60)}:${String(sec%60).padStart(2,"0")}</b>用时</div></div>
 ${RV.done.filter(x=>!x.ok).length?`<p class="hint">需加强（明天会再复习）：${RV.done.filter(x=>!x.ok).map(x=>esc(x.w)).join("、")}</p>`:""}<div class="btns" style="justify-content:center">${rest?`<a class="btn" href="#/review" onclick="setTimeout(()=>dispatchEvent(new HashChangeEvent('hashchange')),0)">再复习一组（剩 ${rest}）</a>`:""}<a class="btn o" href="#/">回到首页</a></div></div>`;RV=null}

// ========== 4) 小游戏 ==========
const GAMES=[["match","单词消消乐","把英文和中文配对消除，越快越好","🧩","cv0"],["listen","听音选词","听发音，从 4 个单词里选出正确的","🎧","cv1"],["spell","快速拼写","60 秒倒计时，看中文拼出尽可能多的单词","⚡","cv2"]];
function srcOpts(){const L=[["vocab","📒 我的生词本"]];COURSES.filter(c=>c.type=="w").forEach(c=>L.push(["c:"+c.id,c.title]));BOOKS.filter(b=>b.type=="w").forEach(b=>L.push(["b:"+b.id,b.title+"（随机单元）"]));return L}
function getWords(src,cb){if(src=="vocab"){const ks=S.get("vocab",[]).filter(k=>{const c=X.byId(k.split(":")[0]);return c&&c.type=="w"});return loadFor(ks,()=>cb(ks.map(k=>{const [id,i]=k.split(":"),c=X.byId(id);return c&&c.items&&c.items[+i]}).filter(Boolean)))}
 if(src.startsWith("c:"))return cb(X.byId(src.slice(2)).items);const b=X.bookOf(src.slice(2)),id=b.id+"_"+(1+Math.floor(Math.random()*b.units.length));X.need([id],()=>cb(X.byId(id).items))}
const best=g=>S.get("best",{})[g];
function setBest(g,v,lower){const B=S.get("best",{});const o=B[g];const nb=o==null||(lower?v<o:v>o);if(nb){B[g]=v;S.set("best",B)}return nb}
const fmtBest=(g)=>{const b=best(g);return b==null?"暂无记录":g=="match"?`最佳 ${b} 秒`:`最佳 ${b} 分`};
X_V_games=function(){X.M.innerHTML=`<h2>🎮 小游戏</h2><p style="color:var(--m)">用游戏巩固单词。可以选择任意单词课程、词库或你的生词本作为题库。</p><div class="gwall">${GAMES.map(([id,n,d,ic,cv])=>`<a class="gcard" href="#/game/${id}"><div class="gcov ${cv}"><span>${ic}</span></div><div class="gb"><b>${n}</b><small>${d}</small><em>${fmtBest(id)}</em></div></a>`).join("")}</div>`};
let GT=null;
X_V_game=function(id){const g=GAMES.find(x=>x[0]==id);if(!g)return X_V_games();clearInterval(GT);const src=S.get("gsrc","c:primary");
 X.M.innerHTML=`<div class="panel"><div class="ptop"><div class="crumb dh"><a class="back" href="#/games">← 返回</a><b>${g[1]}</b><span>${fmtBest(id)}</span></div></div><p class="hint" style="text-align:left">${g[2]}</p><label class="hint" style="text-align:left;display:block;margin:16px 0 6px">题库</label><select id="gs" class="search">${srcOpts().map(([k,n])=>`<option value="${k}" ${k==src?"selected":""}>${esc(n)}</option>`).join("")}</select><button class="btn" id="gstart" style="flex:none;padding:12px 32px">开始游戏</button><div id="garea"></div></div>`;
 $("#gstart").onclick=()=>{const s=$("#gs").value;S.set("gsrc",s);getWords(s,ws=>{ws=ws.filter(w=>w&&w.w&&w.zh);if(ws.length<4)return X.toast("题库单词太少（至少 4 个），请换一个题库");$("#gstart").textContent="重新开始";({match:gMatch,listen:gListen,spell:gSpell})[id](ws)})}};
function gOver(id,v,lower,txt){clearInterval(GT);const nb=setBest(id,v,lower);$("#garea").innerHTML=`<div class="gover"><div class="big">${nb?"🏆":"👏"}</div><h3>${txt}</h3><p class="hint">${nb?"新纪录！":"历史"+fmtBest(id)}</p></div>`}
function gMatch(ws){const P=shuf(ws).slice(0,6),tiles=shuf([...P.map((w,i)=>({i,t:w.w,en:1})),...P.map((w,i)=>({i,t:short(w.zh)}))]);let sel=null,left=6,t0=Date.now(),err=0;
 $("#garea").innerHTML=`<div class="gbar"><span>⏱ <b id="gclk">0.0</b> 秒</span><span>剩余 <b id="gleft">6</b> 对</span><span>失误 <b id="gerr">0</b></span></div><div class="tiles">${tiles.map((x,k)=>`<button class="tile ${x.en?"en":""}" data-k="${k}">${esc(x.t)}</button>`).join("")}</div>`;
 GT=setInterval(()=>{const c=$("#gclk");if(!c)return clearInterval(GT);c.textContent=((Date.now()-t0)/1000).toFixed(1)},100);
 $("#garea").querySelectorAll(".tile").forEach(b=>b.onclick=()=>{const x=tiles[b.dataset.k];if(b.classList.contains("gone"))return;if(x.en)X.speak(x.t);
  if(!sel){sel=b;b.classList.add("sel");return}if(sel==b){b.classList.remove("sel");sel=null;return}const y=tiles[sel.dataset.k];
  if(y.i==x.i&&!!y.en!=!!x.en){[sel,b].forEach(e=>{e.classList.add("gone");e.classList.remove("sel")});left--;$("#gleft").textContent=left;if(!left){const s=+((Date.now()-t0)/1000+err*2).toFixed(1);gOver("match",s,true,`完成！用时 ${s} 秒${err?`（含失误罚时 ${err*2} 秒）`:""}`)}}
  else{err++;$("#gerr").textContent=err;[sel,b].forEach(e=>{e.classList.add("no");setTimeout(()=>e.classList.remove("no","sel"),400)})}sel=null})}
function gListen(ws){let n=0,sc=0;const Q=shuf(ws).slice(0,10);const next=()=>{if(n>=Q.length)return gOver("listen",sc,false,`答对 ${sc} / ${Q.length} 题`);const w=Q[n],op=shuf([w,...shuf(ws.filter(x=>x.w!=w.w)).slice(0,3)]);
 $("#garea").innerHTML=`<div class="gbar"><span>第 <b>${n+1}</b> / ${Q.length} 题</span><span>得分 <b>${sc}</b></span></div><div class="micwrap"><button class="mic" id="gpl">🔊</button><div class="hint">点击再听一遍</div></div><div class="opts">${op.map((o,k)=>`<button class="opt" data-k="${k}">${esc(o.w)}</button>`).join("")}</div>`;
 X.speak(w.w);$("#gpl").onclick=()=>X.speak(w.w);$("#garea").querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const ok=op[b.dataset.k].w==w.w;$("#garea").querySelectorAll(".opt").forEach(x=>{x.disabled=true;if(op[x.dataset.k].w==w.w){x.classList.add("ok");x.innerHTML+=`<small>${esc(short(w.zh))}</small>`}});if(ok)sc++;else b.classList.add("bad");n++;setTimeout(next,900)})};next()}
function gSpell(ws){let sc=0,end=Date.now()+60000,cur;const Q=shuf(ws);let qi=0;
 $("#garea").innerHTML=`<div class="gbar"><span>⏱ <b id="gclk">60</b> 秒</span><span>得分 <b id="gsc">0</b></span></div><div class="zh-big" id="gzh"></div><div class="hint" id="gph"></div><div class="blanks"><input id="gin" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="输入英文单词，回车提交"></div><div class="tools"><button class="btn o" id="gskip">跳过</button><button class="btn" id="gok">提交 ⏎</button></div>`;
 const show=()=>{cur=Q[qi++%Q.length];$("#gzh").textContent=short(cur.zh);$("#gph").textContent=`首字母 ${cur.w[0]} · ${cur.w.length} 个字母`;$("#gin").value="";$("#gin").className="";$("#gin").focus()};
 const sub=()=>{const v=$("#gin").value.trim().toLowerCase();if(!v)return;if(v==cur.w.toLowerCase()){sc++;$("#gsc").textContent=sc;show()}else{$("#gin").className="bad";X.toast("正确拼写："+cur.w);setTimeout(show,700)}};
 $("#gin").onkeydown=e=>{if(e.key=="Enter")sub()};$("#gok").onclick=sub;$("#gskip").onclick=show;show();
 GT=setInterval(()=>{const c=$("#gclk");if(!c)return clearInterval(GT);const l=Math.max(0,Math.ceil((end-Date.now())/1000));c.textContent=l;if(!l)gOver("spell",sc,false,`时间到！拼对 ${sc} 个单词`)},250)}

// ========== 5) 水平目标设置 + 今日任务 ==========
const LV=["零基础","初级","中级","中高级","高级"],GOAL=["日常口语","旅游","职场","中高考","四六级","考研","雅思"],MIN=[5,10,20,30];
const prof=()=>S.get("profile",null);
function goal(){const p=prof();return p?{5:10,10:20,20:40,30:60}[p.min]||20:20}
function recCourse(p){const l=LV.indexOf(p.lv);const m={"日常口语":l<=1?"daily":"listen","旅游":"travel","职场":l<=1?"trade":"biz","中高考":l<=1?"pepcz":"gk","四六级":l<=2?"cet4":"cet6","考研":"ky","雅思":l<=2?"ielw":"ielo"};const id=p.lv=="零基础"&&p.goal!="中高考"?(p.goal=="旅游"?"travel":"daily"):(m[p.goal]||"daily");
 const b=X.bookOf(id);if(b){let k=b.units.findIndex((n,i)=>(S.get("prog",{})[b.id+"_"+(i+1)]||[]).length<n);if(k<0)k=0;return {title:`${b.title} · 第${k+1}单元`,href:`#/dict/${b.id}_${k+1}`}}const c=X.byId(id);return {title:c.title,href:"#/dict/"+c.id}}
function taskCard(){const p=prof();if(!p)return `<div class="task"><div class="tkh"><b>🎯 今日任务</b><a href="#/settings">设置水平和目标 →</a></div><p class="hint" style="text-align:left;margin:0">回答 3 个小问题，为你生成每日学习计划。</p></div>`;
 const r=recCourse(p),n=dueKeys().length,g=GAMES[today()%GAMES.length],td=S.get("today",{}),done=td.d==new Date().toDateString()?td.n:0;
 return `<div class="task"><div class="tkh"><b>🎯 今日任务</b><span class="hint">${esc(p.lv)} · ${esc(p.goal)} · 每天 ${p.min} 分钟</span><a href="#/settings">修改</a></div>
 <a class="tki" href="${r.href}"><span class="tkn">1</span><span><b>学习 ${goal()} 个新句子/单词</b><small>推荐：${esc(r.title)} · 今日已学 ${done}/${goal()}</small></span><em>${done>=goal()?"✅":"去学习"}</em></a>
 <a class="tki" href="#/review"><span class="tkn">2</span><span><b>3 分钟单词复习</b><small>${n?`有 ${n} 个单词待复习`:"暂无待复习单词"}</small></span><em>${n?"去复习":"✅"}</em></a>
 <a class="tki" href="#/game/${g[0]}"><span class="tkn">3</span><span><b>玩一局「${g[1]}」</b><small>${g[2]}</small></span><em>去玩</em></a></div>`}
function setForm(p){p=p||{lv:"初级",goal:"日常口语",min:10};const grp=(k,arr,v,suf="")=>`<div class="obq"><div class="obt">${{lv:"你现在的英语水平？",goal:"你的学习目标？",min:"每天打算学多久？"}[k]}</div><div class="chips">${arr.map(x=>`<button type="button" class="chip ${x==v?"on":""}" data-k="${k}" data-v="${x}">${x}${suf}</button>`).join("")}</div></div>`;
 return grp("lv",LV,p.lv)+grp("goal",GOAL,p.goal)+grp("min",MIN,p.min," 分钟")}
function bindForm(root,p){p=p||{lv:"初级",goal:"日常口语",min:10};root.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{p[b.dataset.k]=b.dataset.k=="min"?+b.dataset.v:b.dataset.v;root.querySelectorAll(`.chip[data-k="${b.dataset.k}"]`).forEach(x=>x.classList.toggle("on",x==b))});return p}
function onboard(first){const d=document.createElement("div");d.className="tip";d.innerHTML=`<div class="tipbox ob"><h3>👋 欢迎来到小团英语</h3><p class="hint" style="text-align:left">回答 3 个问题，我们为你安排每日任务（之后可在头像菜单「学习设置」中随时修改）。</p>${setForm(prof())}<div class="btns"><button class="btn o" id="obskip">先随便看看</button><button class="btn" id="obok">生成我的学习计划</button></div><p class="hint" style="text-align:left;margin-top:12px">小提示：听写时 Space=下一个词/提示，Enter=提交，Ctrl=朗读；完整说明见「使用指南」。</p></div>`;
 document.body.appendChild(d);const p=bindForm(d,prof()?{...prof()}:null);const close=()=>{d.remove();S.set("seen",true);if(location.hash==""||location.hash=="#/")dispatchEvent(new HashChangeEvent("hashchange"))};
 d.querySelector("#obskip").onclick=close;d.querySelector("#obok").onclick=()=>{S.set("profile",p);close();X.toast("已生成今日任务 🎯")}}
X_V_settings=function(){const p={...(prof()||{lv:"初级",goal:"日常口语",min:10})};X.M.innerHTML=`<h2>🎯 学习设置</h2><div class="panel ob">${setForm(p)}<div class="obq"><div class="obt">朗读语速</div>${X.spdSel()}</div><div class="btns"><button class="btn" id="sv" style="flex:none;padding:12px 28px">保存设置</button></div><p class="hint" style="text-align:left">每日目标：5 分钟=10 个，10 分钟=20 个，20 分钟=40 个，30 分钟=60 个句子/单词。水平可随时手动调整，今日任务会随之更新。</p></div>`;
 const q=bindForm(X.M,p);$("#sv").onclick=()=>{S.set("profile",q);X.toast("设置已保存");location.hash="#/"}};

window.XTF={score,scoreCard,diffCard,reviewBanner,taskCard,goal,onboard,
 init(api){X=api;X.V.review=()=>X_V_review();X.V.games=()=>X_V_games();X.V.game=id=>X_V_game(id);X.V.settings=()=>X_V_settings();}};
})();
