import * as React from 'react';
import type { Branding, Router } from '@toolpad/core';

export const BrandingContext = React.createContext<Branding | null>(null);
export const RouterContext = React.createContext<Router | null>(null);
