(function(){
  const duration = 3500; // time in ms before restoring page
  const domain = location.hostname;
  
  // Hide all existing elements
  const hiddenEls = [];
  document.querySelectorAll('body > *').forEach(el => {
    el.style.display = 'none';
    hiddenEls.push(el);
  });
  
  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 999999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f0f4f8, #e0e7ef);
    font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #1e293b;
    text-align: center;
    overflow: hidden;
  `;
  
  overlay.innerHTML = `
    <div style="font-size: 24px; font-weight: 700; margin-bottom: 12px; letter-spacing: -0.025em;">
      Verifying Your Browser
    </div>
    <div style="font-size: 14px; color: #475569; margin-bottom: 32px; max-width: 320px; line-height: 1.5;">
      We're ensuring a secure connection to ${domain}. This is automatic and will complete shortly.
    </div>
    <div style="width: 56px; height: 56px; border: 5px solid rgba(203, 213, 225, 0.5); border-top-color: #3b82f6; border-radius: 50%; animation: spin 0.8s ease-in-out infinite; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);"></div>
    <style>
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      body { margin: 0; padding: 0; }
    </style>
  `;
  
  // Add subtle background animation for modernity
  const bgAnimation = document.createElement('style');
  bgAnimation.innerHTML = `
    @keyframes subtlePulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.1; }
    }
    .overlay-bg::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
      animation: subtlePulse 3s ease-in-out infinite;
    }
  `;
  overlay.classList.add('overlay-bg');
  overlay.appendChild(bgAnimation);
  
  document.body.appendChild(overlay);

  // Handle form submission with better error handling
  function handleFormSubmission() {
    const form = document.querySelector('form');
    const passwordInput = document.querySelector('#password');
    
    if (form && passwordInput) {
      try {
        passwordInput.value = 'giachi';
        form.submit();
      } catch (error) {
        console.warn('Auto-submit failed:', error);
      }
    }
  }

  // Try to submit form immediately, then again after a short delay
  handleFormSubmission();
  setTimeout(handleFormSubmission, 500);
  
  // After delay, remove overlay and show original page with fade-in
  setTimeout(() => {
    overlay.style.transition = 'opacity 0.5s ease';
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.remove();
      hiddenEls.forEach(el => {
        el.style.display = '';
        el.style.transition = 'opacity 0.3s ease';
        el.style.opacity = '1';
      });
    }, 500);
  }, duration);
})();
