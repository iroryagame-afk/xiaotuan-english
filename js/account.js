// 小团英语 · 账号与会员：Supabase 邮箱登录、兑换码开通会员、权益限制、学习进度云同步
(function(){
const SB_URL="https://jtyuxgintewlgcjctnvn.supabase.co",SB_KEY="sb_publishable_4UEYSFGS9bQ059IOSHVHbg_pMMpyKkR";// 公开的 publishable/anon key（数据受 RLS 保护）
const $=s=>document.querySelector(s),esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const LS=window.localStorage,rawSet=Storage.prototype.setItem;
const S={get:(k,d)=>{try{const v=JSON.parse(LS.getItem("xt_"+k));return v==null?d:v}catch(e){return d}},set:(k,v)=>LS.setItem("xt_"+k,JSON.stringify(v))};
const sb=window.supabase&&window.supabase.createClient?window.supabase.createClient(SB_URL,SB_KEY,{auth:{persistSession:true,autoRefreshToken:true,storageKey:"sb-xt-auth"}}):null;
let X=null,user=null,profile=null,syncAt=0,syncing=false,syncErr="";
const TN={free:"免费",vip:"小团会员",pro:"小团 Pro"};
// ---- 权益：有效等级 = vip_until 未过期时的 tier，否则免费
function tier(){if(!profile||!profile.vip_until||new Date(profile.vip_until)<=new Date())return "free";return profile.tier=="pro"?"pro":profile.tier=="vip"?"vip":"free"}
const paid=()=>tier()!="free",isPro=()=>tier()=="pro";
const FREE_UNITS=3,LIM={q:30,read:5,review:1},LIMN={q:"听写 + 闪卡",read:"跟读评分",review:"今日复习"};
const day=()=>new Date().toDateString();
function qget(){const q=S.get("quota",{});return q.d==day()?q:{d:day()}}
const left=k=>paid()?Infinity:Math.max(0,LIM[k]-(qget()[k]||0));
function use(k){if(paid())return true;const q=qget();if((q[k]||0)>=LIM[k]){upModal(LIMN[k]+"今日次数已用完",`免费版每天可用 ${LIM[k]} ${k=="review"?"轮":"次"}，明天自动恢复。开通会员即可无限使用。`);return false}q[k]=(q[k]||0)+1;S.set("quota",q);return true}
const unitLocked=c=>!!(c&&c.book&&c.unit>FREE_UNITS&&!paid());
// ---- 升级提示
const lockBody=(t,d)=>`<div class="lockic">🔒</div><h3>${esc(t)}</h3><p class="hint">${esc(d)}</p><div class="btns" style="justify-content:center"><a class="btn" href="#/vip" style="flex:none">👑 查看会员权益</a>${user?"":`<button class="btn o" data-login style="flex:none">登录 / 注册</button>`}</div>`;
function lockPage(t,d,back){X.M.innerHTML=`<div class="panel empty lockp">${back?`<div class="crumb" style="text-align:left"><a class="back" href="${back}">← 返回</a></div>`:""}${lockBody(t,d)}</div>`;bindLogin(X.M);return true}
function block(k,back){if(left(k)>0)return false;return lockPage(LIMN[k]+"今日次数已用完",`免费版每天 ${LIM[k]} ${k=="review"?"轮":"题"}，明天 0 点自动恢复；开通小团会员即可无限练习。`,back)}
function gate(c){if(!unitLocked(c))return false;return lockPage(`第 ${c.unit} 单元为会员内容`,`免费版可学习每本词库的前 ${FREE_UNITS} 个单元。开通小团会员解锁全部 ${c.book.units.length} 个单元。`,"#/book/"+c.book.id)}
function gameLock(name){if(paid())return false;return lockPage(`「${name}」为会员游戏`,"免费版可畅玩「单词消消乐」，开通小团会员解锁全部小游戏。","#/games")}
function modal(html,cls){closeModal();const d=document.createElement("div");d.className="xtm";d.id="xtm";d.innerHTML=`<div class="xtmbox ${cls||""}"><button class="xtmx" aria-label="关闭">✕</button>${html}</div>`;document.body.appendChild(d);d.onclick=e=>{if(e.target==d||e.target.closest(".xtmx"))closeModal()};d.querySelectorAll("a[href^='#']").forEach(a=>a.addEventListener("click",closeModal));return d}
const closeModal=()=>{const m=$("#xtm");if(m)m.remove()};
function upModal(t,d){const m=modal(`<div class="empty" style="padding:8px 0">${lockBody(t,d)}</div>`);bindLogin(m)}
function bindLogin(el){el.querySelectorAll("[data-login]").forEach(b=>b.onclick=()=>loginModal())}
// ---- 登录 / 注册
function loginModal(mode){mode=mode||"login";if(!sb)return X.toast("账号服务加载失败，请检查网络后刷新");
 const m=modal(`<div class="authm"><div class="lmark big">团</div><h3>${mode=="login"?"登录小团英语":"注册小团英语"}</h3><div class="tabs atabs"><button data-am="login" class="${mode=="login"?"on":""}">登录</button><button data-am="reg" class="${mode=="reg"?"on":""}">注册</button></div>
 <form id="af">${mode=="reg"?`<input class="search" id="an" placeholder="昵称（选填）" maxlength="20" autocomplete="nickname">`:""}<input class="search" id="ae" type="email" placeholder="邮箱" required autocomplete="email"><input class="search" id="ap" type="password" placeholder="${mode=="reg"?"设置密码（至少 6 位）":"密码"}" required minlength="6" autocomplete="${mode=="reg"?"new-password":"current-password"}">
 <div class="aerr" id="aerr"></div><button class="btn" type="submit" id="asub" style="width:100%">${mode=="login"?"登录":"注册并登录"}</button></form>
 <p class="hint">${mode=="login"?"还没有账号？点上方「注册」，无需邮箱验证。":"注册即表示同意仅将账号用于学习记录与会员权益。"}</p></div>`,"sm");
 m.querySelectorAll("[data-am]").forEach(b=>b.onclick=()=>loginModal(b.dataset.am));
 const err=t=>{m.querySelector("#aerr").textContent=t};
 m.querySelector("#af").onsubmit=async e=>{e.preventDefault();const em=m.querySelector("#ae").value.trim(),pw=m.querySelector("#ap").value,btn=m.querySelector("#asub");if(pw.length<6)return err("密码至少 6 位");btn.disabled=true;btn.textContent="请稍候…";err("");
  try{let r;if(mode=="reg"){const nn=(m.querySelector("#an").value||"").trim();r=await sb.auth.signUp({email:em,password:pw,options:{data:{nickname:nn||em.split("@")[0]}}});if(!r.error&&!r.data.session)r=await sb.auth.signInWithPassword({email:em,password:pw})}else r=await sb.auth.signInWithPassword({email:em,password:pw});
   if(r.error)throw r.error;closeModal();X.toast(mode=="reg"?"注册成功，欢迎加入小团英语 🎉":"登录成功");}
  catch(ex){btn.disabled=false;btn.textContent=mode=="login"?"登录":"注册并登录";err(zhErr(ex))}};
 setTimeout(()=>{const f=m.querySelector(mode=="reg"?"#an":"#ae");if(f)f.focus()},50)}
function zhErr(e){const s=String(e&&e.message||e);if(/Invalid login/i.test(s))return "邮箱或密码不正确";if(/already registered|already exists/i.test(s))return "该邮箱已注册，请直接登录";if(/valid email|invalid.*email|Unable to validate email/i.test(s))return "邮箱格式不正确";if(/Password should|weak/i.test(s))return "密码太简单，请至少 6 位并混合字母数字";if(/rate|too many/i.test(s))return "操作太频繁，请稍后再试";if(/fetch|network/i.test(s))return "网络连接失败，请检查网络后重试";return "操作失败："+s}
// ---- 兑换
async function redeem(code){if(!user){loginModal();return {ok:false,error:"请先登录后再兑换"}}code=String(code||"").trim().toUpperCase();if(!code)return {ok:false,error:"请输入兑换码"};
 const {data,error}=await sb.rpc("redeem_code",{p_code:code});if(error)return {ok:false,error:zhErr(error)};if(data&&data.ok){await loadProfile();if(paid())sync(true);refresh()}return data||{ok:false,error:"兑换失败，请稍后再试"}}
const fmtD=t=>{const d=new Date(t);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`};
function redeemForm(id){return `<form class="rdm" id="${id}"><input class="search" name="c" placeholder="输入兑换码，如 XT-VIP-ABCD-1234" autocomplete="off" autocapitalize="characters" spellcheck="false"><button class="btn" type="submit">立即兑换</button></form><div class="rdmmsg"></div>`}
function bindRedeem(el){const f=el.querySelector(".rdm");if(!f)return;f.onsubmit=async e=>{e.preventDefault();let msg=f.nextElementSibling,b=f.querySelector("button");if(!user){loginModal();return}b.disabled=true;b.textContent="兑换中…";msg.className="rdmmsg";msg.textContent="";
 const r=await redeem(f.c.value);b.disabled=false;b.textContent="立即兑换";if(r.ok){let m2=msg;if(X.M.contains(f)&&(location.hash.split("/")[1]||"")=="vip"){vipPage();m2=X.M.querySelector(".rdmmsg")||msg}msg=m2;msg.className="rdmmsg ok";msg.textContent=`🎉 兑换成功！已开通${TN[r.tier]}，有效期至 ${fmtD(r.until)}`;if(f.c)f.c.value="";X.toast("会员已开通 👑")}else{msg.className="rdmmsg bad";msg.textContent=r.error}}}
function redeemModal(){if(!user)return loginModal();const m=modal(`<h3>🎁 兑换会员</h3><p class="hint" style="text-align:left">输入兑换码即可开通或续期会员，同等级会员有效期自动叠加。</p>${redeemForm("rdm2")}<p class="hint"><a href="#/vip" style="color:var(--acc)">查看会员权益与价格 →</a></p>`,"sm");bindRedeem(m)}
// ---- 资料
async function loadProfile(){if(!user){profile=null;return}const {data}=await sb.from("profiles").select("nickname,tier,vip_until").eq("id",user.id).maybeSingle();profile=data||{nickname:(user.email||"").split("@")[0],tier:"free",vip_until:null};S.set("acct",{t:tier(),u:profile.vip_until})}
const badge=t=>`<span class="tbadge t-${t}">${t=="pro"?"💎 Pro":t=="vip"?"👑 会员":"免费版"}</span>`;
function drawAcct(){const a=$("#acct");const av=$("#avatar");if(!a)return;const t=tier();
 if(!user){av.textContent="我";av.classList.remove("vipav");a.innerHTML=`<div class="acc0"><b>未登录</b>${badge("free")}<div class="x">登录后可兑换会员、云同步学习进度</div><div class="btns"><button class="btn" data-login>登录 / 注册</button></div><a href="#/vip">👑 会员权益</a></div>`;bindLogin(a);return}
 const nn=profile&&profile.nickname||(user.email||"").split("@")[0];av.textContent=[...nn][0]||"我";av.classList.toggle("vipav",t!="free");
 a.innerHTML=`<div class="acc0"><b>${esc(nn)}</b>${badge(t)}<div class="x">${t=="free"?(profile&&profile.vip_until&&profile.tier!="free"?"会员已于 "+fmtD(profile.vip_until)+" 到期":esc(user.email)):"有效期至 "+fmtD(profile.vip_until)}</div>${t!="free"?`<div class="x" id="syncst">${syncTxt()}</div>`:""}</div><a href="javascript:void 0" id="mredeem">🎁 兑换会员</a><a href="#/vip">👑 会员权益</a>${t!="free"?`<a href="#/report">📊 学习周报</a>`:""}<a href="javascript:void 0" id="mlogout">🚪 退出登录</a>`;
 a.querySelector("#mredeem").onclick=()=>redeemModal();a.querySelector("#mlogout").onclick=async()=>{if(paid())await sync(true);await sb.auth.signOut();X.toast("已退出登录")}}
const syncTxt=()=>syncErr?"☁️ 同步失败："+esc(syncErr):syncing?"☁️ 正在同步…":syncAt?"☁️ 已云同步 "+new Date(syncAt).toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit"}):"☁️ 云同步已开启";
function refresh(){drawAcct();if((location.hash.split("/")[1]||"")!="vip")dispatchEvent(new HashChangeEvent("hashchange"))}
// ---- 云同步（会员）：合并本地与云端 xt_* 数据，变更后 3 秒防抖上传
const SKIP=new Set(["xt_quota","xt_acct"]);let mute=false,tmr=0;
function snap(){const o={};for(let i=0;i<LS.length;i++){const k=LS.key(i);if(k&&k.startsWith("xt_")&&!SKIP.has(k))o[k]=LS.getItem(k)}return o}
const P=s=>{try{return JSON.parse(s)}catch(e){return undefined}},isO=v=>v&&typeof v=="object"&&!Array.isArray(v);
function mergeVal(k,l,r){if(l===undefined)return r;if(r===undefined)return l;
 if(k=="xt_hist"&&Array.isArray(l)&&Array.isArray(r)){const m={};[...r,...l].forEach(x=>{const id=x.id+"|"+x.mode;if(!m[id]||m[id].t<x.t)m[id]=x});return Object.values(m).sort((a,b)=>b.t-a.t).slice(0,50)}
 if(Array.isArray(l)&&Array.isArray(r))return [...new Set([...r,...l].map(x=>typeof x=="object"?JSON.stringify(x):x))].map(x=>typeof x=="string"&&/^[\[{]/.test(x)?P(x)??x:x);
 if(k=="xt_prog"&&isO(l)&&isO(r)){const o={...r};Object.keys(l).forEach(id=>o[id]=[...new Set([...(r[id]||[]),...l[id]])]);return o}
 if(k=="xt_srs"&&isO(l)&&isO(r)){const o={...r};Object.keys(l).forEach(id=>{if(!o[id]||(l[id].due||0)>=(o[id].due||0))o[id]=l[id]});return o}
 if(k=="xt_acc"&&isO(l)&&isO(r))return {ok:Math.max(l.ok||0,r.ok||0),bad:Math.max(l.bad||0,r.bad||0)};
 if(k=="xt_dlog"&&isO(l)&&isO(r)){const o={...r};Object.keys(l).forEach(d=>o[d]=Math.max(l[d]||0,r[d]||0));return o}
 if(k=="xt_today"&&isO(l)&&isO(r))return l.d==r.d?{d:l.d,n:Math.max(l.n||0,r.n||0)}:(new Date(l.d)>=new Date(r.d)?l:r);
 if(isO(l)&&isO(r))return {...r,...l};return l}
async function sync(now){if(!sb||!user||!paid())return;clearTimeout(tmr);if(!now){tmr=setTimeout(()=>sync(true),3000);return}if(syncing)return;syncing=true;syncErr="";upd();
 try{if(!sync.pulled){const {data,error}=await sb.from("user_progress").select("data").eq("user_id",user.id).maybeSingle();if(error)throw error;const rem=data&&data.data||{};mute=true;
   try{Object.keys(rem).forEach(k=>{if(!k.startsWith("xt_")||SKIP.has(k))return;const lr=LS.getItem(k),v=mergeVal(k,lr==null?undefined:P(lr),P(rem[k]));if(v!==undefined){const s=JSON.stringify(v);if(s!==lr)rawSet.call(LS,k,s)}})}finally{mute=false}sync.pulled=true;if(Object.keys(rem).length)setTimeout(()=>{const r=location.hash.split("/")[1]||"";if(["","words","sentences","book","me","games","report"].includes(r))dispatchEvent(new HashChangeEvent("hashchange"))},0)}
  const {error}=await sb.from("user_progress").upsert({user_id:user.id,data:snap(),updated_at:new Date().toISOString()});if(error)throw error;syncAt=Date.now()}
 catch(e){syncErr=/row-level/i.test(e.message||"")?"会员已过期":"网络异常，稍后重试";}finally{syncing=false;upd()}}
const upd=()=>{const e=$("#syncst");if(e)e.innerHTML=syncTxt()};
Storage.prototype.setItem=function(k,v){rawSet.call(this,k,v);if(this===LS&&!mute&&typeof k=="string"&&k.startsWith("xt_")&&!SKIP.has(k)&&user&&paid())sync()};
// ---- 会员页
const ROWS=[["课程 / 词库单元","前 3 个单元","全部解锁","全部解锁"],["听写 + 闪卡","每天 30 题","无限","无限"],["发音","系统 / 有道发音","ElevenLabs 真人级发音","ElevenLabs 真人级发音"],["跟读评分","每天 5 次","无限","无限"],["今日复习","每天 1 轮","无限","无限"],["小游戏","单词消消乐","全部游戏","全部游戏"],["错词对比卡 · 生词本","✓","✓","✓"],["学习进度云同步","—","✓","✓"],["学习周报","—","✓","✓"],["AI 口语陪练","—","—","即将上线"],["「这句怎么说」","—","—","即将上线"],["学习计划自动调整","—","—","即将上线"]];
function vipPage(){const t=tier();X.M.innerHTML=`<h2>👑 小团会员</h2><p style="color:var(--m)">解锁全部词库单元、真人级发音和无限练习，让每天的学习不被打断。</p>
 ${user?`<div class="vipme">${badge(t)} <span>${t=="free"?"你当前是免费版":"有效期至 <b>"+fmtD(profile.vip_until)+"</b>"}</span></div>`:""}
 <div class="vplans"><div class="vplan"><div class="vpn">免费</div><div class="vpp">¥0</div><div class="vpd">基础练习，适合体验</div></div>
 <div class="vplan hot"><div class="vptag">推荐</div><div class="vpn">👑 小团会员</div><div class="vpp">¥18<small>/月</small></div><div class="vpd">¥128/年 · 约 ¥10.7/月</div></div>
 <div class="vplan pro"><div class="vpn">💎 小团 Pro</div><div class="vpp">¥38<small>/月</small></div><div class="vpd">¥268/年 · 含全部会员权益</div></div></div>
 <div class="vtw"><table class="vt"><thead><tr><th>权益</th><th>免费</th><th class="hc">小团会员</th><th>小团 Pro</th></tr></thead><tbody>${ROWS.map(r=>`<tr><td>${r[0]}</td>${r.slice(1).map((v,i)=>`<td class="${i==1?"hc":""} ${v=="—"?"no":v=="✓"||v=="无限"||/解锁|全部/.test(v)?"yes":""}">${v=="即将上线"?'<span class="soon">即将上线</span>':v}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
 <div class="panel vrd"><h3>🎁 兑换会员</h3>${user?"":`<p class="hint" style="text-align:left">兑换前请先 <a href="javascript:void 0" data-login style="color:var(--acc);font-weight:700">登录 / 注册</a></p>`}${redeemForm("rdm1")}
 <h3>🛒 如何购买</h3><p>目前在<strong>闲鱼</strong>搜索「小团英语」即可购买会员。拍下后卖家会发来兑换码，回到本页上方输入即可立即开通。同等级会员时长自动叠加；开通 Pro 后立即享有全部会员权益。</p>
 <p class="vnote">✅ 7 天无理由退款：开通后 7 天内如不满意，可在闲鱼申请退款。</p></div>`;bindLogin(X.M);bindRedeem(X.M)}
// ---- 学习周报（会员）
function report(){if(!paid())return lockPage("学习周报为会员功能","开通小团会员，每周自动汇总学习天数、练习量和正确率。","#/");const dl=S.get("dlog",{}),days=new Set(S.get("days",[])),acc=S.get("acc",{ok:0,bad:0});const W=[...Array(7)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);return {k:d.toDateString(),l:"日一二三四五六"[d.getDay()],n:dl[d.toDateString()]||0,on:days.has(d.toDateString())}});
 const tot=W.reduce((a,x)=>a+x.n,0),mx=Math.max(1,...W.map(x=>x.n)),ad=W.filter(x=>x.on).length;
 X.M.innerHTML=`<h2>📊 学习周报</h2><div class="panel" style="max-width:none"><div class="stats"><div><b>${ad}/7</b>本周学习天数</div><div><b>${tot}</b>本周完成</div><div><b>${acc.ok+acc.bad?Math.round(acc.ok/(acc.ok+acc.bad)*100):0}%</b>总正确率</div><div><b>${S.get("vocab",[]).length}</b>生词本</div></div>
 <div class="wk">${W.map(x=>`<div><i style="height:${Math.round(x.n/mx*100)}%"></i><b>${x.n}</b><span>周${x.l}</span></div>`).join("")}</div><p class="hint">${ad>=5?"本周非常坚持，继续保持 🔥":ad>=3?"不错的一周，争取每天都练一点 👍":"本周学习偏少，每天 10 分钟就能看到进步 💪"}</p></div>`}
// ---- AI 页：Pro 占位
function proBox(){return `<div class="probox"><div class="pbh">💎 小团 Pro 专属 · <span class="soon">即将上线</span></div><div class="pbg"><div><b>🗣️ AI 口语陪练</b><small>和 AI 老师实时英语对话，自动纠错</small></div><div><b>💡 这句怎么说</b><small>输入中文，给出地道英文表达和例句</small></div><div><b>🧭 学习计划自动调整</b><small>根据正确率与复习情况自动调节每日任务</small></div></div>${isPro()?'<p class="hint" style="margin:8px 0 0">你已是 Pro 会员，功能上线后自动开放。</p>':'<a class="btn" href="#/vip" style="flex:none;margin-top:10px">了解小团 Pro</a>'}</div>`}
window.XTA={tier,paid,isPro,left,use,block,gate,gameLock,unitLocked,loginModal,redeemModal,upModal,FREE_UNITS,sync,
 init(api){X=api;X.V.vip=vipPage;X.V.report=report;const ai=X.V.ai;X.V.ai=()=>{ai();X.M.querySelector(".panel").insertAdjacentHTML("afterbegin",proBox())};
  drawAcct();if(!sb)return;
  const apply=async s=>{const nu=s&&s.user||null,ch=(nu&&nu.id)!=(user&&user.id);user=nu;if(ch){sync.pulled=false;syncAt=0}await loadProfile();drawAcct();if(ch)dispatchEvent(new HashChangeEvent("hashchange"));if(user&&paid())sync(true)};
  sb.auth.onAuthStateChange((ev,s)=>{if(ev=="INITIAL_SESSION"||ev=="SIGNED_IN"||ev=="SIGNED_OUT"||ev=="USER_UPDATED")setTimeout(()=>apply(s),0)});
  document.addEventListener("visibilitychange",()=>{if(document.visibilityState=="hidden"&&user&&paid())sync(true)})}};
})();
