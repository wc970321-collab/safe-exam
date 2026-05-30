import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "备考指南",
  description:
    "中级注册安全工程师考试备考指南，包括考试介绍、各科考情分析、复习策略建议、各章分值分布及备考资源推荐。",
  path: "/guide",
});

export default function GuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
        备考指南
      </h1>

      <div className="prose-cn bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
        {/* 一、考试介绍 */}
        <h2>一、考试介绍</h2>
        <ul>
          <li>
            <strong>考试名称：</strong>中级注册安全工程师
          </li>
          <li>
            <strong>考试时间：</strong>2025年10月25日、26日
          </li>
          <li>
            <strong>科目：</strong>4科（法律法规、安全管理、技术基础、专业实务）
          </li>
          <li>
            <strong>题型：</strong>单选70题+多选15题（法律法规科目）
          </li>
          <li>
            <strong>满分</strong>100分，<strong>合格</strong>60分
          </li>
          <li>
            <strong>成绩管理：</strong>4年滚动
          </li>
        </ul>

        {/* 二、各科考情分析 */}
        <h2>二、各科考情分析</h2>
        <table>
          <thead>
            <tr>
              <th>科目</th>
              <th>章节数</th>
              <th>考试占比</th>
              <th>难度</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>法律法规</td>
              <td>7章</td>
              <td>约25%</td>
              <td>★★★</td>
            </tr>
            <tr>
              <td>安全管理</td>
              <td>8章</td>
              <td>约25%</td>
              <td>★★★★</td>
            </tr>
            <tr>
              <td>技术基础</td>
              <td>5章</td>
              <td>约25%</td>
              <td>★★★★</td>
            </tr>
            <tr>
              <td>专业实务</td>
              <td>7个专业方向</td>
              <td>约25%</td>
              <td>★★★★★</td>
            </tr>
          </tbody>
        </table>

        {/* 三、复习策略建议 */}
        <h2>三、复习策略建议</h2>
        <p>
          法律法规科目共7章，建议按以下顺序复习（由分值从高到低排列）：
        </p>
        <ol>
          <li>
            <strong>Ch3 安全生产法</strong>（历年分值最高，约18-23分）
            — 核心法律，必须优先掌握
          </li>
          <li>
            <strong>Ch6 行政法规</strong>（约10-14分）— 重要的法规条文需要熟练记忆
          </li>
          <li>
            <strong>Ch5 相关法律</strong>（约10-14分）— 与其他科目关联紧密
          </li>
          <li>
            <strong>Ch4 单行法律</strong>（约6-8分）— 多部单行法律的考点梳理
          </li>
          <li>
            <strong>Ch7 部门规章</strong>（约4-6分）— 细节较多，需系统整理
          </li>
          <li>
            <strong>Ch1 国家政策</strong>（约1-2分）— 了解即可
          </li>
          <li>
            <strong>Ch2 法律基础</strong>（约1-2分）— 基础概念，快速过一遍
          </li>
        </ol>
        <p>
          整体建议：先攻克分值集中的Ch3、Ch6、Ch5三大板块，再补齐其他章节，
          做到重点突出、效率优先。
        </p>

        {/* 四、各章分值分布 */}
        <h2>四、各章分值分布</h2>
        <p>
          以下为安全生产法律法规科目各章节近年考试分值分布情况：
        </p>
        <table>
          <thead>
            <tr>
              <th>章节</th>
              <th>2024</th>
              <th>2023</th>
              <th>2022</th>
              <th>2021</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ch1 国家政策</td>
              <td>1</td>
              <td>1</td>
              <td>2</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Ch2 法律基础</td>
              <td>1</td>
              <td>2</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Ch3 安全生产法</td>
              <td>18</td>
              <td>22</td>
              <td>19</td>
              <td>23</td>
            </tr>
            <tr>
              <td>Ch4 单行法律</td>
              <td>7</td>
              <td>6</td>
              <td>8</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Ch5 相关法律</td>
              <td>10</td>
              <td>14</td>
              <td>14</td>
              <td>12</td>
            </tr>
            <tr>
              <td>Ch6 行政法规</td>
              <td>12</td>
              <td>11</td>
              <td>10</td>
              <td>14</td>
            </tr>
            <tr>
              <td>Ch7 部门规章</td>
              <td>5</td>
              <td>4</td>
              <td>6</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>

        {/* 五、备考资源 */}
        <h2>五、备考资源</h2>
        <p>本平台已提供以下备考功能，助你高效通关：</p>
        <ul>
          <li>
            <strong>学习笔记：</strong>各章节精编笔记，重点突出、考点清晰
          </li>
          <li>
            <strong>章节练习：</strong>每章配套练习题，学完即练、巩固记忆
          </li>
          <li>
            <strong>思维导图：</strong>章节知识框架一目了然，构建系统知识体系
          </li>
          <li>
            <strong>对比记忆：</strong>易混淆知识点横向对比，加深理解
          </li>
          <li>
            <strong>免费视频：</strong>精选讲解视频，攻克重难点
          </li>
          <li>
            <strong>高频考点：</strong>历年高频考点汇总，精准靶向复习
          </li>
        </ul>
      </div>
    </div>
  );
}
