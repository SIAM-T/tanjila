(function(){
  const duration = 3500; // time in ms before restoring page
  const domain = location.hostname;

  // hide all existing elements
  const hiddenEls = [];
  document.querySelectorAll('body > *').forEach(el=>{
    el.style.display='none';
    hiddenEls.push(el);
  });

  // create overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:999999;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    background:#fff;font-family:Arial,Helvetica,sans-serif;color:#000;text-align:center;
  `;
  overlay.innerHTML = `
    <div style="font-size:18px;font-weight:600;margin-bottom:10px;">
      Checking your browser before accessing ${domain}
    </div>
    <div style="margin-bottom:20px;font-size:13px;color:#555;">
      This process is automatic. Your browser will redirect soon.
    </div>
    <div style="width:48px;height:48px;border:4px solid #ccc;border-top-color:#000;border-radius:50%;animation:spin 1s linear infinite;"></div>
    <style>@keyframes spin{to{transform:rotate(360deg);}}</style>
  `;
  document.body.appendChild(overlay);

  // after delay, remove overlay and show original page
  setTimeout(()=>{
    overlay.remove();
    hiddenEls.forEach(el=>el.style.display='');
  }, duration);
})();

