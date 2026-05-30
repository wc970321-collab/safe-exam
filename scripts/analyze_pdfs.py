"""分析三个PDF文件的结构：页数、大纲、每章起始页"""
import fitz
import json

pdfs = [
    ("讲义", "D:/baidudownload/讲义.pdf"),
    ("章节题", "D:/baidudownload/2025年注安《法律法规》章节题.pdf"),
    ("思维导图", "D:/baidudownload/2025中安《法规》思维导图.pdf"),
]

results = {}
for label, path in pdfs:
    doc = fitz.open(path)
    info = {"pages": doc.page_count, "toc": []}
    toc = doc.get_toc()
    if toc:
        for item in toc:
            info["toc"].append({"level": item[0], "title": item[1], "page": item[2]})
    else:
        # 无书签时从前几页提取标题
        for i in range(min(10, doc.page_count)):
            text = doc[i].get_text()[:150].strip()
            if text:
                info["toc"].append({"page": i+1, "preview": text[:80]})
    doc.close()
    results[label] = info

print(json.dumps(results, ensure_ascii=False, indent=2))
