const landmarks = [
  { name: 'قلعه اختیارالدین (Herat Citadel)', img: '', caption: 'Herat' },
  { name: 'بابر باغ', img: '', caption: 'Kabul' },
  { name: 'منار جام', img: '', caption: 'Ghor' }
];

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('gallery');
  if (!el) return;
  const wrap = document.createElement('div');
  wrap.className = 'grid';
  landmarks.forEach(x => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.innerHTML = `<div class="name">${x.name}</div><div class="caption" dir="ltr">${x.caption}</div>`;
    wrap.appendChild(tile);
  });
  el.textContent='';
  el.appendChild(wrap);
});
