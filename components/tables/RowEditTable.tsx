import React, { useState, useEffect, useRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Check, X, Edit2, Archive, ChevronDown } from 'lucide-react'

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs))
}

export interface Product {
    id: string
    sku: string
    name: string
    category: string
    stock: number
    price: number
    status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

const initialData: Product[] = [
    { id: '1', sku: 'SKU-001', name: 'Ergonomic Chair', category: 'Furniture', stock: 45, price: 299.00, status: 'In Stock' },
    { id: '2', sku: 'SKU-002', name: 'Mechanical Keyboard', category: 'Electronics', stock: 12, price: 159.00, status: 'Low Stock' },
    { id: '3', sku: 'SKU-003', name: 'USB-C Docking Station', category: 'Electronics', stock: 0, price: 89.99, status: 'Out of Stock' },
    { id: '4', sku: 'SKU-004', name: 'Standing Desk', category: 'Furniture', stock: 28, price: 499.00, status: 'In Stock' },
    { id: '5', sku: 'SKU-005', name: 'Monitor Arm', category: 'Accessories', stock: 65, price: 49.50, status: 'In Stock' },
]

export const RowEditTable = () => {
    const [data, setData] = useState<Product[]>(initialData)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editForm, setEditForm] = useState<Product | null>(null)

    // Focus management for edit mode
    const firstInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (editingId && firstInputRef.current) {
            firstInputRef.current.focus()
        }
    }, [editingId])

    const startEdit = (product: Product) => {
        setEditingId(product.id)
        setEditForm({ ...product })
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditForm(null)
    }

    const saveEdit = () => {
        if (editForm) {
            setData(data.map(item => item.id === editForm.id ? editForm : item))
            setEditingId(null)
            setEditForm(null)
        }
    }

    const handleChange = (field: keyof Product, value: any) => {
        if (editForm) {
            setEditForm({ ...editForm, [field]: value })
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
             e.preventDefault()
             saveEdit()
        } else if (e.key === 'Escape') {
             cancelEdit()
        }
    }

    return (
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                <div>
                    <h3 className="font-semibold text-gray-900">库存管理 (行级编辑)</h3>
                    <p className="text-xs text-gray-500 mt-0.5">点击行或编辑按钮进行修改，支持 Tab 切换字段</p>
                </div>
                <div className="text-sm text-gray-500">
                    共 {data.length} 条记录
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3 w-32">SKU</th>
                            <th className="px-4 py-3 max-w-[200px]">产品名称</th>
                            <th className="px-4 py-3 w-32">分类</th>
                            <th className="px-4 py-3 w-24 text-right">库存</th>
                            <th className="px-4 py-3 w-28 text-right">价格</th>
                            <th className="px-4 py-3 w-32">状态</th>
                            <th className="px-4 py-3 w-24 text-center">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((item) => {
                            const isEditing = editingId === item.id
                            return (
                                <tr
                                    key={item.id}
                                    className={cn(
                                        "group transition-all duration-200",
                                        isEditing ? "bg-blue-50/40 shadow-inner" : "hover:bg-gray-50"
                                    )}
                                    onDoubleClick={() => !isEditing && startEdit(item)}
                                >
                                    {/* SKU */}
                                    <td className="px-4 py-3">
                                        {isEditing ? (
                                            <input
                                                ref={firstInputRef}
                                                type="text"
                                                className="w-full bg-white border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm font-mono"
                                                value={editForm?.sku}
                                                onChange={e => handleChange('sku', e.target.value)}
                                                onKeyDown={handleKeyDown}
                                            />
                                        ) : (
                                            <span className="font-mono text-gray-600 text-xs">{item.sku}</span>
                                        )}
                                    </td>

                                    {/* Name */}
                                    <td className="px-4 py-3">
                                        {isEditing ? (
                                             <input
                                                type="text"
                                                className="w-full bg-white border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                                                value={editForm?.name}
                                                onChange={e => handleChange('name', e.target.value)}
                                                onKeyDown={handleKeyDown}
                                            />
                                        ) : (
                                            <span className="font-medium text-gray-900">{item.name}</span>
                                        )}
                                    </td>

                                    {/* Category */}
                                    <td className="px-4 py-3">
                                        {isEditing ? (
                                            <div className="relative">
                                                <select
                                                    className="w-full bg-white border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm appearance-none pr-8"
                                                    value={editForm?.category}
                                                    onChange={e => handleChange('category', e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                >
                                                    <option>Furniture</option>
                                                    <option>Electronics</option>
                                                    <option>Accessories</option>
                                                </select>
                                                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            </div>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                                                {item.category}
                                            </span>
                                        )}
                                    </td>

                                    {/* Stock */}
                                    <td className="px-4 py-3 text-right">
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                className="w-full bg-white border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm text-right"
                                                value={editForm?.stock}
                                                onChange={e => handleChange('stock', parseInt(e.target.value) || 0)}
                                                onKeyDown={handleKeyDown}
                                            />
                                        ) : (
                                            <span className={cn(
                                                item.stock === 0 ? "text-red-500 font-medium" :
                                                item.stock < 20 ? "text-amber-600" : "text-gray-700"
                                            )}>
                                                {item.stock}
                                            </span>
                                        )}
                                    </td>

                                    {/* Price */}
                                    <td className="px-4 py-3 text-right">
                                         {isEditing ? (
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="w-full bg-white border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm text-right"
                                                value={editForm?.price}
                                                onChange={e => handleChange('price', parseFloat(e.target.value) || 0)}
                                                onKeyDown={handleKeyDown}
                                            />
                                        ) : (
                                            <span className="text-gray-900 font-mono tracking-tight text-xs">
                                                ${item.price.toFixed(2)}
                                            </span>
                                        )}
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-3">
                                        {isEditing ? (
                                            <div className="relative">
                                                 <select
                                                    className="w-full bg-white border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm appearance-none pr-8"
                                                    value={editForm?.status}
                                                    onChange={e => handleChange('status', e.target.value as any)}
                                                    onKeyDown={handleKeyDown}
                                                >
                                                    <option>In Stock</option>
                                                    <option>Low Stock</option>
                                                    <option>Out of Stock</option>
                                                </select>
                                                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            </div>
                                        ) : (
                                            <span className={cn(
                                                "inline-flex items-center gap-1.5",
                                                item.status === 'In Stock' && "text-emerald-600",
                                                item.status === 'Low Stock' && "text-amber-600",
                                                item.status === 'Out of Stock' && "text-red-600"
                                            )}>
                                                <span className={cn(
                                                    "w-1.5 h-1.5 rounded-full",
                                                    item.status === 'In Stock' && "bg-emerald-500",
                                                    item.status === 'Low Stock' && "bg-amber-500",
                                                    item.status === 'Out of Stock' && "bg-red-500"
                                                )}></span>
                                                {item.status}
                                            </span>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-3 text-center">
                                        {isEditing ? (
                                            <div className="flex items-center justify-center gap-1">
                                                <button
                                                    onClick={saveEdit}
                                                    className="p-1 rounded bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-colors"
                                                    title="Save (Enter)"
                                                >
                                                    <Check size={14} />
                                                </button>
                                                <button
                                                    onClick={cancelEdit}
                                                    className="p-1 rounded bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                                                    title="Cancel (Esc)"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => startEdit(item)}
                                                    className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    className="text-gray-400 hover:text-red-600 transition-colors p-1"
                                                >
                                                    <Archive size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 text-xs text-gray-500 flex justify-between items-center">
                <div>
                   Tip: 双击行进入编辑模式，Enter 保存，Esc 取消
                </div>
                <div className="flex gap-2">
                    <button className="px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-50" disabled>上一页</button>
                    <button className="px-2 py-1 rounded hover:bg-gray-200">下一页</button>
                </div>
            </div>
        </div>
    )
}
