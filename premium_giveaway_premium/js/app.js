// SHARE-TO-UNLOCK logic (updated) - Remember to replace FORM_B64 with base64 of your Google Form
const FORM_B64 = "aHR0cHM6Ly9mb3Jtcy5nbGUvZHVvRlFDZnpZcFVrcHI5Uzk=";

const REQUIRED_SHARES = 5;
const SHARE_KEY = 'jp_share_count';
const SHARE_TS = 'jp_share_ts';
const UNLOCK_DAYS = 7;

function getCount(){return parseInt(localStorage.getItem(SHARE_KEY)||'0',10);}
function setCount(n){localStorage.setItem(SHARE_KEY,String(n)); localStorage.setItem(SHARE_TS,String(Date.now()));}
function ageDays(){const t=parseInt(localStorage.getItem(SHARE_TS)||'0',10); if(!t) return Infinity; return (Date.now()-t)/(1000*60*60*24);}
function unlocked(){return getCount()>=REQUIRED_SHARES && ageDays()<=UNLOCK_DAYS;}

function setProgress(percent){
  const circle = document.getElementById('progressCircle');
  const r = circle.r.baseVal.value;
  const c = 2*Math.PI*r;
  const offset = c - (percent/100)*c;
  circle.style.strokeDasharray = c;
  circle.style.strokeDashoffset = offset;
  document.getElementById('progressText').textContent = Math.min(REQUIRED_SHARES, Math.round((percent/100)*REQUIRED_SHARES)) + '/' + REQUIRED_SHARES;
}

function openWhatsApp(msg){
  const m = encodeURIComponent(msg + ' ' + window.location.href);
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const url = isMobile ? `https://wa.me/?text=${m}` : `https://web.whatsapp.com/send?text=${m}`;
  window.open(url,'_blank');
}

function init(){
  const shareBtn = document.getElementById('shareBtn');
  const enterBtn = document.getElementById('enterBtn');
  const siteMsg = '🎉 Join Jeeto Pakistan Giveaway - Mega Lucky Draw! Free entry, monthly prizes!';
  if(!shareBtn || !enterBtn) return;

  function refreshUI(){
    const c = getCount();
    const pct = Math.min(100, Math.round((c/REQUIRED_SHARES)*100));
    setProgress(pct);
    if(unlocked()){
      enterBtn.disabled = false;
      enterBtn.innerText = '✅ Enter the Lucky Draw';
      enterBtn.classList.remove('locked');
      shareBtn.disabled = true;
      shareBtn.innerText = 'Shared — Thank you';
    } else {
      enterBtn.disabled = true;
      const rem = Math.max(0, REQUIRED_SHARES - c);
      enterBtn.innerText = `Locked — Share ${rem} friends`;
      shareBtn.innerText = `Share to ${rem} friends`;
    }
  }

  shareBtn.addEventListener('click', ()=>{
    let c = getCount()+1; if(c>REQUIRED_SHARES) c=REQUIRED_SHARES;
    setCount(c); refreshUI();
    openWhatsApp(siteMsg);
    shareBtn.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:360});
  });

  enterBtn.addEventListener('click', ()=>{
    if(!unlocked()){ alert('Please share with 5 friends to unlock entry.'); return; }
    if(FORM_B64==='REPLACE_WITH_BASE64_ENCODED_FORM_URL'){ alert('Form not configured. Replace FORM_B64 in js/app.js'); return; }
    try{ const url = atob(FORM_B64); window.open(url,'_blank'); } catch(e){ alert('Form config invalid'); }
  });

  refreshUI();

  // load last winner (optional)
  fetch('/data/last_winner.json').then(r=>r.json()).then(d=>{
    const el = document.getElementById('winner-content');
    if(el && d && d.name) el.innerHTML = `<p><strong>Name:</strong> ${d.name}</p><p><strong>City:</strong> ${d.city}</p><p><strong>Prize:</strong> ${d.prize}</p><p><strong>Month:</strong> ${d.month}</p>` + (d.proof?`<p><img src="${d.proof}" style="max-width:100%;margin-top:8px;border-radius:8px">`:''); 
  }).catch(()=>{});
}

document.addEventListener('DOMContentLoaded', init);
