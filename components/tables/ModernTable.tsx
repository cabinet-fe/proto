import { useState } from 'react'
import { MoreVertical, Filter, Search, Mail, Phone, Calendar } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs))
}

interface Lead {
  id: string
  name: string
  company: string
  email: string
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal'
  value: number
  lastContact: string
  avatar: string
}

const initialData: Lead[] = [
  { id: '1', name: 'Esther Howard', company: 'Barone LLC', email: 'esther@barone.com', status: 'New', value: 12500, lastContact: '2 days ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Esther' },
  { id: '2', name: 'Cameron Williamson', company: 'Gislason', email: 'cameron@gislason.com', status: 'Contacted', value: 8900, lastContact: '5 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cameron' },
  { id: '3', name: 'Brooklyn Simmons', company: 'Bogan-Dicki', email: 'brooklyn@bogan.com', status: 'Qualified', value: 45000, lastContact: '1 day ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Brooklyn' },
  { id: '4', name: 'Leslie Alexander', company: 'Hegmann', email: 'leslie@hegmann.com', status: 'Proposal', value: 28000, lastContact: '3 days ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leslie' },
]

export const ModernTable = () => {
  const [data] = useState<Lead[]>(initialData)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedIds)
    if (newSelection.has(id)) {
      newSelection.delete(id)
    } else {
      newSelection.add(id)
    }
    setSelectedIds(newSelection)
  }

  const toggleAll = () => {
    if (selectedIds.size === data.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(data.map(d => d.id)))
    }
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
      {/* Header / Toolbar */}
      <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h3 className="text-lg font-bold text-gray-900">销售线索 (Hybrid)</h3>
           <p className="text-sm text-gray-500">管理潜在客户与商机状态。</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="搜索线索..."
              className="pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 w-64 md:w-64"
            />
          </div>
          <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg border border-gray-200">
            <Filter size={16} />
          </button>
          <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-all hover:shadow-indigo-100">
            + 新建线索
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="w-12 px-4 py-3">
                 <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={data.length > 0 && selectedIds.size === data.length}
                    onChange={toggleAll}
                 />
              </th>
              <th className="px-4 py-3 font-medium text-gray-500">客户信息</th>
              <th className="px-4 py-3 font-medium text-gray-500">状态</th>
              <th className="px-4 py-3 font-medium text-gray-500">预估价值</th>
              <th className="px-4 py-3 font-medium text-gray-500">最近联系</th>
              <th className="w-12 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map(lead => (
              <tr
                key={lead.id}
                className={cn(
                    "group hover:bg-indigo-50/30 transition-colors cursor-pointer",
                    selectedIds.has(lead.id) && "bg-indigo-50/50"
                )}
                onClick={() => toggleSelection(lead.id)}
              >
                <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <input
                        type="checkbox"
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={selectedIds.has(lead.id)}
                        onChange={() => toggleSelection(lead.id)}
                    />
                </td>

                {/* User Info */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={lead.avatar}
                      alt=""
                      className="w-9 h-9 rounded-full bg-gray-100 object-cover border border-gray-200"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{lead.name}</div>
                      <div className="text-xs text-gray-500">{lead.company}</div>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                   <div className={cn(
                       "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border",
                       lead.status === 'New' && "bg-blue-50 text-blue-700 border-blue-100",
                       lead.status === 'Contacted' && "bg-amber-50 text-amber-700 border-amber-100",
                       lead.status === 'Qualified' && "bg-emerald-50 text-emerald-700 border-emerald-100",
                       lead.status === 'Proposal' && "bg-purple-50 text-purple-700 border-purple-100"
                   )}>
                     <span className={cn(
                         "w-1.5 h-1.5 rounded-full",
                         lead.status === 'New' && "bg-blue-400",
                         lead.status === 'Contacted' && "bg-amber-400",
                         lead.status === 'Qualified' && "bg-emerald-400",
                         lead.status === 'Proposal' && "bg-purple-400"
                     )}></span>
                     {lead.status}
                   </div>
                </td>

                {/* Value */}
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">${lead.value.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">USD</div>
                </td>

                {/* Last Contact */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Calendar size={14} />
                    <span>{lead.lastContact}</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Email">
                        <Mail size={16} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Call">
                        <Phone size={16} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                        <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 bg-gray-50/30">
            <div>
                Selected: {selectedIds.size} of {data.length}
            </div>
            <div className="flex gap-2">
                <button className="hover:text-gray-900 disabled:opacity-50" disabled>Previous</button>
                <div className="h-4 w-px bg-gray-200"></div>
                <button className="hover:text-gray-900">Next</button>
            </div>
        </div>
      </div>
    </div>
  )
}
