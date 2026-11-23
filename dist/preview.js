let previewSide='front';
const studioMaterials=['classic','matte','gloss','matte','matte','gloss','matte'];
function studioAsset(s,side='front'){
 const foil=s.preset===6&&s.foil!=='none'&&(s.side==='both'||s.side===side);
 const blank=side==='back'&&s.print==='Jednostranná tlač'&&!foil;
 let material=studioMaterials[s.preset];
 if(blank)material=s.preset===2||s.preset===5?'gloss-blank':'blank';
 else if(foil)material=s.foil;
 else if(side==='back'&&material==='classic')material='matte';
 return {key:`${material}-${side}-${s.round?'round':'square'}`,blank};
}
function studioImage(s,side='front',uid='preview',thumbnail=false){
 const {key,blank}=studioAsset(s,side),src=`assets/studio/${key}.webp`;
 const foil=s.foil!=='none'&&(s.side==='both'||s.side===side)&&s.preset===6;
 const alt=`STUDIO — ${presets[s.preset][0]}, ${side==='front'?'predná':'zadná'} strana, ${s.round?'zaoblené':'rovné'} rohy${foil?', '+(s.foil==='gold'?'zlatá':'strieborná')+' fólia':''}${blank?', bez potlače':''}`;
 return `<img class="studio-image" src="${src}" width="1536" height="1024" alt="${esc(alt)}" loading="${thumbnail?'lazy':'eager'}" decoding="async">`;
}
function previewCarousel(){return `<section class="preview-carousel" aria-label="Fotografický náhľad vizitky STUDIO"><div class="preview-stage"><button class="back preview-back" data-action="back"><span aria-hidden="true"><img src="assets/redesign/imgBackChevron.svg" alt=""></span>Späť na všetky prevedenia</button><button class="preview-image-open" data-material-open="${state.preset}" data-material-side="${previewSide}" aria-label="Zväčšiť náhľad vizitky">${studioImage(state,previewSide)}</button><div class="preview-side-toggle" aria-label="Strana vizitky"><button class="preview-side ${previewSide==='front'?'active':''}" data-preview-side="front" aria-pressed="${previewSide==='front'}">Predná</button><button class="preview-side ${previewSide==='back'?'active':''}" data-preview-side="back" aria-pressed="${previewSide==='back'}">Zadná</button></div></div><p class="preview-note">Fotorealistická ilustrácia materiálu a úprav. Vlastnú grafiku pridáte v ďalšom kroku.</p></section>`}
document.addEventListener('click',e=>{const button=e.target.closest('[data-preview-side]');if(!button)return;previewSide=button.dataset.previewSide;render();document.querySelector(`[data-preview-side="${previewSide}"]`)?.focus({preventScroll:true})});
document.addEventListener('keydown',e=>{if(!e.target.closest('.preview-side-toggle')||!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();previewSide=previewSide==='front'?'back':'front';render();document.querySelector(`[data-preview-side="${previewSide}"]`)?.focus({preventScroll:true})});
