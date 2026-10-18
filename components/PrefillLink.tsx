'use client';

import type { ReactNode } from 'react';

import { PREFILL_EVENT, type Interest, type PrefillDetail } from '@/lib/content';

interface PrefillLinkProps {
  interest: Interest;
  comment?: string;
  className?: string;
  children: ReactNode;
}

/** Ссылка на форму, которая заодно подставляет в неё выбор: «подписка» или «Эфиопия, 1 пачка». */
export function PrefillLink({ interest, comment, className, children }: PrefillLinkProps) {
  return (
    <a
      href="#zayavka"
      className={className}
      onClick={() => {
        const detail: PrefillDetail = { interest, comment };
        window.dispatchEvent(new CustomEvent<PrefillDetail>(PREFILL_EVENT, { detail }));
      }}
    >
      {children}
    </a>
  );
}
