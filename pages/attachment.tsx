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
  Plus
} from 'lucide-react'

// 模拟附件数据
const mockAttachments = [
  {
    id: 1,
    name: '项目需求文档.pdf',
    size: '2.5 MB',
    type: 'pdf',
    uploadDate: '2024-01-15'
  },
  {
    id: 2,
    name: '设计稿.png',
    size: '1.8 MB',
    type: 'image',
    uploadDate: '2024-01-15'
  },
  {
    id: 3,
    name: '会议录音.mp3',
    size: '15.2 MB',
    type: 'audio',
    uploadDate: '2024-01-14'
  },
  {
    id: 4,
    name: '演示视频.mp4',
    size: '45.7 MB',
    type: 'video',
    uploadDate: '2024-01-14'
  },
  {
    id: 5,
    name: '源代码.zip',
    size: '12.3 MB',
    type: 'archive',
    uploadDate: '2024-01-13'
  },
  {
    id: 6,
    name: '技术文档.docx',
    size: '3.1 MB',
    type: 'document',
    uploadDate: '2024-01-13'
  }
]

// 根据文件类型返回对应图标
const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf':
    case 'document':
      return <FileText className='w-8 h-8 text-red-500' />
    case 'image':
      return <Image className='w-8 h-8 text-green-500' />
    case 'video':
      return <Video className='w-8 h-8 text-purple-500' />
    case 'audio':
      return <Music className='w-8 h-8 text-blue-500' />
    case 'archive':
      return <Archive className='w-8 h-8 text-orange-500' />
    default:
      return <File className='w-8 h-8 text-gray-500' />
  }
}

// 格式化文件大小
const formatFileSize = (size: string) => {
  return size
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

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6'>
      <div className='max-w-6xl mx-auto'>
        {/* 页面标题 */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
            附件管理
          </h1>
          <p className='text-gray-600 text-lg'>上传、预览和管理您的文件附件</p>
        </div>

        {/* 上传区域 */}
        <Card className='mb-8 hover:shadow-xl transition-shadow duration-300'>
          <CardContent className='p-8'>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragOver
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className='w-12 h-12 text-gray-400 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                拖拽文件到此处或点击上传
              </h3>
              <p className='text-gray-500 mb-6'>
                支持 PDF、图片、视频、音频、压缩包等格式，单个文件最大 100MB
              </p>
              <Button className='mx-auto'>
                <Plus className='w-4 h-4 mr-2' />
                选择文件
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 附件列表 */}
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-2xl font-bold text-gray-800'>
            附件列表 ({attachments.length})
          </h2>
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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {attachments.map(attachment => (
            <Card
              key={attachment.id}
              className='hover:shadow-xl hover:scale-105 transition-all duration-300 group'
            >
              <CardContent className='p-6'>
                {/* 文件图标和基本信息 */}
                <div className='flex items-start gap-4 mb-4'>
                  <div className='flex-shrink-0'>
                    {getFileIcon(attachment.type)}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h3
                      className='font-semibold text-gray-800 truncate mb-1'
                      title={attachment.name}
                    >
                      {attachment.name}
                    </h3>
                    <p className='text-sm text-gray-500 mb-1'>
                      {formatFileSize(attachment.size)}
                    </p>
                    <p className='text-xs text-gray-400'>
                      {attachment.uploadDate}
                    </p>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className='flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex-1 text-xs h-8'
                  >
                    <Eye className='w-3 h-3 mr-1' />
                    预览
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex-1 text-xs h-8'
                  >
                    <Download className='w-3 h-3 mr-1' />
                    下载
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='text-xs h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50'
                  >
                    <Trash2 className='w-3 h-3' />
                  </Button>
                </div>

                {/* 进度条（用于表示上传进度，这里用静态样式） */}
                <div className='mt-4 w-full bg-gray-200 rounded-full h-1'>
                  <div className='bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full w-full'></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 空状态 */}
        {attachments.length === 0 && (
          <Card className='text-center py-16'>
            <CardContent>
              <Upload className='w-16 h-16 text-gray-300 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-gray-500 mb-2'>
                暂无附件
              </h3>
              <p className='text-gray-400 mb-6'>上传您的第一个文件开始使用</p>
              <Button>
                <Plus className='w-4 h-4 mr-2' />
                上传文件
              </Button>
            </CardContent>
          </Card>
        )}

        {/* 统计信息 */}
        <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-4'>
          <Card className='text-center'>
            <CardContent className='p-4'>
              <div className='text-2xl font-bold text-blue-600 mb-1'>
                {attachments.length}
              </div>
              <div className='text-sm text-gray-600'>总文件数</div>
            </CardContent>
          </Card>
          <Card className='text-center'>
            <CardContent className='p-4'>
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
          <Card className='text-center'>
            <CardContent className='p-4'>
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
