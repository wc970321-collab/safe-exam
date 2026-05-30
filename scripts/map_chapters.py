"""建立讲义PDF的章节-页数映射"""
import fitz
import json

doc = fitz.open("D:/baidudownload/讲义.pdf")
toc = doc.get_toc()

# 找到第01讲到第70讲的页数范围
lectures = []
for item in toc:
    if item[0] == 1 and ("第" in item[1] and "讲" in item[1]):
        lectures.append((item[1], item[2]))

# 为每讲定义页数范围
ranges = []
for i, (name, start) in enumerate(lectures):
    if i < len(lectures) - 1:
        end = lectures[i + 1][1] - 1
    else:
        end = doc.page_count
    ranges.append((name, start, end))

for name, s, e in ranges:
    print(f"  {name}: 页{s}-{e} ({e-s+1}页)")

doc.close()
