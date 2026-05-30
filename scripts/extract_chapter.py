"""提取指定章节的讲义内容和练习题"""
import fitz
import json
import re
import sys

def get_page_text(path, page_num):
    """获取PDF指定页的文本"""
    doc = fitz.open(path)
    text = doc[page_num - 1].get_text()
    doc.close()
    return text

def get_pages_text(path, start_page, end_page):
    """获取PDF页码范围文本"""
    doc = fitz.open(path)
    texts = []
    for i in range(start_page - 1, min(end_page, doc.page_count)):
        texts.append(doc[i].get_text())
    doc.close()
    return "\n---PAGE BREAK---\n".join(texts)

def extract_chapter_from_exercises(pdf_path, chapter_title):
    """从习题PDF中提取某章节的题目"""
    doc = fitz.open(pdf_path)
    texts = []
    in_chapter = False
    lines_buffer = []
    
    for i in range(doc.page_count):
        text = doc[i].get_text()
        # 检查是否进入目标章节
        if chapter_title in text[:200]:
            in_chapter = True
        # 检查是否进入下一章（检测 "第.*章" 且不是当前章）
        if in_chapter:
            # 查找下一章的标记
            next_chapters = re.findall(r'(第[一二三四五六七八九十]+章\s+\S+)', text[:500])
            for nc in next_chapters:
                if nc not in chapter_title and nc != chapter_title:
                    in_chapter = False
                    break
        if in_chapter:
            texts.append(text)
    doc.close()
    return "\n---PAGE BREAK---\n".join(texts)

if __name__ == "__main__":
    action = sys.argv[1] if len(sys.argv) > 1 else "help"
    
    if action == "lecture":
        start = int(sys.argv[2])
        end = int(sys.argv[3])
        text = get_pages_text("D:/baidudownload/讲义.pdf", start, end)
        print(text)
    elif action == "preview":
        # 预览PDF的前N页看结构
        n = int(sys.argv[2]) if len(sys.argv) > 2 else 3
        source = sys.argv[3] if len(sys.argv) > 3 else "讲义"
        paths = {
            "讲义": "D:/baidudownload/讲义.pdf",
            "习题": "D:/baidudownload/2025年注安《法律法规》章节题.pdf",
            "导图": "D:/baidudownload/2025中安《法规》思维导图.pdf",
        }
        text = get_pages_text(paths[source], 1, n)
        print(text[:3000])
    else:
        print("Usage: python3 scripts/extract_chapter.py [lecture|preview] args...")
