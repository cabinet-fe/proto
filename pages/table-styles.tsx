import { MinimalTable } from '../components/tables/MinimalTable'
import { RowEditTable } from '../components/tables/RowEditTable'
import { RichEditTable } from '../components/tables/RichEditTable'

export default function TableStylesPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">表格样式设计</h1>
        <p className="text-gray-500">专注于行级编辑与高密度信息录入。</p>
      </div>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">1</span>
            极简行内编辑 (Minimalist Inline)
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            适用于展示型数据，强调阅读体验。鼠标悬停显示操作，点击编辑进入修改模式。
          </p>
        </div>
        <MinimalTable />
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-xs font-bold">2</span>
            行级编辑表格 (Row Edit)
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            适用于库存管理或数据列表。**点击即编辑整行**。支持 Tab 键快速切换字段，Enter 保存，Esc 取消。放弃了飘忽的单元格焦点，改为稳健的行编辑模式。
          </p>
        </div>
        <RowEditTable />
      </section>

      <section>
        <div className="mb-4">
           <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-xs font-bold">3</span>
            富控件录入表格 (Rich Edit)
          </h2>
          <p className="text-gray-500 text-sm mt-1">
             适用于复杂任务或项目管理。所有控件直接暴露，**所见即所得**。无需点击进入编辑模式，直接录入。
          </p>
        </div>
        <RichEditTable />
      </section>
    </div>
  )
}
