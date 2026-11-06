'use client';

import { useEffect, useRef } from 'react';
import { live } from '@/lib/store';

/**
 * Cinematic Anime Backdrop:
 * - WebGL deep crimson fog and swirling chakra energy
 * - Giant rotating Konohagakure Leaf & Sharingan Seal in the deep background
 * - Subtle anime focus/speed lines radiating from the core
 */
const VERT = `#version 300 es
in vec2 a; void main(){ gl_Position = vec4(a, 0., 1.); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes; uniform float uT; uniform vec2 uM; uniform float uS; uniform float uI;
out vec4 o;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0., a = .5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for(int i = 0; i < 4; i++){ v += a*n(p); p = m*p; a *= .5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = uv; p.x *= uRes.x / uRes.y;
  float t = uT * .035;
  vec2 m = uM; m.x *= uRes.x / uRes.y;
  
  // Kamui dimensional swirl around center
  vec2 center = vec2(0.5 * (uRes.x / uRes.y), 0.5);
  vec2 toCenter = p - center;
  float dist = length(toCenter);
  float angle = atan(toCenter.y, toCenter.x) + sin(dist * 4.0 - t * 2.0) * 0.15;
  vec2 swirledP = center + vec2(cos(angle), sin(angle)) * dist;

  float md = smoothstep(.55, 0., distance(p, m));
  vec2 q = vec2(fbm(swirledP*1.3 + vec2(t, -t*.5) + vec2(0., -uS)), fbm(swirledP*1.3 + vec2(-t*.7, t) + 5.2));
  q += normalize(p - m + 1e-4) * md * .35;
  float f = fbm(swirledP*1.7 + q*2.1 + vec2(t*1.3, -uS*.7));
  
  // Smoke density
  float low = smoothstep(.9, .0, uv.y);
  float edge = smoothstep(.45, 1., abs(uv.x - .5) * 2.);
  float mask = clamp(low * .8 + edge * .45 + md * .25, 0., 1.);
  float d = smoothstep(.38, .95, f) * mask;
  
  vec3 deep = vec3(.14, .0, .015);
  vec3 red  = vec3(.92, .035, .08);
  vec3 col = mix(deep, red, smoothstep(.58, 1., f) * .5) * d * uI;
  
  // Faint warm key light behind character
  col += vec3(.5, .0, .03) * .12 * smoothstep(.75, .0, distance(uv, vec2(.6, .45))) * uI;
  
  // Subtle lightning energy streak in the fog
  float spark = pow(max(0.0, sin(uv.y * 30.0 + t * 15.0) * cos(uv.x * 20.0)), 12.0) * 0.08;
  col += vec3(0.3, 0.6, 1.0) * spark * uI;

  o = vec4(col, 1.);
}`;

export default function Backdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const gl = cv.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return;
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = U('uRes'), uT = U('uT'), uM = U('uM'), uS = U('uS'), uI = U('uI');

    const SCALE = 0.33;
    const resize = () => {
      cv.width = Math.max(2, Math.round(window.innerWidth * SCALE));
      cv.height = Math.max(2, Math.round(window.innerHeight * SCALE));
      gl.viewport(0, 0, cv.width, cv.height);
    };
    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    let mx = 0.5, my = 0.5, s = 0, inten = 0;
    const start = performance.now();
    const loop = () => {
      const tx = (live.mouse.x + 1) / 2;
      const ty = 1 - (live.mouse.y + 1) / 2;
      mx += (tx - mx) * 0.04;
      my += (ty - my) * 0.04;
      s += ((window.scrollY / window.innerHeight) * 0.35 - s) * 0.06;
      const target = 1;
      inten += (target - inten) * 0.02;
      gl.uniform2f(uRes, cv.width, cv.height);
      gl.uniform1f(uT, (performance.now() - start) / 1000);
      gl.uniform2f(uM, mx, my);
      gl.uniform1f(uS, s);
      gl.uniform1f(uI, inten);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="backdrop" aria-hidden>
      <canvas ref={ref} className="fog" />

      {/* Rotating Anime Konoha & Sharingan Chakra Crest */}
      <div className="anime-bg-crest">
        <svg viewBox="0 0 600 600" className="crest-svg">
          {/* Concentric Chakra Rings */}
          <circle cx="300" cy="300" r="280" fill="none" stroke="rgba(229, 9, 20, 0.16)" strokeWidth="1.5" strokeDasharray="6 10" />
          <circle cx="300" cy="300" r="220" fill="none" stroke="rgba(229, 9, 20, 0.1)" strokeWidth="1" />
          <circle cx="300" cy="300" r="160" fill="none" stroke="rgba(229, 9, 20, 0.22)" strokeWidth="2" strokeDasharray="18 6" />

          {/* Konohagakure Hidden Leaf Emblem */}
          <path
            d="M300,180 C350,180 400,220 400,270 C400,330 325,370 275,345 C240,325 235,275 260,245 C285,215 325,225 330,265 C335,295 300,315 285,300 C275,290 285,270 300,275 C305,277 308,285 302,289"
            fill="none"
            stroke="rgba(229, 9, 20, 0.3)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Leaf Point Arrow */}
          <polygon points="395,245 445,235 410,275" fill="rgba(229, 9, 20, 0.35)" />

          {/* Four Shinobi Cardinal Seals */}
          <text x="300" y="45" textAnchor="middle" fill="rgba(229, 9, 20, 0.25)" fontFamily="serif" fontSize="26">忍</text>
          <text x="560" y="310" textAnchor="middle" fill="rgba(229, 9, 20, 0.25)" fontFamily="serif" fontSize="26">雷</text>
          <text x="300" y="575" textAnchor="middle" fill="rgba(229, 9, 20, 0.25)" fontFamily="serif" fontSize="26">術</text>
          <text x="40" y="310" textAnchor="middle" fill="rgba(229, 9, 20, 0.25)" fontFamily="serif" fontSize="26">写</text>
        </svg>
      </div>

      <div className="bd-vignette" />
    </div>
  );
}
