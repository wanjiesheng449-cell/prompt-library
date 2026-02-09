import React, { useState, useMemo } from 'react';
import { Search, Copy, Check } from 'lucide-react';

export default function PromptLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  // 提示词数据 - 你可以自由修改这里
  const prompts = [
    {
      id: 1,
      title: '专业文章写手',
      category: '写作',
      content: '你是一个专业的内容创作者。请以引人入胜的方式写一篇关于[主题]的文章。文章应该：\n1. 开头有吸引力\n2. 逻辑清晰，分层递进\n3. 包含具体例子\n4. 结尾有行动号召',
      usage: '适合生成博客、专栏文章'
    },
    {
      id: 2,
      title: '代码审查助手',
      category: '编程',
      content: '你是一个资深的代码审查员。请审查以下代码，指出：\n1. 潜在的bug\n2. 性能问题\n3. 代码风格改进\n4. 安全隐患\n\n代码如下：\n[粘贴你的代码]',
      usage: '帮助优化代码质量和性能'
    },
    {
      id: 3,
      title: '产品文案大师',
      category: '营销',
      content: '你是一个顶级的产品营销文案写手。为以下产品写一份引人注目的文案：\n产品名称：[产品名]\n主要特点：[特点]\n目标用户：[用户]\n\n要求：简洁有力、突出核心价值、制造紧迫感',
      usage: '生成产品介绍、广告文案'
    },
    {
      id: 4,
      title: 'AI绘画提示词',
      category: '绘画',
      content: 'Create an [art style] illustration of [subject]. Key details: [details]. Color palette: [colors]. Mood: [mood]. Professional quality, trending on ArtStation.',
      usage: '用于Midjourney、Stable Diffusion等AI绘画工具'
    },
    {
      id: 5,
      title: '论文摘要生成',
      category: '学术',
      content: '请根据以下内容生成一份学术论文摘要。摘要应该：\n1. 简明扼要（150-200字）\n2. 包含研究背景、方法、结果、结论\n3. 学术风格\n4. 包含3-5个关键词\n\n论文内容：[粘贴内容]',
      usage: '快速生成论文摘要'
    },
    {
      id: 6,
      title: '社交媒体营销',
      category: '营销',
      content: '你是一个社交媒体营销专家。为以下品牌创建[平台]内容：\n品牌：[品牌名]\n目标：[营销目标]\n目标受众：[受众]\n\n要求：吸引力强、鼓励互动、包含相关hashtag',
      usage: '生成小红书、抖音、Instagram内容'
    },
    {
      id: 7,
      title: '技术文档写手',
      category: '编程',
      content: '请为以下技术功能写一份清晰的文档：\n功能名称：[名称]\n用途：[用途]\n使用场景：[场景]\n\n文档应该包含：概述、使用步骤、代码示例、常见问题',
      usage: '生成API文档、教程'
    },
    {
      id: 8,
      title: '邮件营销模板',
      category: '营销',
      content: '写一封专业的营销邮件，主题是：[主题]\n接收者：[对象]\n目标：[目标]\n\n邮件应该：\n1. 主题行吸引人\n2. 个性化开场\n3. 清晰的价值主张\n4. 明确的CTA按钮',
      usage: '生成高转化率的邮件文案'
    },
    {
      id: 9,
      title: '概念解释器',
      category: '学术',
      content: '请用以下三个难度级别解释[概念]：\n1. 5岁小孩能听懂的解释\n2. 高中生能理解的解释\n3. 专业人士的详细解释\n\n每个解释都应该包含相关的例子。',
      usage: '深化理解复杂概念'
    },
    {
      id: 10,
      title: '品牌故事创作',
      category: '写作',
      content: '为[品牌/公司]创作一个引人入胜的品牌故事。故事应该：\n1. 说明品牌的起源\n2. 创始人的使命\n3. 如何解决用户问题\n4. 未来的愿景\n\n语调：[期望语调]',
      usage: '生成品牌文案、关于我们页面'
    }
  ];

  const categories = ['all', ...new Set(prompts.map(p => p.category))];

  // 过滤和搜索逻辑
  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
      const matchSearch = 
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [searchTerm, selectedCategory]);

  const copyToClipboard = (content, id) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">提示词库</h1>
          <p className="text-slate-600">精选高效的AI提示词，助力创意工作</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="搜索提示词..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-500'
              }`}
            >
              {cat === 'all' ? '全部' : cat}
            </button>
          ))}
        </div>

        {/* Prompts Grid */}
        {filteredPrompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map(prompt => (
              <div
                key={prompt.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col"
              >
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-slate-900 flex-1">
                      {prompt.title}
                    </h3>
                    <span className="ml-2 px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full whitespace-nowrap">
                      {prompt.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">{prompt.usage}</p>
                </div>

                <div className="flex-1 mb-4">
                  <p className="text-slate-700 text-sm line-clamp-4 whitespace-pre-wrap">
                    {prompt.content}
                  </p>
                </div>

                <button
                  onClick={() => copyToClipboard(prompt.content, prompt.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg font-medium transition-colors"
                >
                  {copiedId === prompt.id ? (
                    <>
                      <Check size={18} />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      复制提示词
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">没有找到匹配的提示词</p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center text-slate-600">
          <p>共 {filteredPrompts.length} 个提示词</p>
        </div>
      </main>
    </div>
  );
}
