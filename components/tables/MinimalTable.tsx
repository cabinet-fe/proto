import { useState } from 'react'
import { Edit2, Trash2, Plus, Check, X } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs))
}

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive' | 'Pending'
}

const initialData: User[] = [
  { id: '1', name: 'Alex Morgan', email: 'alex@example.com', role: 'Designer', status: 'Active' },
  { id: '2', name: 'Sarah Connor', email: 'sarah@example.com', role: 'Developer', status: 'Active' },
  { id: '3', name: 'John Doe', email: 'john@example.com', role: 'Manager', status: 'Inactive' },
  { id: '4', name: 'Emily Blunt', email: 'emily@example.com', role: 'Designer', status: 'Pending' },
  { id: '5', name: 'Michael Scott', email: 'michael@example.com', role: 'Manager', status: 'Active' },
]

export const MinimalTable = () => {
  const [data, setData] = useState<User[]>(initialData)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<User | null>(null)

  const handleEdit = (user: User) => {
    setEditingId(user.id)
    setEditForm({ ...user })
  }

  const handleSave = () => {
    if (editForm) {
      setData(data.map(item => (item.id === editForm.id ? editForm : item)))
      setEditingId(null)
      setEditForm(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const handleDelete = (id: string) => {
    setData(data.filter(item => item.id !== id))
  }

  const handleChange = (field: keyof User, value: string) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value })
    }
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">团队成员 (极简模式)</h3>
        <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
          <Plus size={16} />
          添加成员
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-50 text-gray-400 font-medium">
              <th className="px-6 py-3 font-normal">姓名</th>
              <th className="px-6 py-3 font-normal">邮箱</th>
              <th className="px-6 py-3 font-normal">角色</th>
              <th className="px-6 py-3 font-normal">状态</th>
              <th className="px-6 py-3 font-normal w-20 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map(user => (
              <tr
                key={user.id}
                className={cn(
                  "group transition-colors hover:bg-gray-50/50",
                  editingId === user.id && "bg-blue-50/30"
                )}
              >
                {/* Name */}
                <td className="px-6 py-3">
                  {editingId === user.id ? (
                    <input
                      type="text"
                      className="w-full bg-white border border-blue-200 rounded px-2 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder-transparent"
                      value={editForm?.name}
                      onChange={e => handleChange('name', e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <div className="font-medium text-gray-700">{user.name}</div>
                  )}
                </td>

                {/* Email */}
                <td className="px-6 py-3">
                  {editingId === user.id ? (
                    <input
                      type="text"
                      className="w-full bg-white border border-blue-200 rounded px-2 py-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      value={editForm?.email}
                      onChange={e => handleChange('email', e.target.value)}
                    />
                  ) : (
                    <div className="text-gray-500">{user.email}</div>
                  )}
                </td>

                {/* Role */}
                <td className="px-6 py-3">
                  {editingId === user.id ? (
                    <select
                      className="w-full bg-white border border-blue-200 rounded px-2 py-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      value={editForm?.role}
                      onChange={e => handleChange('role', e.target.value)}
                    >
                      <option>Designer</option>
                      <option>Developer</option>
                      <option>Manager</option>
                    </select>
                  ) : (
                    <div className="text-gray-600">{user.role}</div>
                  )}
                </td>

                {/* Status */}
                <td className="px-6 py-3">
                  {editingId === user.id ? (
                     <select
                     className="w-full bg-white border border-blue-200 rounded px-2 py-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                     value={editForm?.status}
                     onChange={e => handleChange('status', e.target.value as any)}
                   >
                     <option>Active</option>
                     <option>Inactive</option>
                     <option>Pending</option>
                   </select>
                  ) : (
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                      user.status === 'Active' && "bg-green-50 text-green-700",
                      user.status === 'Inactive' && "bg-gray-100 text-gray-600",
                      user.status === 'Pending' && "bg-yellow-50 text-yellow-700"
                    )}>
                      {user.status}
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-3 text-right">
                  {editingId === user.id ? (
                    <div className="flex items-center justify-end gap-2">
                       <button
                        onClick={handleSave}
                        className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Save"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="p-1 text-gray-400 hover:bg-gray-100 rounded transition-colors"
                        title="Cancel"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
