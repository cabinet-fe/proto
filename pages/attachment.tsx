import React, { useState } from 'react'
import { Card, CardContent, Button } from '../components'
import {
  Upload,
  File,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Download,
  Eye,
  Trash2,
  Plus,
  Calendar,
  Clock
} from 'lucide-react'

// 模拟附件数据
const mockAttachments = [
  {
    id: 1,
    name: '项目需求文档.pdf',
    size: '2.5 MB',
    type: 'pdf',
    uploadDate: '2024-01-15',
    uploadTime: '14:30',
    description: '详细的项目需求说明文档'
  },
  {
    id: 2,
    name: '设计稿.png',
    size: '1.8 MB',
    type: 'image',
    uploadDate: '2024-01-15',
    uploadTime: '16:45',
    description: 'UI设计稿最终版本'
  },
  {
    id: 3,
    name: '会议录音.mp3',
    size: '15.2 MB',
    type: 'audio',
    uploadDate: '2024-01-14',
    uploadTime: '10:20',
    description: '项目讨论会议录音'
  },
  {
    id: 4,
    name: '演示视频.mp4',
    size: '45.7 MB',
    type: 'video',
    uploadDate: '2024-01-14',
    uploadTime: '18:15',
    description: '产品演示视频'
  },
  {
    id: 5,
    name: '源代码.zip',
    size: '12.3 MB',
    type: 'archive',
    uploadDate: '2024-01-13',
    uploadTime: '09:30',
    description: '项目源代码压缩包'
  },
  {
    id: 6,
    name: '技术文档.docx',
    size: '3.1 MB',
    type: 'document',
    uploadDate: '2024-01-13',
    uploadTime: '11:45',
    description: '技术实现文档'
  }
]

// 根据文件类型返回对应图标和颜色
const getFileIcon = (type: string) => {
  const iconClass = 'w-6 h-6'
  switch (type) {
    case 'pdf':
    case 'document':
      return <FileText className={`${iconClass} text-red-500`} />
    case 'image':
      return <Image className={`${iconClass} text-green-500`} />
    case 'video':
      return <Video className={`${iconClass} text-purple-500`} />
    case 'audio':
      return <Music className={`${iconClass} text-blue-500`} />
    case 'archive':
      return <Archive className={`${iconClass} text-orange-500`} />
    default:
      return <File className={`${iconClass} text-gray-500`} />
  }
}

// 获取文件类型背景色
const getFileTypeBg = (type: string) => {
  switch (type) {
    case 'pdf':
    case 'document':
      return 'bg-red-50 border-red-200'
    case 'image':
      return 'bg-green-50 border-green-200'
    case 'video':
      return 'bg-purple-50 border-purple-200'
    case 'audio':
      return 'bg-blue-50 border-blue-200'
    case 'archive':
      return 'bg-orange-50 border-orange-200'
    default:
      return 'bg-gray-50 border-gray-200'
  }
}

export default function AttachmentPage() {
  const [attachments, setAttachments] = useState(mockAttachments)
  const [dragOver, setDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    // 这里可以处理文件上传逻辑
  }

  const handleDelete = (id: number) => {
    setAttachments(prev => prev.filter(attachment => attachment.id !== id))
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* 页面标题 */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>附件管理</h1>
          <p className='text-gray-600'>管理和查看您的文件附件</p>
        </div>

        {/* 简洁的上传区域 */}
        <div className='mb-8'>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
              dragOver
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className='flex items-center justify-center gap-3'>
              <Upload className='w-5 h-5 text-gray-400' />
              <span className='text-sm text-gray-600'>拖拽文件到此处或</span>
              <Button variant='outline' size='sm' className='h-8 px-3'>
                <Plus className='w-4 h-4 mr-1' />
                选择文件
              </Button>
            </div>
            <p className='text-xs text-gray-500 mt-2'>
              支持 PDF、图片、视频、音频等格式，单个文件最大 100MB
            </p>
          </div>
        </div>

        {/* 附件统计 */}
        <div className='mb-6 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <h2 className='text-lg font-semibold text-gray-900'>附件列表</h2>
            <span className='text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full'>
              {attachments.length} 个文件
            </span>
          </div>
          <div className='flex gap-2'>
            <Button variant='outline' size='sm'>
              批量下载
            </Button>
            <Button variant='outline' size='sm'>
              批量删除
            </Button>
          </div>
        </div>

        {/* 附件网格 */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {attachments.map(attachment => (
            <Card
              key={attachment.id}
              className={`hover:shadow-lg transition-all duration-200 group ${getFileTypeBg(
                attachment.type
              )}`}
            >
              <CardContent className='p-4'>
                {/* 文件图标和类型标识 */}
                <div className='flex items-start justify-between mb-3'>
                  <div className='flex items-center gap-2'>
                    {getFileIcon(attachment.type)}
                    <span className='text-xs font-medium text-gray-600 uppercase'>
                      {attachment.type}
                    </span>
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50'
                    onClick={() => handleDelete(attachment.id)}
                  >
                    <Trash2 className='w-3 h-3' />
                  </Button>
                </div>

                {/* 文件信息 */}
                <div className='mb-3'>
                  <h3
                    className='font-medium text-gray-900 text-sm truncate mb-1'
                    title={attachment.name}
                  >
                    {attachment.name}
                  </h3>
                  {attachment.description && (
                    <p className='text-xs text-gray-600 line-clamp-2 mb-2'>
                      {attachment.description}
                    </p>
                  )}
                  <div className='flex items-center gap-3 text-xs text-gray-500'>
                    <span className='flex items-center gap-1'>
                      <Calendar className='w-3 h-3' />
                      {attachment.uploadDate}
                    </span>
                    <span className='flex items-center gap-1'>
                      <Clock className='w-3 h-3' />
                      {attachment.uploadTime}
                    </span>
                  </div>
                </div>

                {/* 文件大小 */}
                <div className='mb-3'>
                  <span className='text-xs font-medium text-gray-700'>
                    {attachment.size}
                  </span>
                </div>

                {/* 操作按钮 */}
                <div className='flex gap-1'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex-1 text-xs h-7'
                  >
                    <Eye className='w-3 h-3 mr-1' />
                    预览
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex-1 text-xs h-7'
                  >
                    <Download className='w-3 h-3 mr-1' />
                    下载
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 空状态 */}
        {attachments.length === 0 && (
          <Card className='text-center py-12'>
            <CardContent>
              <Upload className='w-12 h-12 text-gray-300 mx-auto mb-4' />
              <h3 className='text-lg font-medium text-gray-500 mb-2'>
                暂无附件
              </h3>
              <p className='text-gray-400 mb-4'>上传您的第一个文件开始使用</p>
              <Button size='sm'>
                <Plus className='w-4 h-4 mr-2' />
                上传文件
              </Button>
            </CardContent>
          </Card>
        )}

        {/* 统计信息 */}
        <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-4'>
          <Card>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold text-blue-600 mb-1'>
                {attachments.length}
              </div>
              <div className='text-sm text-gray-600'>总文件数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold text-green-600 mb-1'>
                {attachments
                  .reduce((acc, file) => {
                    const size = parseFloat(file.size)
                    return acc + size
                  }, 0)
                  .toFixed(1)}{' '}
                MB
              </div>
              <div className='text-sm text-gray-600'>总文件大小</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold text-purple-600 mb-1'>
                500 MB
              </div>
              <div className='text-sm text-gray-600'>存储空间</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
