import { type ReactNode } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { cn } from '../utils/cn'

interface ScrollProps {
  children: ReactNode
  className?: string
  viewportClassName?: string
  contentClassName?: string
}

export function Scroll({
  children,
  className,
  viewportClassName,
  contentClassName
}: ScrollProps) {
  return (
    <ScrollArea.Root className={cn('relative h-full w-full overflow-hidden', className)}>
      <ScrollArea.Viewport
        className={cn('h-full w-full rounded-[inherit]', viewportClassName)}
      >
        <div className={cn('min-h-full', contentClassName)}>{children}</div>
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar
        orientation='vertical'
        className='flex w-3 touch-none select-none p-[3px] transition-colors hover:bg-slate-500/10'
      >
        <ScrollArea.Thumb className='relative flex-1 rounded-full bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7),0_2px_8px_rgba(15,23,42,0.28)]' />
      </ScrollArea.Scrollbar>

      <ScrollArea.Scrollbar
        orientation='horizontal'
        className='flex h-3 touch-none select-none p-[3px] transition-colors hover:bg-slate-500/10'
      >
        <ScrollArea.Thumb className='relative flex-1 rounded-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7),0_2px_8px_rgba(15,23,42,0.28)]' />
      </ScrollArea.Scrollbar>

      <ScrollArea.Corner className='bg-slate-400/20' />
    </ScrollArea.Root>
  )
}
