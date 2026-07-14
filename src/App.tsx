import React, { useEffect, useMemo, useState } from 'react';
import { Layout } from './components/layout/Layout.tsx';
import { Home } from './pages/Home.tsx';
import { Exhibitions } from './pages/Exhibitions.tsx';
import { Collection } from './pages/Collection.tsx';
import { Journal } from './pages/Journal.tsx';
import { Visit } from './pages/Visit.tsx';
import { NotFound } from './pages/NotFound.tsx';
import { parseHash } from './lib/utils.ts';
import { ScrollTrigger } from './lib/gsap.ts';

export function App() {
  const [route, setRoute] = useState(parseHash());

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'auto' });
      window.setTimeout(() => ScrollTrigger.refresh(), 50);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const page = useMemo(() => {
    switch (route.path) {
      case '/':
        return <Home />;
      case '/exhibitions':
        return <Exhibitions />;
      case '/collection':
        return <Collection />;
      case '/journal':
        return <Journal />;
      case '/visit':
        return <Visit />;
      default:
        return <NotFound />;
    }
  }, [route.path]);

  return <Layout path={route.path}>{page}</Layout>;
}
