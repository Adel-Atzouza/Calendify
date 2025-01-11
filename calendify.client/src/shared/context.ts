import * as React from 'react';
import type { Branding, Router } from '@toolpad/core';

export interface BrandingContextValue {
  branding: Branding | null;
  setBranding: (session: Branding | null) => void;
}

export const BrandingContext = React.createContext<BrandingContextValue>({
    branding: {},
    setBranding: () => {},
});
export const RouterContext = React.createContext<Router | null>(null);




export function useBranding() {
  return React.useContext(BrandingContext);
}