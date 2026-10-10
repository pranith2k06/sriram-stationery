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
