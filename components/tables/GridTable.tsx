import React, { useState, useEffect, useRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs))
}

// Generate some dummy data
const ROWS = 20
const COLS = 6
const COL_HEADERS = ['A', 'B', 'C', 'D', 'E', 'F']

type CellValue = string
type GridData = CellValue[][]

const initialData: GridData = Array.from({ length: ROWS }, (_, r) =>
  Array.from({ length: COLS }, (_, c) => `R${r + 1}C${c + 1}`)
)

export const GridTable = () => {
  const [data, setData] = useState<GridData>(initialData)
  const [selected, setSelected] = useState<{ r: number; c: number } | null>(null)
  const [editing, setEditing] = useState<{ r: number; c: number } | null>(null)
  const [editValue, setEditValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Focus input when entering edit mode
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editing])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (editing) {
      if (e.key === 'Enter') {
        saveEdit()
      } else if (e.key === 'Escape') {
        setEditing(null)
      }
      return
    }

    if (!selected) return

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        setSelected(prev => (prev ? { ...prev, r: Math.max(0, prev.r - 1) } : null))
        break
      case 'ArrowDown':
        e.preventDefault()
        setSelected(prev => (prev ? { ...prev, r: Math.min(ROWS - 1, prev.r + 1) } : null))
        break
      case 'ArrowLeft':
        e.preventDefault()
        setSelected(prev => (prev ? { ...prev, c: Math.max(0, prev.c - 1) } : null))
        break
      case 'ArrowRight':
        e.preventDefault()
        setSelected(prev => (prev ? { ...prev, c: Math.min(COLS - 1, prev.c + 1) } : null))
        break
      case 'Enter':
        e.preventDefault()
        startEdit(selected.r, selected.c)
        break
      default:
        // Start typing directly to edit
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            setEditValue(e.key)
            startEdit(selected.r, selected.c, e.key)
        }
        break
    }
  }

  const startEdit = (r: number, c: number, initialVal?: string) => {
    setEditing({ r, c })
    setEditValue(initialVal !== undefined ? initialVal : data[r][c])
  }

  const saveEdit = () => {
    if (editing) {
      const newData = [...data]
      newData[editing.r] = [...newData[editing.r]]
      newData[editing.r][editing.c] = editValue
      setData(newData)
      setEditing(null)
      // Focus back to container to keep keyboard nav working
      containerRef.current?.focus()
    }
  }

  return (
    <div
      className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col"
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={() => {
        // If clicking outside grid, maybe clear selection or keep it?
        // For now, ensure focus for keyboard events
      }}
    >
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center text-xs text-gray-500">
        <div>
          {selected ? `${COL_HEADERS[selected.c]}${selected.r + 1}` : 'Ready'}
        </div>
        <div>
          {editing ? 'Editing' : 'Navigation Mode (Arrow keys)'}
        </div>
      </div>

      <div className="overflow-auto max-h-[500px] relative">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-gray-100">
            <tr>
              <th className="w-10 bg-gray-100 border-r border-b border-gray-300"></th>
              {COL_HEADERS.map((header, i) => (
                 <th
                    key={i}
                    className={cn(
                        "w-32 border-r border-b border-gray-300 px-2 py-1 text-center text-xs font-semibold text-gray-600 select-none",
                        selected?.c === i && "bg-blue-100 text-blue-700"
                    )}
                 >
                    {header}
                 </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, r) => (
              <tr key={r}>
                <td
                    className={cn(
                        "sticky left-0 bg-gray-100 border-r border-b border-gray-300 text-center text-xs text-gray-500 select-none",
                        selected?.r === r && "bg-blue-100 text-blue-700 font-semibold"
                    )}
                >
                    {r + 1}
                </td>
                {row.map((cell, c) => {
                  const isSelected = selected?.r === r && selected?.c === c
                  const isEditing = editing?.r === r && editing?.c === c

                  return (
                    <td
                      key={c}
                      className={cn(
                        "border-r border-b border-gray-200 h-8 relative p-0 cursor-cell text-sm text-gray-700",
                        isSelected && !isEditing && "outline outline-2 outline-blue-500 z-10 bg-blue-50/20"
                      )}
                      onClick={() => setSelected({ r, c })}
                      onDoubleClick={() => startEdit(r, c)}
                    >
                      {isEditing ? (
                        <input
                          ref={inputRef}
                          type="text"
                          className="absolute inset-0 w-full h-full px-2 py-1 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 z-20 text-sm"
                          value={editValue}
                          onChange={e => setEditValue(e.target.value)}
                          onBlur={saveEdit}
                        />
                      ) : (
                        <div className="px-2 py-1 w-full h-full whitespace-nowrap overflow-hidden text-ellipsis select-none">
                            {cell}
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
