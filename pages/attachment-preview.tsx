import React, { useState } from 'react'
import { Card, CardContent, Button } from '../components'
import {
  File,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  Volume2,
  VolumeX
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
    description: '详细的项目需求说明文档',
    thumbnail: '/api/placeholder/300/400'
  },
  {
    id: 2,
    name: '设计稿.png',
    size: '1.8 MB',
    type: 'image',
    uploadDate: '2024-01-15',
    uploadTime: '16:45',
    description: 'UI设计稿最终版本',
    thumbnail: '/api/placeholder/400/300'
  },
  {
    id: 3,
    name: '会议录音.mp3',
    size: '15.2 MB',
    type: 'audio',
    uploadDate: '2024-01-14',
    uploadTime: '10:20',
    description: '项目讨论会议录音',
    thumbnail: '/api/placeholder/300/200'
  },
  {
    id: 4,
    name: '演示视频.mp4',
    size: '45.7 MB',
    type: 'video',
    uploadDate: '2024-01-14',
    uploadTime: '18:15',
    description: '产品演示视频',
    thumbnail: '/api/placeholder/400/225'
  },
  {
    id: 5,
    name: '源代码.zip',
    size: '12.3 MB',
    type: 'archive',
    uploadDate: '2024-01-13',
    uploadTime: '09:30',
    description: '项目源代码压缩包',
    thumbnail: '/api/placeholder/300/300'
  },
  {
    id: 6,
    name: '技术文档.docx',
    size: '3.1 MB',
    type: 'document',
    uploadDate: '2024-01-13',
    uploadTime: '11:45',
    description: '技术实现文档',
    thumbnail: '/api/placeholder/300/400'
  },
  {
    id: 7,
    name: '产品图片.jpg',
    size: '2.1 MB',
    type: 'image',
    uploadDate: '2024-01-12',
    uploadTime: '15:20',
    description: '产品宣传图片',
    thumbnail: '/api/placeholder/500/300'
  },
  {
    id: 8,
    name: '培训视频.mp4',
    size: '78.5 MB',
    type: 'video',
    uploadDate: '2024-01-12',
    uploadTime: '09:15',
    description: '员工培训视频',
    thumbnail: '/api/placeholder/400/225'
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
      return 'bg-red-900/30 border-red-500/50'
    case 'image':
      return 'bg-green-900/30 border-green-500/50'
    case 'video':
      return 'bg-purple-900/30 border-purple-500/50'
    case 'audio':
      return 'bg-blue-900/30 border-blue-500/50'
    case 'archive':
      return 'bg-orange-900/30 border-orange-500/50'
    default:
      return 'bg-gray-700 border-gray-500'
  }
}

