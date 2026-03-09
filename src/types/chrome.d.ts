/// <reference types="chrome"/>

// Extend Window interface for Chrome Extension APIs
declare global {
  interface Window {
    chrome: typeof chrome;
  }
}

export {};
