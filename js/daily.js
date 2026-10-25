// 小团英语 · 每日一句：本地金句库（按 Asia/Shanghai 日历日轮换）
window.XTDaily=(()=>{
const SITE="https://iroryagame-afk.github.io/xiaotuan-english/";
const TAGS=["励志","职场","日常口语","恋爱","吐槽","旅行"];
const Q=[
// 励志
{en:"Small steps every day beat one big leap someday.",zh:"每天一小步，胜过空想大跃进。",tag:"励志"},
{en:"Progress, not perfection.",zh:"要进步，不要完美主义。",tag:"励志"},
{en:"You don't have to be great to start, but you have to start to be great.",zh:"不必很厉害才开始，但必须开始才能变厉害。",tag:"励志"},
{en:"Done is better than perfect.",zh:"完成，比完美更重要。",tag:"励志"},
{en:"Consistency compounds.",zh:"坚持会复利。",tag:"励志"},
{en:"Your future self is watching.",zh:"未来的你，正在看着现在的你。",tag:"励志"},
{en:"Be stubborn about your goals and flexible about your methods.",zh:"目标要执着，方法要灵活。",tag:"励志"},
{en:"Fall seven times, stand up eight.",zh:"跌倒七次，第八次站起来。",tag:"励志"},
{en:"The only bad workout is the one that didn't happen.",zh:"唯一糟糕的练习，是没开始的那次。",tag:"励志"},
{en:"Make today count.",zh:"让今天值得被记住。",tag:"励志"},
{en:"Courage is starting before you feel ready.",zh:"勇气，是还没准备好就先动手。",tag:"励志"},
{en:"Learn a little, use a little, every day.",zh:"每天学一点，用一点。",tag:"励志"},
{en:"Discipline is choosing what you want most over what you want now.",zh:"自律，是选最想要的，而不是现在就想要的。",tag:"励志"},
{en:"Keep going. You're closer than you think.",zh:"继续走。你比自己以为的更近。",tag:"励志"},
{en:"One sentence a day. One life changed.",zh:"每天一句，改变一生。",tag:"励志"},
// 职场
{en:"Let's take this offline.",zh:"这事咱们私下聊。",tag:"职场"},
{en:"I'll circle back on that.",zh:"这事我回头跟进。",tag:"职场"},
{en:"Can you share the agenda beforehand?",zh:"能提前发一下议程吗？",tag:"职场"},
{en:"Happy to help. What's the priority?",zh:"乐意帮忙。哪件最优先？",tag:"职场"},
{en:"Let's align on the next steps.",zh:"咱们对齐一下下一步。",tag:"职场"},
{en:"I'll own this and update you by Friday.",zh:"这事我负责，周五前同步你。",tag:"职场"},
{en:"Could you clarify the expectation?",zh:"能把期望再明确一下吗？",tag:"职场"},
{en:"Thanks for the feedback. I'll action it.",zh:"谢谢反馈，我马上落实。",tag:"职场"},
{en:"Let's park this and revisit next week.",zh:"先搁置，下周再议。",tag:"职场"},
{en:"Do we have bandwidth for this?",zh:"我们还有余力做这个吗？",tag:"职场"},
{en:"Please keep me in the loop.",zh:"请随时同步我进展。",tag:"职场"},
{en:"I'd like to push back on that timeline.",zh:"这个时间节点我想再商量。",tag:"职场"},
{en:"Great call. Let's document the decision.",zh:"聊得不错，把决定记下来。",tag:"职场"},
{en:"I'll send a quick recap after the meeting.",zh:"会后我发个简短纪要。",tag:"职场"},
{en:"What's the blocker right now?",zh:"现在卡点是什么？",tag:"职场"},
// 日常口语
{en:"That works for me.",zh:"这样对我挺合适。",tag:"日常口语"},
{en:"I'm good, thanks. How about you?",zh:"我挺好的，你呢？",tag:"日常口语"},
{en:"Could you say that again, a bit slower?",zh:"能再说一遍，慢一点吗？",tag:"日常口语"},
{en:"No worries. Take your time.",zh:"没事，你慢慢来。",tag:"日常口语"},
{en:"I was just about to message you.",zh:"我正准备给你发消息。",tag:"日常口语"},
{en:"Sounds like a plan.",zh:"就这么定了。",tag:"日常口语"},
{en:"Mind if I join you?",zh:"我能一起吗？",tag:"日常口语"},
{en:"I totally get what you mean.",zh:"我完全懂你的意思。",tag:"日常口语"},
{en:"Let's grab a coffee sometime.",zh:"哪天一起喝杯咖啡吧。",tag:"日常口语"},
{en:"I can't make it tonight. Rain check?",zh:"今晚去不了，改天行吗？",tag:"日常口语"},
{en:"Long time no see!",zh:"好久不见！",tag:"日常口语"},
{en:"How's your day going so far?",zh:"今天过得怎么样？",tag:"日常口语"},
{en:"I'll text you when I'm free.",zh:"我有空就给你发消息。",tag:"日常口语"},
{en:"That made my day.",zh:"这事儿让我开心一整天。",tag:"日常口语"},
{en:"Same here.",zh:"我也是。",tag:"日常口语"},
// 恋爱
{en:"You make ordinary days feel special.",zh:"有你在，平凡的日子也发光。",tag:"恋爱"},
{en:"I missed you more than I expected.",zh:"我想你，比预想的还要想。",tag:"恋爱"},
{en:"Stay a little longer?",zh:"再多待一会儿好不好？",tag:"恋爱"},
{en:"You're my favorite notification.",zh:"你是我最想点开的消息。",tag:"恋爱"},
{en:"I like who I am when I'm with you.",zh:"和你在一起时的我，我很喜欢。",tag:"恋爱"},
{en:"Text me when you get home safe.",zh:"到家了跟我说一声。",tag:"恋爱"},
{en:"You always know how to cheer me up.",zh:"你总有办法让我开心。",tag:"恋爱"},
{en:"Can I hold your hand?",zh:"可以牵你的手吗？",tag:"恋爱"},
{en:"I saved you a seat.",zh:"我给你留了位子。",tag:"恋爱"},
{en:"Thinking of you. Just that.",zh:"在想你。就这样。",tag:"恋爱"},
{en:"You're the highlight of my week.",zh:"你是我这周最亮的一笔。",tag:"恋爱"},
{en:"Let's grow together, not apart.",zh:"我们一起成长，而不是渐行渐远。",tag:"恋爱"},
// 吐槽
{en:"My battery lasts longer than my motivation.",zh:"我的电量，比我的动力还持久。",tag:"吐槽"},
{en:"I came. I saw. I forgot why.",zh:"我来了，我看见了，我忘了干嘛来的。",tag:"吐槽"},
{en:"Adulting is just Googling how to do things.",zh:"所谓成熟，就是遇事就搜。",tag:"吐槽"},
{en:"I'm not lazy. I'm on energy-saving mode.",zh:"不是懒，是省电模式。",tag:"吐槽"},
{en:"My plans and my alarm have trust issues.",zh:"我的计划和闹钟，互相不信任。",tag:"吐槽"},
{en:"I speak fluent English in my head.",zh:"我脑子里的英语可流利了。",tag:"吐槽"},
{en:"Monday called. I declined.",zh:"周一打来了。我拒接了。",tag:"吐槽"},
{en:"I'm multi-tasking: worrying and procrastinating.",zh:"我在多线程：一边焦虑一边拖延。",tag:"吐槽"},
{en:"My to-do list has trust issues with me.",zh:"待办清单已经不相信我了。",tag:"吐槽"},
{en:"Coffee first. Humanity later.",zh:"先喝咖啡，再做人。",tag:"吐槽"},
{en:"I didn't lose motivation. It went on vacation.",zh:"不是没动力，是动力去度假了。",tag:"吐槽"},
{en:"Group chats: all mute, all drama.",zh:"群聊：全员免打扰，全员戏精。",tag:"吐槽"},
// 旅行（学习句，也可作海报主题）
{en:"Where is the nearest subway station?",zh:"最近的地铁站怎么走？",tag:"旅行"},
{en:"Could you take a photo of us, please?",zh:"能帮我们拍张照吗？",tag:"旅行"},
{en:"Is this seat taken?",zh:"这个位子有人吗？",tag:"旅行"},
{en:"How long does it take to get there?",zh:"到那儿要多久？",tag:"旅行"},
{en:"I'd like a window seat, please.",zh:"我想要靠窗的座位。",tag:"旅行"},
{en:"Do you have any local recommendations?",zh:"有没有本地人推荐的地方？",tag:"旅行"},
{en:"Keep the change.",zh:"不用找了。",tag:"旅行"},
{en:"This view is worth the trip.",zh:"这风景，值了。",tag:"旅行"},
{en:"I'm just passing through.",zh:"我只是路过。",tag:"旅行"},
{en:"What time does it open?",zh:"几点开门？",tag:"旅行"},
{en:"Can I have the menu, please?",zh:"能给我菜单吗？",tag:"旅行"},
{en:"Lost? Me too. Let's find it together.",zh:"迷路了？我也是。一起找吧。",tag:"旅行"}
];
function shDate(d){
  d=d||new Date();
  try{return new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit",day:"2-digit"}).format(d)}
  catch(e){const x=new Date(d.getTime()+8*3600e3);return x.toISOString().slice(0,10)}
}
function dayNum(ds){const p=(ds||shDate()).split("-").map(Number);return Math.floor(Date.UTC(p[0],p[1]-1,p[2])/864e5)}
function at(i){const n=Q.length,k=((i%n)+n)%n;return Object.assign({i:k},Q[k])}
function forDate(ds,off){return at(dayNum(ds)+(off|0))}
function today(off){return forDate(shDate(),off|0)}
function byTag(tag){return Q.map((q,i)=>Object.assign({i},q)).filter(q=>q.tag===tag)}
return {SITE,TAGS,QUOTES:Q,shDate,dayNum,at,forDate,today,byTag,count:Q.length};
})();

// UI + share helpers (attached after core)
(function(D){
let off=0,X=null;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function cur(){return D.today(off)}
function isFav(q){return (X.S.get("dfav",[])||[]).includes(q.en)}
function toggleFav(q){const L=X.S.get("dfav",[]),on=L.includes(q.en);X.S.set("dfav",on?L.filter(x=>x!=q.en):[...L,q.en]);X.toast(on?"已取消收藏":"已收藏 ⭐");return !on}
function themeColors(){
  const cs=getComputedStyle(document.documentElement);
  return{bg:cs.getPropertyValue("--card").trim()||"#fff",t:cs.getPropertyValue("--t").trim()||"#3C3C3C",m:cs.getPropertyValue("--m").trim()||"#777",acc:cs.getPropertyValue("--acc").trim()||"#58CC02",acct:cs.getPropertyValue("--acct").trim()||"#D7FFB8",bd:cs.getPropertyValue("--bd").trim()||"#E5E5E5",soft:cs.getPropertyValue("--soft").trim()||"#F7F7F7",on:cs.getPropertyValue("--on").trim()||"#fff",name:document.documentElement.dataset.theme||"duolingo"};
}
function cardHTML(compact){
  const q=cur(),ds=D.shDate(),fav=X&&isFav(q);
  return `<section class="dq ${compact?"dq-home":"dq-page"}" data-dq>
<div class="dqhd"><span class="dqbadge">📅 每日一句</span><span class="dqdate">${esc(ds)} · Asia/Shanghai</span><span class="dqtag">${esc(q.tag)}</span></div>
<blockquote class="dqen">${esc(q.en)}</blockquote>
<p class="dqzh">${esc(q.zh)}</p>
<div class="dqacts">
<button type="button" class="btn o" data-dq-play title="朗读">🔊 朗读</button>
<button type="button" class="btn o" data-dq-fav title="收藏">${fav?"⭐ 已收藏":"☆ 收藏"}</button>
<button type="button" class="btn o" data-dq-prev title="上一句">‹</button>
<button type="button" class="btn o" data-dq-next title="换一句">换一句 ›</button>
<a class="btn o" href="#/daily/shadow" data-dq-shadow title="跟读练习">🎙️ 跟读</a>
<button type="button" class="btn" data-dq-share title="生成分享图">🖼️ 生成分享图</button>
${compact?`<a class="btn o" href="#/daily" title="更多">更多</a>`:""}
</div>
</section>`;
}
function pageHTML(){
  const q=cur(),favs=X.S.get("dfav",[]);
  return `<h2>📅 每日一句</h2>
<p class="hint" style="margin-top:0">按上海时区日历日轮换，全站同一句。点「换一句」可浏览邻近句子，刷新后仍回到今日默认。</p>
${cardHTML(false)}
<div class="dqmore">
<h3>⭐ 我的金句收藏 <span style="color:var(--m);font-size:13px">(${favs.length})</span></h3>
<div class="list">${favs.length?favs.map(en=>{const q=D.QUOTES.find(x=>x.en==en);return q?`<div class="row"><div><b>${esc(q.en)}</b><div class="x">${esc(q.zh)} · ${esc(q.tag)}</div></div><div style="display:flex;gap:6px"><button class="btn o" data-say="${esc(q.en)}" style="flex:none">🔊</button><button class="btn o" data-dfav-del="${esc(q.en)}" style="flex:none">移除</button></div></div>`:""}).join(""):`<p style="color:var(--m)">还没有收藏。点卡片上的「☆ 收藏」即可保存金句。</p>`}</div>
</div>`;
}
function bind(root){
  if(!root||!X)return;
  const play=()=>X.speak(cur().en);
  const redraw=()=>{if(location.hash.split("/")[1]=="daily"){X.V.daily(location.hash.split("/")[2]);return}
    const slot=root.querySelector("[data-dq]")||document.querySelector("[data-dq]");
    if(!slot)return;const wrap=document.createElement("div");wrap.innerHTML=cardHTML(!!slot.classList.contains("dq-home"));
    slot.replaceWith(wrap.firstElementChild);bind(document.getElementById("main")||document)};
  root.querySelectorAll("[data-dq-play]").forEach(b=>b.onclick=play);
  root.querySelectorAll("[data-dq-fav]").forEach(b=>b.onclick=()=>{toggleFav(cur());b.textContent=isFav(cur())?"⭐ 已收藏":"☆ 收藏"});
  root.querySelectorAll("[data-dq-prev]").forEach(b=>b.onclick=()=>{off--;redraw()});
  root.querySelectorAll("[data-dq-next]").forEach(b=>b.onclick=()=>{off++;redraw()});
  root.querySelectorAll("[data-dq-share]").forEach(b=>b.onclick=()=>openShare(cur()));
  root.querySelectorAll("[data-say]").forEach(b=>b.onclick=()=>X.speak(b.dataset.say));
  root.querySelectorAll("[data-dfav-del]").forEach(b=>b.onclick=()=>{X.S.set("dfav",X.S.get("dfav",[]).filter(x=>x!=b.dataset.dfavDel));X.V.daily()});
}
function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
function wrapText(ctx,text,maxW){const words=text.split(/\s+/);const lines=[];let line="";
  for(const w of words){const t=line?line+" "+w:w;if(ctx.measureText(t).width>maxW&&line){lines.push(line);line=w}else line=t}
  if(line)lines.push(line);return lines}
function wrapZh(ctx,text,maxW){const lines=[];let line="";
  for(const ch of text){const t=line+ch;if(ctx.measureText(t).width>maxW&&line){lines.push(line);line=ch}else line=t}
  if(line)lines.push(line);return lines}
function drawPoster(q,C){
  const W=1080,H=1920,c=document.createElement("canvas");c.width=W;c.height=H;const ctx=c.getContext("2d");
  const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,C.acct||"#D7FFB8");g.addColorStop(.45,C.bg||"#fff");g.addColorStop(1,C.soft||"#F7F7F7");
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  ctx.fillStyle=C.acc||"#58CC02";roundRect(ctx,72,72,160,160,36);ctx.fill();
  ctx.fillStyle=C.on||"#fff";ctx.font="800 84px \"Noto Sans CJK SC\",\"PingFang SC\",\"Microsoft YaHei\",sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText("团",152,160);
  ctx.textAlign="left";ctx.fillStyle=C.t||"#3C3C3C";ctx.font="800 52px \"Noto Sans CJK SC\",\"PingFang SC\",sans-serif";ctx.fillText("小团英语",270,130);
  ctx.fillStyle=C.m||"#777";ctx.font="600 28px \"Noto Sans CJK SC\",\"PingFang SC\",sans-serif";ctx.fillText("每日一句 · "+(q.tag||""),270,186);
  // tag pill
  ctx.fillStyle=C.acc||"#58CC02";roundRect(ctx,72,300,200,56,28);ctx.fill();
  ctx.fillStyle=C.on||"#fff";ctx.font="700 28px \"Noto Sans CJK SC\",sans-serif";ctx.textAlign="center";ctx.fillText(q.tag||"金句",172,332);
  // English
  ctx.textAlign="left";ctx.fillStyle=C.t||"#3C3C3C";ctx.font="800 64px Georgia,\"Times New Roman\",serif";
  const enLines=wrapText(ctx,q.en,W-144);let y=520;enLines.forEach(L=>{ctx.fillText(L,72,y);y+=88});
  // Chinese
  y+=40;ctx.fillStyle=C.acc||"#58CC02";ctx.fillRect(72,y,120,8);y+=60;
  ctx.fillStyle=C.t||"#3C3C3C";ctx.font="700 52px \"Noto Sans CJK SC\",\"PingFang SC\",sans-serif";
  wrapZh(ctx,q.zh,W-144).forEach(L=>{ctx.fillText(L,72,y);y+=72});
  // bottom brand
  ctx.fillStyle=C.bd||"#E5E5E5";ctx.fillRect(72,H-280,W-144,2);
  ctx.fillStyle=C.m||"#777";ctx.font="600 28px \"Noto Sans CJK SC\",sans-serif";ctx.fillText("扫码 / 打开网站继续练习",72,H-200);
  ctx.fillStyle=C.acc||"#58CC02";ctx.font="700 30px \"Noto Sans CJK SC\",monospace";ctx.fillText(D.SITE.replace(/^https:\/\//,""),72,H-140);
  // QR-like box with URL hint (simple branded square)
  ctx.strokeStyle=C.acc||"#58CC02";ctx.lineWidth=8;roundRect(ctx,W-280,H-300,200,200,24);ctx.stroke();
  ctx.fillStyle=C.acc||"#58CC02";ctx.font="800 48px \"Noto Sans CJK SC\",sans-serif";ctx.textAlign="center";ctx.fillText("团",W-180,H-180);
  ctx.fillStyle=C.m||"#777";ctx.font="600 22px sans-serif";ctx.fillText("小团英语",W-180,H-120);
  return c;
}
function openShare(q){
  const C=themeColors(),c=drawPoster(q,C);
  let tip=document.getElementById("dqshare");
  if(tip)tip.remove();
  tip=document.createElement("div");tip.id="dqshare";tip.className="tip";
  tip.innerHTML=`<div class="tipbox dqsharebox"><h3>🖼️ 分享海报</h3><div class="dqprev"><img alt="分享图预览" id="dqimg"></div><div class="btns" style="margin-top:14px"><button class="btn" id="dqdl">下载 PNG</button><button class="btn o" id="dqclose">关闭</button></div><p class="hint" style="text-align:left">长按图片也可保存；适合发朋友圈 / 小红书。</p></div>`;
  document.body.appendChild(tip);
  const img=tip.querySelector("#dqimg");img.src=c.toDataURL("image/png");
  tip.querySelector("#dqclose").onclick=()=>tip.remove();
  tip.onclick=e=>{if(e.target==tip)tip.remove()};
  tip.querySelector("#dqdl").onclick=()=>{const a=document.createElement("a");a.href=c.toDataURL("image/png");a.download="xiaotuan-daily-"+D.shDate()+".png";a.click();X.toast("已开始下载")};
}
function shadowHTML(){
  const q=cur();
  return `<div class="panel scard"><div class="ptop"><div class="crumb"><a href="#/daily">每日一句</a> / <b>跟读</b></div></div>
<div class="dqtag" style="display:inline-block;margin-bottom:12px">${esc(q.tag)}</div>
<div class="scmain"><div class="en" style="font-size:24px;font-weight:800;line-height:1.4">${esc(q.en)}</div><div class="zh" style="color:var(--m);margin-top:10px;font-size:17px">${esc(q.zh)}</div></div>
<div class="btns" style="justify-content:center;margin-top:22px;flex-wrap:wrap">
<button class="btn" id="dqpl">🔊 听原声</button>
<button class="btn o" id="dqsl">🐢 慢速</button>
<button class="btn" id="dqrec">🎙️ 开始跟读</button>
</div>
<p class="hint" id="dqmict">听完原声后，点麦克风朗读整句</p>
<div id="dqres"></div>
<div class="btns" style="justify-content:center;margin-top:16px"><a class="btn o" href="#/daily">← 返回每日一句</a><button class="btn o" id="dqshare2">🖼️ 分享图</button></div>
</div>`;
}
function bindShadow(root){
  const q=cur();
  $("#dqpl",root).onclick=()=>X.speak(q.en);
  $("#dqsl",root).onclick=()=>X.speak(q.en,0.6);
  $("#dqshare2",root).onclick=()=>openShare(q);
  const SR=X.SR;const rec=$("#dqrec",root),mict=$("#dqmict",root),res=$("#dqres",root);
  if(!SR){rec.textContent="✅ 自评完成";mict.textContent="当前浏览器不支持语音识别，听完可点完成";rec.onclick=()=>{X.toast("已记录跟读完成");X.markDone&&X.markDone("xt_daily_quote",q.i)};return}
  rec.onclick=()=>{const r=new SR();r.lang="en-US";r.interimResults=false;r.maxAlternatives=1;rec.classList.add("on");mict.textContent="正在聆听，请朗读句子…";rec.disabled=true;
    r.onresult=ev=>{const said=ev.results[0][0].transcript;const R=window.XTF&&XTF.score?XTF.score(q.en,said,ev.results[0][0].confidence,0,0):{total:Math.round(50),pron:50,flu:50,comp:50};
      res.innerHTML=(window.XTF&&XTF.scoreCard?XTF.scoreCard(R,said):`<p>识别：${esc(said)} · 得分 ${R.total}</p>`);
      if(X.markDone)X.markDone("xt_daily_quote",q.i)};
    r.onerror=e=>{res.innerHTML=`<p class="hint">识别失败（${esc(e.error)}）</p>`};
    r.onend=()=>{rec.classList.remove("on");mict.textContent="点击麦克风再读一次";rec.disabled=false};
    try{r.start()}catch(e){X.toast("无法启动录音")}};
  X.speak(q.en,0,true);
}
function $(s,r){return(r||document).querySelector(s)}
function init(xt){X=xt;off=0;
  const prev=X.V.daily;
  X.V.daily=tab=>{
    if(tab=="shadow"){X.M.innerHTML=shadowHTML()+(X.FOOT||"");bindShadow(X.M);return}
    // keep current off so「换一句」survives re-render; reset only on explicit home→daily nav via hashchange fresh load handled below
    X.M.innerHTML=pageHTML()+(X.FOOT||"");bind(X.M);
  };
  // reset offset when entering #/daily from elsewhere
  let lastHash="";
  window.addEventListener("hashchange",()=>{
    const h=location.hash||"";
    if(h.startsWith("#/daily")&&!lastHash.startsWith("#/daily"))off=0;
    lastHash=h;
  });
  lastHash=location.hash||"";
}
Object.assign(D,{off:()=>off,setOff:v=>{off=v|0},cur,cardHTML,pageHTML,bind,openShare,drawPoster,themeColors,init,toggleFav,isFav});
})(window.XTDaily);
