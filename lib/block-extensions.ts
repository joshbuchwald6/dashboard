export function blockCryptoExtensions() {
  // Ensure we're in browser environment
  if (typeof window === 'undefined') return;

  try {
    // More aggressive blocking of BinanceChain
    Object.defineProperty(window, 'BinanceChain', {
      get() { return undefined; },
      set() { return true; },
      configurable: true
    });

    // More aggressive blocking of Ethereum/MetaMask
    Object.defineProperty(window, 'ethereum', {
      get() { return undefined; },
      set() { return true; },
      configurable: true
    });

    // Block common crypto provider properties
    const dummyProvider = {
      isMetaMask: false,
      isTrust: false,
      type: null,
      selectedAddress: null,
      networkVersion: null,
      chainId: null,
      request: () => Promise.reject(new Error('Crypto extensions are blocked')),
      send: () => Promise.reject(new Error('Crypto extensions are blocked')),
      enable: () => Promise.reject(new Error('Crypto extensions are blocked')),
      on: () => {},
      removeListener: () => {},
      removeAllListeners: () => {},
      listeners: () => []
    };

    // Intercept provider injection attempts
    ['ethereum', 'web3', 'BinanceChain'].forEach(prop => {
      let value = dummyProvider;
      Object.defineProperty(window, prop, {
        get() { return value; },
        set(v) { 
          // Allow setting to undefined/null but preserve our dummy for other values
          value = v === undefined || v === null ? v : dummyProvider;
          return true;
        },
        configurable: true
      });
    });

    // Block extension script injection
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (
            node instanceof HTMLElement &&
            (node.nodeName === 'SCRIPT' || node.nodeName === 'IFRAME') &&
            (
              node.src?.includes('chrome-extension') || 
              node.src?.includes('binance') || 
              node.src?.includes('metamask') ||
              node.src?.includes('wallet') ||
              node.id?.toLowerCase().includes('wallet') ||
              node.className?.toLowerCase().includes('wallet')
            )
          ) {
            node.remove();
          }
        });
      });
    });

    // Start observing immediately with broader coverage
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'id', 'class']
    });

    // Clean up any existing injection attempts
    document.querySelectorAll('script[src*="chrome-extension"], script[src*="binance"], script[src*="metamask"], iframe[src*="chrome-extension"]')
      .forEach(node => node.remove());

  } catch (error) {
    console.warn('Failed to block crypto extensions:', error);
  }
}