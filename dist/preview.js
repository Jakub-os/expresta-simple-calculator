let previewSide='front';
const studioMaterials=['classic','matte','gloss','natural','spot','thick'];
function studioAsset(s,side='front'){
 const foil=s.foil!=='none'&&(s.side==='both'||s.side===side)&&![3,5].includes(s.preset);
 const blank=side==='back'&&s.print==='Jednostranná tlač'&&!foil;
 let material=studioMaterials[s.preset];
 if(blank)material=s.preset===5?'thick-blank':s.preset===3?'natural-blank':s.preset===2?'gloss-blank':'blank';
 else if(foil)material=s.foil;
 else if(side==='back'&&![2,3,5].includes(s.preset))material='matte';
 return {key:`${material}-${side}-${s.round?'round':'square'}`,blank};
}
function studioImage(s,side='front',uid='preview',thumbnail=false){
 const {key,blank}=studioAsset(s,side),src=`assets/studio/${key}.webp`;
 const foil=s.foil!=='none'&&(s.side==='both'||s.side===side)&&![3,5].includes(s.preset);
 const alt=`STUDIO — ${presets[s.preset][0]}, ${side==='front'?'predná':'zadná'} strana, ${s.round?'zaoblené':'rovné'} rohy${foil?', '+(s.foil==='gold'?'zlatá':'strieborná')+' fólia':''}${s.preset===5?', jadro '+s.core:''}${blank?', bez potlače':''}`;
 if(s.preset===5&&s.core!=='Červená'){
  const color=colors.find(([name])=>name===s.core)?.[1]||'#bd4145';
  return `<svg class="studio-core-preview" viewBox="0 0 1536 1024" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(alt)}" xmlns="http://www.w3.org/2000/svg"><defs><filter id="${uid}-core-color" color-interpolation-filters="sRGB"><feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 4 -4 0 0 -.4" result="red-key"/><feComposite in="red-key" in2="SourceGraphic" operator="in" result="core-mask"/><feFlood flood-color="${color}" result="core-color"/><feComposite in="core-color" in2="core-mask" operator="in" result="colored-core"/><feComposite in="colored-core" in2="SourceGraphic" operator="over"/></filter></defs><image href="${src}" width="1536" height="1024" filter="url(#${uid}-core-color)"/></svg>`;
 }
 return `<img class="studio-image" src="${thumbnail?`assets/studio/${key}-thumb.webp`:src}" width="1536" height="1024" alt="${esc(alt)}" loading="${thumbnail?'lazy':'eager'}" decoding="async">`;
}
function previewCarousel(){return `<section class="preview-carousel" aria-label="Fotografický náhľad vizitky STUDIO"><div class="preview-stage"><button class="back preview-back" data-action="back"><span aria-hidden="true"><img src="assets/redesign/imgBackChevron.svg" alt=""></span>Späť na všetky prevedenia</button>${studioImage(state,previewSide)}<div class="preview-side-toggle" aria-label="Strana vizitky"><button class="preview-side ${previewSide==='front'?'active':''}" data-preview-side="front" aria-pressed="${previewSide==='front'}">Predná</button><button class="preview-side ${previewSide==='back'?'active':''}" data-preview-side="back" aria-pressed="${previewSide==='back'}">Zadná</button></div></div><p class="preview-note">Fotorealistická ilustrácia materiálu a úprav. Vlastnú grafiku pridáte v ďalšom kroku.</p></section>`}
document.addEventListener('click',e=>{const button=e.target.closest('[data-preview-side]');if(!button)return;previewSide=button.dataset.previewSide;render();document.querySelector(`[data-preview-side="${previewSide}"]`)?.focus({preventScroll:true})});
document.addEventListener('keydown',e=>{if(!e.target.closest('.preview-side-toggle')||!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();previewSide=previewSide==='front'?'back':'front';render();document.querySelector(`[data-preview-side="${previewSide}"]`)?.focus({preventScroll:true})});
