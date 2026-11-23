let previewSide='front';
// Seven distinct material photographs, in the same order as the existing presets.
// Each source is the exact corresponding STUDIO image from Figma, never a shared matte/gloss substitute.
const studioMaterials=['classic','laminated','gloss','premium','matte-film','uv','gold'];
const studioOriginals=['figma-classic.png','figma-laminated.png','figma-gloss.png','figma-premium.png','figma-matte-film.png','figma-uv.png','figma-gold.png'];
function studioAsset(s,side='front'){
 const material=studioMaterials[s.preset]||studioMaterials[0];
 const shape=s.round?'round':'square';
 const back=side==='back';
 const foilEnabled=s.preset===6&&s.foil!=='none'&&(s.side==='both'||s.side===side);
 const blank=back&&s.print==='Jednostranná tlač'&&!foilEnabled;
 let variant;
 if(s.preset===6){
  // Gold/silver previews follow the existing side-selection state. The foil-free image is
  // derived from this finish's own Figma original, not from another material's image.
  const finish=foilEnabled?(s.foil==='silver'?'silver':'gold'):'gold-nofoil';
  variant=blank?'gold-blank-back':`${finish}-${side}`;
 }else{
  variant=blank?`${material}-blank-back`:`${material}-${side}`;
 }
 const original=side==='front'&&!s.round&&(s.preset!==6||(foilEnabled&&s.foil==='gold'));
 return {key:`${variant}-${shape}`,blank,original};
}
function studioImage(s,side='front',uid='preview',thumbnail=false){
 const {key,blank,original}=studioAsset(s,side);
 // Only the seven square gallery fronts have dedicated small versions; all other images
 // use a full-size 1536x1024 source, including refine view and large modal.
 const thumb=thumbnail&&side==='front'&&!s.round;
 const imageKey=thumb?`${key}-thumb`:key;
 // Large square-front views use the exact PNG bytes from Figma.
 const src=!thumbnail&&original?`assets/studio/originals/${studioOriginals[s.preset]}`:`assets/studio/finish-${imageKey}.webp`;
 const foil=s.foil!=='none'&&(s.side==='both'||s.side===side)&&s.preset===6;
 const alt=`STUDIO — ${presets[s.preset][0]}, ${side==='front'?'predná':'zadná'} strana, ${s.round?'zaoblené':'rovné'} rohy${foil?', '+(s.foil==='gold'?'zlatá':'strieborná')+' fólia':''}${blank?', bez potlače':''}`;
 return `<img class="studio-image" src="${src}" width="${thumb?768:1536}" height="${thumb?512:1024}" alt="${esc(alt)}" loading="${thumbnail?'lazy':'eager'}" decoding="async">`;
}
function previewCarousel(){return `<section class="preview-carousel" aria-label="Fotografický náhľad vizitky STUDIO"><div class="preview-stage"><button class="back preview-back" data-action="back"><span aria-hidden="true"><img src="assets/redesign/imgBackChevron.svg" alt=""></span>Späť na všetky prevedenia</button><button class="preview-image-open" data-material-open="${state.preset}" data-material-side="${previewSide}" aria-label="Zväčšiť náhľad vizitky">${studioImage(state,previewSide)}</button><div class="preview-side-toggle" aria-label="Strana vizitky"><button class="preview-side ${previewSide==='front'?'active':''}" data-preview-side="front" aria-pressed="${previewSide==='front'}">Predná</button><button class="preview-side ${previewSide==='back'?'active':''}" data-preview-side="back" aria-pressed="${previewSide==='back'}">Zadná</button></div></div><p class="preview-note">Fotorealistická ilustrácia materiálu a úprav. Vlastnú grafiku pridáte v ďalšom kroku.</p></section>`}
document.addEventListener('click',e=>{const button=e.target.closest('[data-preview-side]');if(!button)return;previewSide=button.dataset.previewSide;render();document.querySelector(`[data-preview-side="${previewSide}"]`)?.focus({preventScroll:true})});
document.addEventListener('keydown',e=>{if(!e.target.closest('.preview-side-toggle')||!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();previewSide=previewSide==='front'?'back':'front';render();document.querySelector(`[data-preview-side="${previewSide}"]`)?.focus({preventScroll:true})});
