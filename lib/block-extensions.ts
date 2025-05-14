export function blockCryptoExtensions() {
  // Ensure we're in browser environment
  if (typeof window === 'undefined') return;

  try {
    // Block BinanceChain injection
    Object.defineProperty(window, 'BinanceChain', {
      get: () => undefined,
      set: () => undefined,
      configurable: true
    });

    // Block Ethereum/MetaMask injection
    Object.defineProperty(window, 'ethereum', {
      get: () => undefined,
      set: () => undefined,
      configurable: true
    });

    // Block extension script injection
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (
            node.nodeName === 'SCRIPT' &&
            node instanceof HTMLScriptElement &&
            (node.src.includes('chrome-extension') || 
             node.src.includes('binance') || 
             node.src.includes('metamask'))
          ) {
            node.remove();
          }
        });
      });
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  } catch (error) {
    console.warn('Failed to block crypto extensions:', error);
  }
}