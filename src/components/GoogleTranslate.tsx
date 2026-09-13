import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Globe, X, Check } from 'lucide-react';

export interface LanguageOption {
  code: string;
  country: string;
  name: string;
  nativeName?: string;
}

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', country: 'IN', name: 'English', nativeName: 'English' },
  { code: 'hi', country: 'IN', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'as', country: 'IN', name: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'bn', country: 'IN', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', country: 'IN', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', country: 'IN', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', country: 'IN', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'gu', country: 'IN', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', country: 'IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', country: 'IN', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', country: 'IN', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or', country: 'IN', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'ur', country: 'IN', name: 'Urdu', nativeName: 'اردو' },
];

interface GoogleTranslateProps {
  variant?: 'pill' | 'compact';
  className?: string;
  onLanguageChange?: (langCode: string) => void;
}

export const GoogleTranslate: React.FC<GoogleTranslateProps> = ({
  className = '',
  onLanguageChange,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<string>('en');
  const [tempSelectedLang, setTempSelectedLang] = useState<string>('en');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsModalOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isModalOpen]);

  const getSavedLanguage = useCallback((): string => {
    if (typeof document === 'undefined') return 'en';
    const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
    if (match) {
      const val = decodeURIComponent(match[1]);
      const parts = val.split('/');
      const code = parts[parts.length - 1];
      if (code) return code;
    }
    try {
      const local = localStorage.getItem('smriti_language');
      if (local) return local;
    } catch {
      // LocalStorage access restricted or unavailable
    }
    return 'en';
  }, []);

  const triggerCombo = useCallback((selected: string, attempts = 0): void => {
    let combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (!combo) {
      const hidden = document.getElementById('google_translate_hidden_element');
      if (hidden) combo = hidden.querySelector('select');
    }

    if (combo && combo.options && combo.options.length > 1) {
      let targetIndex = -1;
      let targetVal = '';

      if (selected === 'en') {
        for (let i = 0; i < combo.options.length; i++) {
          const val = combo.options[i].value;
          if (val === '' || val === 'en' || val === 'auto') {
            targetIndex = i;
            targetVal = val;
            break;
          }
        }
        if (targetIndex === -1) {
          targetIndex = 0;
          targetVal = combo.options[0].value;
        }
      } else {
        for (let i = 0; i < combo.options.length; i++) {
          const val = combo.options[i].value;
          if (val.toLowerCase() === selected.toLowerCase()) {
            targetIndex = i;
            targetVal = val;
            break;
          }
        }
      }

      if (targetIndex !== -1) {
        combo.selectedIndex = targetIndex;
        combo.value = targetVal;
        combo.dispatchEvent(new Event('change', { bubbles: true }));
        combo.dispatchEvent(new Event('input', { bubbles: true }));
        if (typeof (combo as any).onchange === 'function') {
          try {
            (combo as any).onchange();
          } catch {
            // Ignore synthetic change errors
          }
        }
        return;
      }
    }

    if (attempts < 60) {
      setTimeout(() => triggerCombo(selected, attempts + 1), 100);
    }
  }, []);

  useEffect(() => {
    const saved = getSavedLanguage();
    setCurrentLang(saved);
    setTempSelectedLang(saved);

    // 1. Ensure hidden translate element exists in DOM
    if (!document.getElementById('google_translate_hidden_element')) {
      const hiddenDiv = document.createElement('div');
      hiddenDiv.id = 'google_translate_hidden_element';
      hiddenDiv.className = 'hidden-translate-engine notranslate';
      hiddenDiv.setAttribute('translate', 'no');
      document.body.appendChild(hiddenDiv);
    }

    // 2. Define global callback
    window.googleTranslateElementInit = () => {
      try {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: SUPPORTED_LANGUAGES.map((l) => l.code).join(','),
              autoDisplay: false,
            },
            'google_translate_hidden_element'
          );

          // If there was a saved language other than English, apply it once ready
          const current = getSavedLanguage();
          if (current && current !== 'en') {
            setTimeout(() => triggerCombo(current), 300);
          }
        }
      } catch (err) {
        console.warn('Google Translate initialization warning:', err);
      }
    };

    // 3. Inject Google Translate API script
    if (!document.querySelector('script[src*="translate.google.com/translate_a/element.js"]')) {
      const script = document.createElement('script');
      script.id = 'google-translate-api-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      // Script already loaded in session
      const current = getSavedLanguage();
      if (current && current !== 'en') {
        triggerCombo(current);
      }
    }
  }, [getSavedLanguage, triggerCombo]);

  const openModal = (): void => {
    setTempSelectedLang(currentLang);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const applyLanguage = (): void => {
    const selected = tempSelectedLang;
    const current = currentLang;

    setCurrentLang(selected);
    closeModal();

    if (onLanguageChange) {
      onLanguageChange(selected);
    }

    try {
      if (selected === 'en') {
        localStorage.removeItem('smriti_language');
      } else {
        localStorage.setItem('smriti_language', selected);
      }
    } catch {
      // LocalStorage access restricted
    }

    const domain = window.location.hostname;

    if (selected === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      if (domain && domain !== 'localhost') {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
        if (domain.includes('.')) {
          const rootDomain = domain.split('.').slice(-2).join('.');
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${rootDomain};`;
        }
      }
    } else {
      document.cookie = `googtrans=/en/${selected}; path=/; max-age=31536000; SameSite=Lax`;
      if (domain && domain !== 'localhost') {
        document.cookie = `googtrans=/en/${selected}; path=/; domain=${domain}; max-age=31536000; SameSite=Lax`;
        if (domain.includes('.')) {
          const rootDomain = domain.split('.').slice(-2).join('.');
          document.cookie = `googtrans=/en/${selected}; path=/; domain=.${rootDomain}; max-age=31536000; SameSite=Lax`;
        }
      }
    }

    if (selected === current) return;

    // Trigger DOM update
    triggerCombo(selected);
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  return (
    <>
      {/* Trigger Button Styled for SmritiSetu: Globe icon + only language name (e.g. EN) */}
      <button
        type="button"
        onClick={openModal}
        className={`notranslate inline-flex items-center justify-center gap-2 h-10 px-4 rounded-full bg-white text-xs font-semibold text-[#1E4334] border border-[#1E4334]/20 hover:bg-[#F7F5F0] hover:border-[#1E4334]/35 transition-all focus:outline-none shadow-xs cursor-pointer active:scale-95 tracking-wide ${className}`}
        translate="no"
        title={`Language: ${currentLangObj.name} (${currentLangObj.nativeName || currentLangObj.name})`}
        aria-label="Select Language"
      >
        <Globe className="w-4 h-4 text-[#1E4334] shrink-0 notranslate" />
        <span className="font-semibold text-[#1E4334] text-xs uppercase tracking-wider notranslate">
          {currentLangObj.code.toUpperCase()}
        </span>
      </button>

      {/* Language Selection Modal (Rendered via React Portal directly into body for perfect center positioning) */}
      {isModalOpen && isMounted && typeof document !== 'undefined' && createPortal(
        <div
          data-lenis-prevent="true"
          className="notranslate fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 bg-[#12241C]/75 backdrop-blur-sm animate-in fade-in duration-150 w-screen h-screen overflow-y-auto overscroll-contain"
          translate="no"
          onClick={closeModal}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          <div
            data-lenis-prevent="true"
            className="notranslate relative bg-[#FAF7F2] rounded-2xl shadow-[0_25px_60px_-15px_rgba(18,36,28,0.5)] w-full max-w-4xl lg:max-w-5xl border border-[#1E4334]/20 overflow-hidden flex flex-col my-auto animate-in zoom-in-95 duration-150"
            translate="no"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="notranslate flex justify-between items-start px-6 py-4 border-b border-[#1E4334]/10 bg-white shrink-0" translate="no">
              <div className="notranslate" translate="no">
                <div className="flex items-center gap-2 mb-0.5 notranslate" translate="no">
                  <span className="w-2 h-2 rounded-full bg-[#D97706] notranslate"></span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E4334] notranslate" translate="no">
                    Bhasha / Language Selection
                  </span>
                </div>
                <h2 className="notranslate font-serif text-2xl font-bold text-[#1E4334] leading-tight" translate="no">
                  Select Language
                </h2>
                <p className="notranslate text-xs text-[#1F1914]/70 mt-0.5" translate="no">
                  Choose your regional dialect for real-time translation across all surfaces
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="notranslate p-2 rounded-full text-[#1F1914]/60 hover:text-[#1E4334] hover:bg-[#1E4334]/10 transition-colors cursor-pointer"
                translate="no"
                aria-label="Close"
              >
                <X className="w-5 h-5 notranslate" />
              </button>
            </div>

            {/* Modal Language Grid - Horizontally wide 4-column layout that eliminates scrolling */}
            <div data-lenis-prevent="true" className="notranslate p-5 overflow-y-auto max-h-[calc(85vh-140px)]" translate="no">
              <div className="notranslate grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5" translate="no">
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSelected = tempSelectedLang === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setTempSelectedLang(lang.code)}
                      className={`notranslate flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-2 border-[#1E4334] bg-white shadow-sm ring-1 ring-[#1E4334]/20'
                          : 'border-[#1E4334]/12 bg-white/75 hover:bg-white hover:border-[#1E4334]/30'
                      }`}
                      translate="no"
                    >
                      <div className="notranslate flex items-center gap-2.5 min-w-0" translate="no">
                        <span
                          className={`notranslate text-[11px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                            isSelected
                              ? 'bg-[#1E4334] text-white'
                              : 'bg-[#1E4334]/8 text-[#1E4334]'
                          }`}
                          translate="no"
                        >
                          {lang.code.toUpperCase()}
                        </span>
                        <div className="notranslate flex flex-col min-w-0" translate="no">
                          <span
                            className={`notranslate text-xs font-semibold truncate ${
                              isSelected ? 'text-[#1E4334] font-bold' : 'text-[#1F1914]'
                            }`}
                            translate="no"
                          >
                            {lang.name}
                          </span>
                          {lang.nativeName && (
                            <span
                              className={`notranslate text-[11px] truncate ${
                                isSelected ? 'text-[#D97706] font-medium' : 'text-[#1F1914]/60'
                              }`}
                              translate="no"
                            >
                              {lang.nativeName}
                            </span>
                          )}
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#1E4334] text-white flex items-center justify-center shrink-0 ml-1.5 notranslate" translate="no">
                          <Check className="w-3 h-3 notranslate" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="notranslate px-6 py-3.5 border-t border-[#1E4334]/10 bg-white flex items-center gap-3 justify-between shrink-0" translate="no">
              <span className="text-xs text-[#1F1914]/60 notranslate" translate="no">
                Active: <strong className="text-[#1E4334] notranslate">{currentLangObj.name} ({currentLangObj.code.toUpperCase()})</strong>
              </span>
              <button
                type="button"
                onClick={applyLanguage}
                className="notranslate inline-flex items-center justify-center bg-[#1E4334] hover:bg-[#142F24] text-white font-semibold text-xs tracking-wide py-2.5 px-6 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
                translate="no"
              >
                Apply Language Change
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Hidden Engine anchor in case it wasn't pre-appended */}
      <div id="google_translate_hidden_element" className="hidden-translate-engine notranslate" translate="no"></div>
    </>
  );
};

export default GoogleTranslate;
