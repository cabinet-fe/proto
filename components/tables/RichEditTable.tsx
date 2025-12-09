import { useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Plus, GripVertical, User as UserIcon } from 'lucide-react'

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs))
}

interface Task {
    id: string
    title: string
    assignee: string
    priority: 'High' | 'Medium' | 'Low'
    dueDate: string
    budget: number
    tags: string[]
}

const initialData: Task[] = [
    { id: '1', title: 'Design System Update', assignee: 'Alex', priority: 'High', dueDate: '2025-10-24', budget: 5000, tags: ['Design', 'Core'] },
    { id: '2', title: 'Q4 Marketing Campaign', assignee: 'Sarah', priority: 'Medium', dueDate: '2025-11-01', budget: 12000, tags: ['Marketing'] },
    { id: '3', title: 'Mobile App Refactor', assignee: 'John', priority: 'High', dueDate: '2025-12-15', budget: 25000, tags: ['Dev', 'Mobile'] },
    { id: '4', title: 'User Research Interviews', assignee: 'Emily', priority: 'Low', dueDate: '2025-10-30', budget: 3000, tags: ['Research'] },
]

export const RichEditTable = () => {
    const [data, setData] = useState<Task[]>(initialData)

    const handleChange = (id: string, field: keyof Task, value: any) => {
        setData(data.map(item => item.id === id ? { ...item, [field]: value } : item))
    }

    return (
        <div className="w-full bg-white ring-1 ring-gray-200 sm:rounded-lg">
             <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50/50">
                <h3 className="text-base font-semibold leading-6 text-gray-900">项目任务 (Rich Edit)</h3>
                <button className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <Plus className="-ml-0.5 h-4 w-4" aria-hidden="true" />
                    新建任务
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="w-8 py-3 pl-4 pr-3 sm:pl-6">
                                <span className="sr-only">Drag</span>
                            </th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">任务标题</th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">负责人</th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">优先级</th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">截止日期</th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">预算</th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">标签</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {data.map((task) => (
                            <tr key={task.id} className="group hover:bg-gray-50 transition-colors">
                                {/* Drag Handle */}
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6 text-gray-400 cursor-grab active:cursor-grabbing">
                                    <GripVertical size={16} />
                                </td>

                                {/* Title Input */}
                                <td className="whitespace-nowrap px-3 py-2">
                                    <input
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent"
                                        value={task.title}
                                        onChange={(e) => handleChange(task.id, 'title', e.target.value)}
                                    />
                                </td>

                                {/* Assignee */}
                                <td className="whitespace-nowrap px-3 py-2">
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                            <UserIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 pl-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={task.assignee}
                                            onChange={(e) => handleChange(task.id, 'assignee', e.target.value)}
                                        />
                                    </div>
                                </td>

                                {/* Priority Select */}
                                <td className="whitespace-nowrap px-3 py-2">
                                    <select
                                        className={cn(
                                            "block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-medium",
                                            task.priority === 'High' && "text-red-700 bg-red-50",
                                            task.priority === 'Medium' && "text-amber-700 bg-amber-50",
                                            task.priority === 'Low' && "text-green-700 bg-green-50",
                                        )}
                                        value={task.priority}
                                        onChange={(e) => handleChange(task.id, 'priority', e.target.value)}
                                    >
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </td>

                                {/* Due Date */}
                                <td className="whitespace-nowrap px-3 py-2">
                                    <div className="relative">
                                         <input
                                            type="date"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={task.dueDate}
                                            onChange={(e) => handleChange(task.id, 'dueDate', e.target.value)}
                                        />
                                    </div>
                                </td>

                                {/* Budget */}
                                <td className="whitespace-nowrap px-3 py-2">
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                            <span className="text-gray-500 sm:text-sm">$</span>
                                        </div>
                                        <input
                                            type="number"
                                            className="block w-full rounded-md border-0 py-1.5 pl-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-right"
                                            value={task.budget}
                                            onChange={(e) => handleChange(task.id, 'budget', parseInt(e.target.value))}
                                        />
                                    </div>
                                </td>

                                {/* Tags */}
                                <td className="whitespace-nowrap px-3 py-2">
                                    <div className="flex gap-1 flex-wrap">
                                        {task.tags.map(tag => (
                                            <span key={tag} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                                {tag}
                                            </span>
                                        ))}
                                         <button className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium bg-white text-gray-400 border border-dashed border-gray-300 hover:text-indigo-600 hover:border-indigo-300">
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             <div className="p-4 border-t border-gray-200 bg-gray-50">
                 <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center gap-1">
                     <Plus size={16} /> Add new row
                 </button>
             </div>
        </div>
    )
}