// 预览内容组件
const PreviewContent = ({ attachment }: { attachment: any }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [zoom, setZoom] = useState(100)

  const renderPreview = () => {
    switch (attachment.type) {
      case 'image':
        return (
          <div className='relative w-full h-full flex items-center justify-center bg-gray-800 rounded-lg overflow-hidden'>
            <img
              src={attachment.thumbnail}
              alt={attachment.name}
              className='max-w-full max-h-full object-contain'
              style={{ transform: `scale(${zoom / 100})` }}
            />
            <div className='absolute top-4 right-4 flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                className='bg-gray-700/80 backdrop-blur-sm border-gray-600 text-white hover:bg-gray-600'
                onClick={() => setZoom(Math.min(zoom + 25, 200))}
              >
                <ZoomIn className='w-4 h-4' />
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='bg-gray-700/80 backdrop-blur-sm border-gray-600 text-white hover:bg-gray-600'
                onClick={() => setZoom(Math.max(zoom - 25, 50))}
              >
                <ZoomOut className='w-4 h-4' />
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='bg-gray-700/80 backdrop-blur-sm border-gray-600 text-white hover:bg-gray-600'
                onClick={() => setZoom(100)}
              >
                <RotateCw className='w-4 h-4' />
              </Button>
            </div>
          </div>
        )

      case 'video':
        return (
          <div className='relative w-full h-full flex items-center justify-center bg-black rounded-lg overflow-hidden'>
            <div className='relative w-full h-full'>
              <video
                className='w-full h-full object-contain'
                poster={attachment.thumbnail}
                controls
              >
                <source src='#' type='video/mp4' />
                您的浏览器不支持视频播放
              </video>
              <div className='absolute top-4 right-4 flex gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  className='bg-gray-700/80 backdrop-blur-sm border-gray-600 text-white hover:bg-gray-600'
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? (
                    <VolumeX className='w-4 h-4' />
                  ) : (
                    <Volume2 className='w-4 h-4' />
                  )}
                </Button>
              </div>
            </div>
          </div>
        )

      case 'audio':
        return (
          <div className='relative w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg'>
            <div className='text-center'>
              <div className='w-32 h-32 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center shadow-lg border border-gray-700'>
                <Music className='w-16 h-16 text-blue-400' />
              </div>
              <div className='space-y-4'>
                <div className='w-64 bg-gray-700 rounded-full h-2 mx-auto'>
                  <div className='bg-blue-500 h-2 rounded-full w-1/3'></div>
                </div>
                <div className='flex items-center justify-center gap-4'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <Pause className='w-4 h-4' />
                    ) : (
                      <Play className='w-4 h-4' />
                    )}
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? (
                      <VolumeX className='w-4 h-4' />
                    ) : (
                      <Volume2 className='w-4 h-4' />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'pdf':
      case 'document':
        return (
          <div className='relative w-full h-full flex items-center justify-center bg-gray-800 rounded-lg'>
            <div className='text-center'>
              <div className='w-32 h-32 mx-auto mb-6 bg-gray-700 rounded-lg flex items-center justify-center shadow-lg border border-gray-600'>
                <FileText className='w-16 h-16 text-red-400' />
              </div>
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-white'>
                  {attachment.name}
                </h3>
                <p className='text-sm text-gray-400'>
                  {attachment.description}
                </p>
                <div className='flex items-center justify-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                  >
                    <Eye className='w-4 h-4 mr-2' />
                    在线预览
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                  >
                    <Download className='w-4 h-4 mr-2' />
                    下载
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'archive':
        return (
          <div className='relative w-full h-full flex items-center justify-center bg-gray-800 rounded-lg'>
            <div className='text-center'>
              <div className='w-32 h-32 mx-auto mb-6 bg-gray-700 rounded-lg flex items-center justify-center shadow-lg border border-gray-600'>
                <Archive className='w-16 h-16 text-orange-400' />
              </div>
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-white'>
                  {attachment.name}
                </h3>
                <p className='text-sm text-gray-400'>
                  {attachment.description}
                </p>
                <div className='flex items-center justify-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                  >
                    <Eye className='w-4 h-4 mr-2' />
                    查看内容
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                  >
                    <Download className='w-4 h-4 mr-2' />
                    下载
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className='relative w-full h-full flex items-center justify-center bg-gray-800 rounded-lg'>
            <div className='text-center'>
              <div className='w-32 h-32 mx-auto mb-6 bg-gray-700 rounded-lg flex items-center justify-center shadow-lg border border-gray-600'>
                <File className='w-16 h-16 text-gray-400' />
              </div>
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-white'>
                  {attachment.name}
                </h3>
                <p className='text-sm text-gray-400'>
                  {attachment.description}
                </p>
                <div className='flex items-center justify-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                  >
                    <Download className='w-4 h-4 mr-2' />
                    下载
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return <div className='w-full h-full'>{renderPreview()}</div>
}

export default function AttachmentPreviewPage() {
  const [attachments] = useState(mockAttachments)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const currentAttachment = attachments[currentIndex]

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : attachments.length - 1))
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev < attachments.length - 1 ? prev + 1 : 0))
  }

  const goToAttachment = (index: number) => {
    setCurrentIndex(index)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div
      className={`min-h-screen bg-gray-900 ${
        isFullscreen ? 'fixed inset-0 z-50' : ''
      }`}
    >
      <div className={`${isFullscreen ? 'h-full' : 'max-w-7xl mx-auto p-6'}`}>
        {/* 页面标题 */}
        {!isFullscreen && (
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-white mb-2'>附件预览</h1>
            <p className='text-gray-400'>预览和管理您的文件附件</p>
          </div>
        )}

        <div
          className={`${
            isFullscreen
              ? 'h-full flex flex-col'
              : 'grid grid-cols-1 lg:grid-cols-3 gap-6'
          }`}
        >
          {/* 主预览区域 */}
          <div className={`${isFullscreen ? 'flex-1' : 'lg:col-span-2'}`}>
            <Card
              className={`${
                isFullscreen ? 'h-full' : 'h-96 lg:h-[600px]'
              } bg-gray-800 border-gray-700`}
            >
              <CardContent
                className={`${
                  isFullscreen ? 'h-full p-0' : 'h-full p-6'
                } relative`}
              >
                {/* 预览头部 */}
                <div
                  className={`${
                    isFullscreen
                      ? 'absolute top-4 left-4 right-4 z-10 flex justify-between items-center'
                      : 'mb-4 flex justify-between items-center'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    {getFileIcon(currentAttachment.type)}
                    <div>
                      <h3 className='font-semibold text-white'>
                        {currentAttachment.name}
                      </h3>
                      <p className='text-sm text-gray-400'>
                        {currentAttachment.size} •{' '}
                        {currentAttachment.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={toggleFullscreen}
                      className='bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                    >
                      <Maximize2 className='w-4 h-4' />
                    </Button>
                    {isFullscreen && (
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => setIsFullscreen(false)}
                        className='bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                      >
                        <X className='w-4 h-4' />
                      </Button>
                    )}
                  </div>
                </div>

                {/* 预览内容 */}
                <div
                  className={`${
                    isFullscreen ? 'h-full pt-16 pb-16' : 'h-full pt-16'
                  }`}
                >
                  <PreviewContent attachment={currentAttachment} />
                </div>

                {/* 导航按钮 */}
                <div
                  className={`${
                    isFullscreen
                      ? 'absolute bottom-4 left-4 right-4 z-10 flex justify-between'
                      : 'absolute bottom-6 left-6 right-6 flex justify-between'
                  }`}
                >
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={goToPrevious}
                    className='bg-gray-800/80 backdrop-blur-sm border-gray-600 text-white hover:bg-gray-700'
                  >
                    <ChevronLeft className='w-4 h-4 mr-1' />
                    上一个
                  </Button>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm text-gray-300 bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full'>
                      {currentIndex + 1} / {attachments.length}
                    </span>
                  </div>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={goToNext}
                    className='bg-gray-800/80 backdrop-blur-sm border-gray-600 text-white hover:bg-gray-700'
                  >
                    下一个
                    <ChevronRight className='w-4 h-4 ml-1' />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 附件列表 */}
          <div className={`${isFullscreen ? 'hidden' : ''}`}>
            <Card className='h-96 lg:h-[600px] bg-gray-800 border-gray-700'>
              <CardContent className='p-4'>
                <div className='mb-4'>
                  <h3 className='font-semibold text-white mb-2'>附件列表</h3>
                  <p className='text-sm text-gray-400'>
                    {attachments.length} 个文件
                  </p>
                </div>

                <div className='space-y-2 overflow-y-auto h-full pb-4'>
                  {attachments.map((attachment, index) => (
                    <div
                      key={attachment.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        index === currentIndex
                          ? `${getFileTypeBg(
                              attachment.type
                            )} border-2 border-blue-400`
                          : 'hover:bg-gray-700 border-2 border-transparent'
                      }`}
                      onClick={() => goToAttachment(index)}
                    >
                      <div className='flex items-center gap-3'>
                        <div className='flex-shrink-0'>
                          {getFileIcon(attachment.type)}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h4 className='text-sm font-medium text-white truncate'>
                            {attachment.name}
                          </h4>
                          <p className='text-xs text-gray-400'>
                            {attachment.size} • {attachment.uploadDate}
                          </p>
                        </div>
                        <div className='flex-shrink-0'>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='h-6 w-6 p-0 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white hover:bg-gray-600'
                          >
                            <Eye className='w-3 h-3' />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 键盘快捷键提示 */}
        {!isFullscreen && (
          <div className='mt-6 text-center'>
            <p className='text-xs text-gray-500'>
              使用 ← → 方向键切换文件，按 F 键进入全屏模式
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
