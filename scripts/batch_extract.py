"""批量提取所有章节的讲义文本到本地文件"""
import fitz
import json
import os
import re

doc = fitz.open("D:/baidudownload/讲义.pdf")

# 章节-讲义页数映射
# 网站 chapters 与 讲义内容对应关系
chapter_pages = {
    "chapter-02": (14, 16),   # 第02讲 安全生产法律基础知识
    "chapter-03": (17, 56),   # 第03-17讲 安全生产法全章
    "chapter-04": (57, 83),   # 第18-24讲 单行法律
    "chapter-05": (84, 123),  # 第25-34讲 相关法律
    "chapter-06": (124, 202), # 第35-54讲 行政法规
    "chapter-07": (203, 266), # 第55-70讲 部门规章
}

# 安全标准化体系、许可审查等章节的内容分散在讲义中
# Chapter 08-20 的相关内容需要从讲义中额外提取，现在先提取主要章节

output_dir = "C:/Users/ThinkPad/Downloads/safe-exam/src/content/laws"
os.makedirs(f"{output_dir}/_extracted", exist_ok=True)

for ch, (start, end) in chapter_pages.items():
    texts = []
    for i in range(start - 1, end):
        texts.append(doc[i].get_text())
    content = "\n--- PAGE BREAK ---\n".join(texts)
    # 清理水印行
    content = re.sub(r'注册安全工程师-安全生产法律法规.*?\n', '', content)
    content = re.sub(r'\d+ / 266\s*\n', '', content)
    content = re.sub(r'二建、监理、一建、一造、二造、安全、消防、咨询、检测课程押题.*?\n', '', content)
    content = re.sub(r'名师面授精华、央企内训、考点串讲.*?\n', '', content)
    content = re.sub(r'精准押题联系微信3849178.*?\n', '', content)
    content = re.sub(r'唯一联系微信3849178\s*\n', '', content)
    
    with open(f"{output_dir}/_extracted/{ch}_lecture.txt", "w", encoding="utf-8") as f:
        f.write(content)
    print(f"已提取 {ch}: 页{start}-{end} -> {len(content)} 字符")

# 也提取习题PDF按章节
doc_ex = fitz.open("D:/baidudownload/2025年注安《法律法规》章节题.pdf")

# 习题章节对应
exercise_chapters = {
    "chapter-01": (1, 2),   # 第一章 安全生产相关国家政策
    "chapter-02": (3, 4),   # 第二章 安全生产法律基础知识
    "chapter-03": (5, 33),  # 第三章 安全生产法
    "chapter-04": (34, 49), # 第四章 单行法律
    "chapter-05": (50, 78), # 第五章 相关法律
    "chapter-06": (79, 135),# 第六章 行政法规
    "chapter-07": (136, 185),# 第七章 部门规章
}

for ch, (start, end) in exercise_chapters.items():
    texts = []
    for i in range(start - 1, end):
        texts.append(doc_ex[i].get_text())
    content = "\n--- PAGE BREAK ---\n".join(texts)
    content = re.sub(r'注册安全工程师-安全生产法律法规.*?\n', '', content)
    
    with open(f"{output_dir}/_extracted/{ch}_exercises.txt", "w", encoding="utf-8") as f:
        f.write(content)
    print(f"已提取习题 {ch}: 页{start}-{end} -> {len(content)} 字符")

doc.close()
doc_ex.close()
print("\n提取完成！")
