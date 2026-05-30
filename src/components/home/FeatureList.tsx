import {
  FileText,
  BrainCircuit,
  Play,
  GitCompare,
  Search,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "系统学习笔记",
    description: "按考试大纲编排，覆盖全部考点，重难点突出标注，易混淆点对比讲解。",
  },
  {
    icon: BrainCircuit,
    title: "在线章节练习",
    description: "每章配套题库，单选+多选+判断全覆盖。实时判分、详细解析、错题回顾。",
  },
  {
    icon: Play,
    title: "免费视频课程",
    description: "精选B站优质课程，按章节编排成体系化课表。免费观看，替代昂贵培训班。",
  },
  {
    icon: GitCompare,
    title: "易混知识点对比",
    description: "将易混淆的知识点整理成对比表格，直观呈现差异，精准记忆不混淆。",
  },
  {
    icon: Search,
    title: "全站搜索",
    description: "输入关键词即可快速定位到相关章节和考点，学习效率翻倍。",
  },
  {
    icon: Smartphone,
    title: "多端适配",
    description: "手机、平板、电脑全端适配，通勤路上、午休时间随时随地学。",
  },
];

export default function FeatureList() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-9">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            学习功能
          </h2>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            覆盖备考全流程的实用功能
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-5 border border-warm-100/70 hover:border-primary-100/50 hover:shadow-sm transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center mb-3 group-hover:bg-primary-100 transition-colors">
                <f.icon className="w-4.5 h-4.5 text-primary-500" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1.5">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
