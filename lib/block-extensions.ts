```typescript
export function blockCryptoExtensions() {
  if (typeof window === 'undefined') return;

  // Block BinanceChain injection
  Object.defineProperty(window, 'BinanceChain', {
    get: () => undefined,
    configurable: true
  });

  // Block Ethereum/MetaMask injection
  Object.defineProperty(window, 'ethereum', {
    get: () => undefined,
    configurable: true
  });

  // Block extension script injection
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeName === 'SCRIPT' &&
          node instanceof HTMLScriptElement &&
          node.src.includes('chrome-extension')
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
}
```