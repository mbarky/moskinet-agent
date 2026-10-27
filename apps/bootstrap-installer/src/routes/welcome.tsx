import { type CSSProperties } from 'react'

import { BrandMark } from '../components/brand-mark'
import { HackeryButton } from '../components/hackery-button'
import { startInstall } from '../store'

/*
 * Welcome screen.
 *
 * Mirrors the desktop's chat intro (apps/desktop/src/components/chat/intro.tsx):
 *   - Moski.net mark over a MOSKI.NET wordmark (".NET" in brand gold), Collapse Bold, tracked
 *   - mix-blend-plus-lighter so the type "glows" on the canvas
 *   - fit-text utility so the wordmark sizes itself to the column
 *
 * No install-path footer. The default install location is correct for
 * 99% of users; the rest will use the CLI installer with a -HermesHome
 * flag. Showing %LOCALAPPDATA% to grandma is developer-brain.
 */
export default function Welcome() {
  return (
    <div className="hermes-fade-in flex h-full flex-col items-center justify-center gap-10 px-12 py-10">
      {/* Hero — same recipe the desktop's chat/intro.tsx uses */}
      <div className="w-full max-w-2xl min-w-0 text-center">
        <BrandMark className="mx-auto mb-6 h-20 w-auto" />
        <p
          className="fit-text mx-auto mb-4 w-full font-['Collapse'] font-bold uppercase leading-[0.9] tracking-[0.08em] text-midground mix-blend-plus-lighter dark:text-foreground/90"
          style={
            {
              '--fit-text-line-height': '0.9',
              '--fit-text-max': '6rem',
              '--fit-text-min': '2.5rem'
            } as CSSProperties
          }
        >
          <span>
            <span>MOSKI<span className="text-[#c58b3b]">.NET</span></span>
          </span>
          <span aria-hidden="true">MOSKI.NET</span>
        </p>

        <p className="m-0 text-center text-base leading-normal tracking-tight text-muted-foreground">
          Your trading and commerce agent. We&rsquo;ll set things up in the
          background &mdash; takes a few minutes.
        </p>
      </div>

      <HackeryButton label="Install" onClick={() => void startInstall()} />
    </div>
  )
}
