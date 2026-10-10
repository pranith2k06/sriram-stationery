/* Always open at the top of the page on reload, and keep the address clean (no #shop, #print...) */
if('scrollRestoration' in history){history.scrollRestoration='manual'}
if(location.hash){history.replaceState(null,'',location.pathname+location.search)}
window.scrollTo(0,0);

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href').slice(1);
    e.preventDefault();
    const behavior=reduceMotion?'auto':'smooth';
    if(!id||id==='top'){window.scrollTo({top:0,behavior});return}
    const target=document.getElementById(id);
    if(target)target.scrollIntoView({behavior,block:'start'});
  });
});

/* light / dark toggle (remembers the visitor's choice) */
const root=document.documentElement,themeBtn=document.getElementById('themeBtn');
function applyTheme(t){
  root.setAttribute('data-theme',t);
  themeBtn.setAttribute('aria-pressed',String(t==='dark'));
  themeBtn.setAttribute('aria-label',t==='dark'?'Switch to light mode':'Switch to dark mode');
}
applyTheme(root.getAttribute('data-theme')==='dark'?'dark':'light');
themeBtn.addEventListener('click',()=>{
  const next=root.getAttribute('data-theme')==='dark'?'light':'dark';
  try{localStorage.setItem('theme',next)}catch(e){}
  applyTheme(next);
});

const IMGS = {
 "front": {
  "s": "images/front.jpg",
  "w": 900,
  "h": 1199
 },
 "counter": {
  "s": "images/counter.jpg",
  "w": 1100,
  "h": 826
 },
 "flags": {
  "s": "images/flags.jpg",
  "w": 1100,
  "h": 826
 },
 "flagitems": {
  "s": "images/flagitems.jpg",
  "w": 1100,
  "h": 495
 },
 "toywall": {
  "s": "images/toywall.jpg",
  "w": 1100,
  "h": 826
 },
 "penwall": {
  "s": "images/penwall.jpg",
  "w": 1100,
  "h": 826
 },
 "party": {
  "s": "images/party.jpg",
  "w": 1000,
  "h": 843
 },
 "shelfA": {
  "s": "images/shelfA.jpg",
  "w": 1100,
  "h": 826
 },
 "shelfB": {
  "s": "images/shelfB.jpg",
  "w": 1100,
  "h": 825
 },
 "shelfC": {
  "s": "images/shelfC.jpg",
  "w": 1100,
  "h": 825
 },
 "desk": {
  "s": "images/desk.jpg",
  "w": 1100,
  "h": 825
 },
 "shelfD": {
  "s": "images/shelfD.jpg",
  "w": 1100,
  "h": 693
 },
 "notebooks": {
  "s": "images/notebooks.jpg",
  "w": 800,
  "h": 1067
 },
 "banner": {
  "s": "images/banner.jpg",
  "w": 1400,
  "h": 525
 },
 "logo": {
  "s": "images/logo.jpg",
  "w": 360,
  "h": 279
 }
};
const GALLERY = [
  ['front','Our shop front'],['counter','The counter: pens, toys and jars of sweets'],['penwall','Pens, pencils, colour sets and clay'],
  ['toywall','Toys, glue guns and craft kits'],['party','Balloons, stickers, keychains and batteries'],['flags','Tricolour flags and badges'],
  ['flagitems','India wristbands, pins and badges'],['shelfA','Pens, sharpeners and correction pens'],['shelfB','Geometry, erasers, refills and colour pencils'],
  ['shelfC','Calculators, glue sticks, staplers and scissors'],['shelfD','Craft paper, tapes and pencil boxes'],['notebooks','Notebooks sorted by page count'],['desk','Our printing and xerox desk']
];
function setImg(el,k){const d=IMGS[k];if(!d)return;el.src=d.s;el.width=d.w;el.height=d.h}
document.querySelectorAll('img[data-k]').forEach(el=>setImg(el,el.dataset.k));

const gal=document.getElementById('gal');
GALLERY.forEach(([k,cap],i)=>{
  const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Open photo: '+cap);
  const im=document.createElement('img');im.alt=cap;im.loading='lazy';setImg(im,k);
  b.appendChild(im);b.addEventListener('click',()=>open(i));gal.appendChild(b);
});

const lb=document.getElementById('lb'),lbimg=document.getElementById('lbimg'),lbcap=document.getElementById('lbcap');
let cur=0,opener=null;
function show(i){cur=(i+GALLERY.length)%GALLERY.length;const [k,cap]=GALLERY[cur];lbimg.src=IMGS[k].s;lbimg.alt=cap;lbcap.textContent=cap}
function open(i){opener=document.activeElement;show(i);lb.classList.add('on');document.body.style.overflow='hidden';lb.querySelector('.x').focus()}
function close(){lb.classList.remove('on');document.body.style.overflow='';if(opener)opener.focus()}
lb.querySelector('.x').addEventListener('click',close);
lb.querySelector('.pv').addEventListener('click',()=>show(cur-1));
lb.querySelector('.nx').addEventListener('click',()=>show(cur+1));
lb.addEventListener('click',e=>{if(e.target===lb)close()});
document.addEventListener('keydown',e=>{
  if(!lb.classList.contains('on'))return;
  if(e.key==='Escape')close();
  if(e.key==='ArrowLeft')show(cur-1);
  if(e.key==='ArrowRight')show(cur+1);
});

/* liquid glass: refraction switch, pointer-following rim light, sliding nav lens */
(function(){
  const chromium=navigator.userAgentData&&navigator.userAgentData.brands.some(b=>/Chromium/.test(b.brand));
  if(chromium&&!matchMedia('(prefers-reduced-transparency: reduce)').matches)root.classList.add('refract');

  const glass='.top,.tile figcaption,.bar,.theme,.nav,.upi,.svc li,.sign';
  if(matchMedia('(hover:hover)').matches){
    document.addEventListener('pointermove',e=>{
      const t=e.target.closest&&e.target.closest(glass);if(!t)return;
      const r=t.getBoundingClientRect();
      t.style.setProperty('--mx',(e.clientX-r.left)+'px');
      t.style.setProperty('--my',(e.clientY-r.top)+'px');
    },{passive:true});
  }

  const nav=document.querySelector('.nav'),links=[...nav.querySelectorAll('a')];
  const secs=links.map(a=>document.getElementById(a.getAttribute('href').slice(1)));
  function update(){
    const y=innerHeight*.4;let cur=null;
    secs.forEach((s,i)=>{if(!s)return;const r=s.getBoundingClientRect();if(r.top<=y&&r.bottom>y)cur=links[i]});
    links.forEach(a=>a===cur?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current'));
    if(cur){nav.style.setProperty('--lx',cur.offsetLeft+'px');nav.style.setProperty('--lw',cur.offsetWidth+'px');nav.style.setProperty('--lo','1')}
    else nav.style.setProperty('--lo','0');
  }
  addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();
})();
