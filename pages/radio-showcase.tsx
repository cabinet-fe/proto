import React, { useState } from 'react'
import { Radio, RadioGroup } from '../components'

export default function RadioShowcase() {
  const [defaultValue, setDefaultValue] = useState('option1')
  const [cardValue, setCardValue] = useState('premium')
  const [buttonValue, setButtonValue] = useState('medium')
  const [minimalValue, setMinimalValue] = useState('yes')
  const [modernValue, setModernValue] = useState('standard')
  const [planValue, setPlanValue] = useState('pro')

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            优雅单选框组件展示
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            展示多种设计风格的单选框组件，包含不同的变体、尺寸和交互效果
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* 默认样式 */}
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
              默认样式
            </h2>
            <RadioGroup
              name='default'
              value={defaultValue}
              onChange={setDefaultValue}
              className='space-y-4'
            >
              <Radio
                value='option1'
                label='选项一'
                description='这是第一个选项的详细描述'
              />
              <Radio
                value='option2'
                label='选项二'
                description='这是第二个选项的详细描述'
              />
              <Radio
                value='option3'
                label='选项三'
                description='这是第三个选项的详细描述'
                disabled
              />
            </RadioGroup>
          </div>

          {/* 卡片样式 */}
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
              卡片样式
            </h2>
            <RadioGroup
              name='plan'
              value={cardValue}
              onChange={setCardValue}
              variant='card'
              className='space-y-3'
            >
              <Radio
                value='basic'
                label='基础版'
                description='适合个人用户，包含基本功能'
              />
              <Radio
                value='premium'
                label='高级版'
                description='适合小团队，包含高级功能和优先支持'
              />
              <Radio
                value='enterprise'
                label='企业版'
                description='适合大型企业，包含所有功能和定制服务'
              />
            </RadioGroup>
          </div>

          {/* 按钮样式 */}
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
              按钮样式
            </h2>
            <RadioGroup
              name='size'
              value={buttonValue}
              onChange={setButtonValue}
              variant='button'
              orientation='horizontal'
              className='flex-wrap gap-3'
            >
              <Radio value='small' label='小' />
              <Radio value='medium' label='中' />
              <Radio value='large' label='大' />
              <Radio value='xl' label='超大' />
            </RadioGroup>
          </div>

          {/* 极简样式 */}
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
              极简样式
            </h2>
            <RadioGroup
              name='answer'
              value={minimalValue}
              onChange={setMinimalValue}
              variant='minimal'
              orientation='horizontal'
              className='gap-8'
            >
              <Radio value='yes' label='是' />
              <Radio value='no' label='否' />
              <Radio value='maybe' label='可能' />
            </RadioGroup>
          </div>

          {/* 现代样式 */}
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
              现代样式
            </h2>
            <RadioGroup
              name='subscription'
              value={modernValue}
              onChange={setModernValue}
              variant='modern'
              className='space-y-3'
            >
              <Radio
                value='free'
                label='免费版'
                description='免费使用基础功能，包含广告'
              />
              <Radio
                value='standard'
                label='标准版'
                description='¥99/月，无广告，包含高级功能'
              />
              <Radio
                value='pro'
                label='专业版'
                description='¥199/月，所有功能，优先客服支持'
              />
            </RadioGroup>
          </div>

          {/* 不同尺寸展示 */}
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
              不同尺寸
            </h2>
            <div className='space-y-6'>
              <div>
                <h3 className='text-sm font-medium text-gray-600 mb-3'>
                  小尺寸
                </h3>
                <RadioGroup
                  name='size-sm'
                  value={planValue}
                  onChange={setPlanValue}
                  size='sm'
                  className='space-y-2'
                >
                  <Radio value='basic' label='基础版' />
                  <Radio value='pro' label='专业版' />
                </RadioGroup>
              </div>

              <div>
                <h3 className='text-sm font-medium text-gray-600 mb-3'>
                  中等尺寸
                </h3>
                <RadioGroup
                  name='size-md'
                  value={planValue}
                  onChange={setPlanValue}
                  size='md'
                  className='space-y-2'
                >
                  <Radio value='basic' label='基础版' />
                  <Radio value='pro' label='专业版' />
                </RadioGroup>
              </div>

              <div>
                <h3 className='text-sm font-medium text-gray-600 mb-3'>
                  大尺寸
                </h3>
                <RadioGroup
                  name='size-lg'
                  value={planValue}
                  onChange={setPlanValue}
                  size='lg'
                  className='space-y-2'
                >
                  <Radio value='basic' label='基础版' />
                  <Radio value='pro' label='专业版' />
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* 错误状态展示 */}
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
              错误状态
            </h2>
            <div className='space-y-4'>
              <Radio
                name='error-demo'
                value='error1'
                label='有错误的选项'
                description='这个选项有验证错误'
                error={true}
                helperText='请选择一个有效的选项'
              />
              <Radio
                name='error-demo'
                value='error2'
                label='正常选项'
                description='这个选项没有错误'
                helperText='这是一个帮助文本'
              />
            </div>
          </div>

          {/* 禁用状态展示 */}
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
              禁用状态
            </h2>
            <div className='space-y-4'>
              <Radio
                name='disabled-demo'
                value='disabled1'
                label='禁用的选项'
                description='这个选项被禁用了'
                disabled={true}
              />
              <Radio
                name='disabled-demo'
                value='normal1'
                label='正常选项'
                description='这个选项可以正常使用'
              />
            </div>
          </div>

          {/* 水平布局展示 */}
          <div className='bg-white rounded-2xl shadow-lg p-8 lg:col-span-2'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
              水平布局
            </h2>
            <div className='space-y-6'>
              <div>
                <h3 className='text-sm font-medium text-gray-600 mb-3'>
                  默认样式 - 水平
                </h3>
                <RadioGroup
                  name='horizontal-default'
                  value='option1'
                  orientation='horizontal'
                  className='gap-6'
                >
                  <Radio value='option1' label='选项一' />
                  <Radio value='option2' label='选项二' />
                  <Radio value='option3' label='选项三' />
                </RadioGroup>
              </div>

              <div>
                <h3 className='text-sm font-medium text-gray-600 mb-3'>
                  按钮样式 - 水平
                </h3>
                <RadioGroup
                  name='horizontal-button'
                  value='left'
                  variant='button'
                  orientation='horizontal'
                  className='gap-3'
                >
                  <Radio value='left' label='左对齐' />
                  <Radio value='center' label='居中' />
                  <Radio value='right' label='右对齐' />
                  <Radio value='justify' label='两端对齐' />
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>

        {/* 当前选择值展示 */}
        <div className='mt-12 bg-white rounded-2xl shadow-lg p-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
            当前选择值
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm'>
            <div className='bg-gray-50 p-3 rounded-lg'>
              <div className='font-medium text-gray-600'>默认样式</div>
              <div className='text-blue-600 font-mono'>{defaultValue}</div>
            </div>
            <div className='bg-gray-50 p-3 rounded-lg'>
              <div className='font-medium text-gray-600'>卡片样式</div>
              <div className='text-blue-600 font-mono'>{cardValue}</div>
            </div>
            <div className='bg-gray-50 p-3 rounded-lg'>
              <div className='font-medium text-gray-600'>按钮样式</div>
              <div className='text-blue-600 font-mono'>{buttonValue}</div>
            </div>
            <div className='bg-gray-50 p-3 rounded-lg'>
              <div className='font-medium text-gray-600'>极简样式</div>
              <div className='text-blue-600 font-mono'>{minimalValue}</div>
            </div>
            <div className='bg-gray-50 p-3 rounded-lg'>
              <div className='font-medium text-gray-600'>现代样式</div>
              <div className='text-blue-600 font-mono'>{modernValue}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
