"use client";

import { useState, useEffect, useCallback } from "react";
import { Language } from "@/types";

export function useLanguage() {
  const [lang, setLang] = useState<Language>("zh");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Language | null;
    if (stored === "en" || stored === "zh") {
      setLang(stored);
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "en" ? "zh" : "en";
      localStorage.setItem("lang", next);
      return next;
    });
  }, []);

  return { lang, toggleLang };
}
