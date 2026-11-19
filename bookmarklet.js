(function() {
  const existing = document.getElementById('imagetools-bookmarklet-overlay');
  if (existing) {
    existing.remove();
    return;
  }

  const images = Array.from(document.querySelectorAll('img'))
    .map(img => img.currentSrc || img.src)
    .filter(src => src && (src.startsWith('http') || src.startsWith('data:image')));
  
  const uniqueImages = Array.from(new Set(images)).slice(0, 12);

  const container = document.createElement('div');
  container.id = 'imagetools-bookmarklet-overlay';
  container.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 380px;
    max-width: calc(100vw - 40px);
    max-height: 85vh;
    background: #0f172a;
    color: #f8fafc;
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1);
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 14px;
    animation: itSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes itSlideIn {
      from { opacity: 0; transform: translateY(-15px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    #imagetools-bookmarklet-overlay a, #imagetools-bookmarklet-overlay button {
      transition: all 0.2s ease;
    }
    #imagetools-bookmarklet-overlay button:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
  `;
  document.head.appendChild(style);

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:12px;">
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:18px;">⚡</span>
        <div>
          <div style="font-weight:700; font-size:15px; color:#ffffff; line-height:1.2;">ImageTools Utility</div>
          <div style="font-size:11px; color:#94a3b8;">Free In-Browser Suite</div>
        </div>
      </div>
      <button id="it-close-btn" style="background:#1e293b; border:none; color:#94a3b8; width:28px; height:28px; border-radius:6px; cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center;">✕</button>
    </div>

    <div style="font-size:13px; color:#cbd5e1; line-height:1.4;">
      Found <strong>${uniqueImages.length}</strong> image${uniqueImages.length === 1 ? '' : 's'} on this page. Choose a tool to edit or compress:
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
      <a href="https://imagetools.pics/image-compressor" target="_blank" style="background:#2563eb; color:#fff; text-decoration:none; padding:10px 12px; border-radius:8px; font-size:12px; font-weight:600; text-align:center; display:block;">🗜️ Compress</a>
      <a href="https://imagetools.pics/background-remover" target="_blank" style="background:#7c3aed; color:#fff; text-decoration:none; padding:10px 12px; border-radius:8px; font-size:12px; font-weight:600; text-align:center; display:block;">✨ Remove BG</a>
      <a href="https://imagetools.pics/image-converter" target="_blank" style="background:#059669; color:#fff; text-decoration:none; padding:10px 12px; border-radius:8px; font-size:12px; font-weight:600; text-align:center; display:block;">🔄 Convert</a>
      <a href="https://imagetools.pics/image-resizer" target="_blank" style="background:#d97706; color:#fff; text-decoration:none; padding:10px 12px; border-radius:8px; font-size:12px; font-weight:600; text-align:center; display:block;">📐 Resize</a>
    </div>

    ${uniqueImages.length > 0 ? `
      <div style="font-size:11px; font-weight:600; color:#94a3b8; margin-top:4px;">Quick Actions on Page Images:</div>
      <div style="display:flex; gap:6px; overflow-x:auto; padding-bottom:6px; max-height:80px;">
        ${uniqueImages.map(img => `
          <a href="https://imagetools.pics/background-remover?url=${encodeURIComponent(img)}" target="_blank" title="Open in Remove BG HD" style="flex:0 0 54px; height:54px; border-radius:6px; border:1px solid #334155; overflow:hidden; display:inline-block; background:#000;">
            <img src="${img}" style="width:100%; height:100%; object-fit:cover;" onerror="this.parentElement.style.display='none';">
          </a>
        `).join('')}
      </div>
    ` : ''}

    <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #334155; padding-top:10px; font-size:11px; color:#64748b;">
      <span>Privacy by Design: 100% Client-Side</span>
      <a href="https://imagetools.pics/iloveimg-alternative" target="_blank" style="color:#60a5fa; text-decoration:none; font-weight:600;">Why Switch? →</a>
    </div>
  `;

  document.body.appendChild(container);

  container.querySelector('#it-close-btn').addEventListener('click', () => {
    container.remove();
  });
})();
