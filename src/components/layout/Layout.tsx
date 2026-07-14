import React from 'react';
import { Header } from './Header.tsx';
import { Footer } from './Footer.tsx';
import { CursorFollower } from '../motion/CursorFollower.tsx';

interface LayoutProps {
  path: string;
  children: React.ReactNode;
}

export function Layout({ path, children }: LayoutProps) {
  return (
    <div>
      <CursorFollower />
      <Header path={path} />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
