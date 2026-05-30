"""提取思维导图PDF中每章的考点地图内容"""
import fitz
import json
import re
import os

doc = fitz.open("D:/baidudownload/2025中安《法规》思维导图.pdf")

output_dir = "C:/Users/ThinkPad/Downloads/safe-exam/src/content/laws/_extracted"
os.makedirs(output_dir, exist_ok=True)

# 全部提取，按页保存
all_texts = []
for i in range(doc.page_count):
    text = doc[i].get_text()
    # 清理水印
    text = re.sub(r'注册安全工程师-安全生产法律法规.*?\n', '', text)
    text = re.sub(r'\d+ / \d+\s*\n', '', text)
    all_texts.append(f"=== 思维导图第{i+1}页 ===\n{text}")

full_content = "\n\n".join(all_texts)
with open(f"{output_dir}/mindmaps_full.txt", "w", encoding="utf-8") as f:
    f.write(full_content)

print(f"思维导图PDF共{doc.page_count}页，已提取 {len(full_content)} 字符")

# 尝试按章节分组（从页1的预览看，第2页开始是第三章安全生产法的内容）
# 让我们先看看每页的前200字知道内容归属
for i in range(doc.page_count):
    text = doc[i].get_text()[:200].replace('\n', ' ')
    print(f"  页{i+1}: {text[:120]}...")

doc.close()
