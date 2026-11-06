'use client';

import { useCallback, useEffect, useState } from 'react';
import Backdrop from '@/components/stage/Backdrop';
import AnimeVFX from '@/components/stage/AnimeVFX';
import CharacterStage from '@/components/stage/CharacterStage';
import Billboard from '@/components/sections/Billboard';
import About, { Flight } from '@/components/sections/About';
import Arsenal from '@/components/sections/Arsenal';
import ShinobiProfile from '@/components/sections/ShinobiProfile';
import JutsuScroll from '@/components/sections/JutsuScroll';
import Missions from '@/components/sections/Missions';
import Honors from '@/components/sections/Honors';
import Journey from '@/components/sections/Journey';
import ShinobiCode from '@/components/sections/ShinobiCode';
import Finale from '@/components/sections/Finale';
import Intro from '@/components/ui/Intro';
import TopNav from '@/components/ui/TopNav';
import Cursor from '@/components/ui/Cursor';
import ChakraMode from '@/components/ui/ChakraMode';
import SmoothScroll, { setScrollLocked } from '@/components/ui/SmoothScroll';
import { loadFrames } from '@/lib/frames';
import { live } from '@/lib/store';

export default function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadFrames();
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    setScrollLocked(true);
    const move = (e: PointerEvent) => {
      live.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      live.mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  const done = useCallback(() => {
    setReady(true);
    setScrollLocked(false);
  }, []);

  return (
    <>
      <SmoothScroll />
      <Backdrop />
      <AnimeVFX />
      <CharacterStage />
      <Cursor />
      <TopNav show={ready} />
      <main className="content" id="top">
        <Billboard ready={ready} />
        <Flight />
        <About />
        <div className="solid-zone">
          <ShinobiProfile />
          <Arsenal />
          <JutsuScroll />
          <Missions />
          <Honors />
          <Journey />
          <ShinobiCode />
          <Finale />
        </div>
      </main>
      <ChakraMode />
      {!ready && <Intro onDone={done} />}
    </>
  );
}
