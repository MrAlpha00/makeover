#!/usr/bin/env python3
"""Generate report.pdf from report.md using fpdf2 with Unicode support"""

import os
import unicodedata
from fpdf import FPDF

REPORT_MD = r"C:\Users\sm468\OneDrive\Desktop\m projects\makeover\report.md"
OUTPUT_PDF = r"C:\Users\sm468\OneDrive\Desktop\m projects\makeover\report.pdf"

def sanitize(text):
    """Replace unsupported characters with ASCII equivalents"""
    replacements = {
        '\u2192': '->', '\u2014': '--', '\u2013': '-', '\u2018': "'", '\u2019': "'",
        '\u201c': '"', '\u201d': '"', '\u2026': '...', '\u00a0': ' ',
        '\u2713': '[v]', '\u2717': '[x]', '\u2022': '-', '\u00b7': '.',
        '\u2705': '[OK]', '\u274c': '[X]', '\u26a0': '!', '\u2764': '<3',
        '\ud83c\udf89': '', '\ud83d\ude80': '', '\ud83d\udcde': '', '\ud83d\udcac': '',
    }
    for k, v in replacements.items():
        text = text.replace(k, v)
    # Remove any remaining non-ASCII
    return text.encode('ascii', 'replace').decode('ascii')

class ReportPDF(FPDF):
    def header(self):
        self.set_font('Helvetica', 'I', 8)
        self.cell(0, 5, 'PARTYHUBS - Event Booking & Management Platform', 0, 0, 'C')
        self.ln(3)
        self.set_draw_color(180)
        self.line(10, 12, 200, 12)
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font('Helvetica', 'I', 8)
        self.set_draw_color(180)
        self.line(10, self.get_y() - 2, 200, self.get_y() - 2)
        self.cell(60, 10, 'Department of Computer Science Engineering', 0, 0, 'L')
        self.cell(80, 10, 'College Name', 0, 0, 'C')
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'R')

    def chapter_title(self, title):
        self.set_font('Helvetica', 'B', 14)
        self.set_text_color(30, 30, 30)
        self.cell(0, 10, title, 0, 1, 'L')
        self.set_draw_color(200)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(4)

    def body_text(self, text):
        self.set_font('Helvetica', '', 11)
        self.set_text_color(50, 50, 50)
        text = sanitize(text)
        text = text.replace('**', '').replace('*', '').replace('`', '').replace('#', '')
        while '  ' in text:
            text = text.replace('  ', ' ')
        self.multi_cell(0, 6, text)
        self.ln(3)

    def code_block(self, text):
        self.set_font('Courier', '', 9)
        self.set_fill_color(245, 245, 245)
        self.set_text_color(30, 30, 30)
        text = sanitize(text)
        lines = text.split('\n')
        for line in lines:
            if line.strip():
                self.cell(5)
                w = self.get_string_width(line[:80]) + 10
                if w > 190:
                    self.multi_cell(0, 5, line[:100])
                else:
                    self.cell(0, 5, line[:100], 0, 1, 'L', True)
        self.ln(3)

pdf = ReportPDF()
pdf.set_auto_page_break(auto=True, margin=20)
pdf.add_page()

# Title page
pdf.ln(40)
pdf.set_font('Helvetica', 'B', 24)
pdf.set_text_color(30, 30, 30)
pdf.cell(0, 15, 'PARTYHUBS', 0, 1, 'C')
pdf.set_font('Helvetica', '', 16)
pdf.cell(0, 10, 'Event Booking & Management Platform', 0, 1, 'C')
pdf.ln(10)
pdf.set_font('Helvetica', 'I', 12)
pdf.cell(0, 8, 'A Final Year Major Project Report', 0, 1, 'C')
pdf.ln(10)
pdf.set_font('Helvetica', '', 12)
pdf.cell(0, 8, 'Submitted in partial fulfillment of the requirements', 0, 1, 'C')
pdf.cell(0, 8, 'for the degree of Bachelor of Engineering', 0, 1, 'C')
pdf.cell(0, 8, 'in Computer Science and Engineering', 0, 1, 'C')
pdf.ln(15)
pdf.set_font('Helvetica', 'B', 12)
pdf.cell(0, 8, '[Student Name]  |  [USN / Roll Number]', 0, 1, 'C')
pdf.ln(5)
pdf.set_font('Helvetica', '', 11)
pdf.cell(0, 8, 'Under the Guidance of [Guide Name]', 0, 1, 'C')
pdf.ln(20)
pdf.set_font('Helvetica', '', 11)
pdf.cell(0, 8, 'DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING', 0, 1, 'C')
pdf.cell(0, 8, '[COLLEGE NAME], Bangalore, India', 0, 1, 'C')
pdf.cell(0, 8, 'Academic Year: 2025-2026', 0, 1, 'C')

# Read and process markdown
with open(REPORT_MD, 'r', encoding='utf-8') as f:
    content = f.read()

# Split by chapters
chapters = content.split('# Chapter ')
# Skip first element (cover/toc/abstract stuff)
for i, chapter in enumerate(chapters[1:], 1):
    lines = chapter.strip().split('\n')
    title = lines[0].strip()
    body = '\n'.join(lines[1:]).strip()
    
    pdf.add_page()
    pdf.chapter_title(f'Chapter {title}')
    
    in_code = False
    code_text = ''
    current_para = ''
    
    for line in body.split('\n'):
        line = line.strip()
        
        if line.startswith('```'):
            if in_code:
                pdf.code_block(code_text.strip())
                code_text = ''
                in_code = False
            else:
                if current_para:
                    pdf.body_text(current_para)
                    current_para = ''
                in_code = True
            continue
        
        if in_code:
            code_text += line + '\n'
            continue
        
        if line.startswith('##'):
            if current_para:
                pdf.body_text(current_para)
                current_para = ''
            pdf.set_font('Helvetica', 'B', 12)
            pdf.set_text_color(50, 50, 50)
            pdf.cell(0, 8, line.replace('#', '').replace('*', ''), 0, 1, 'L')
            pdf.ln(2)
            continue
        
        if line.startswith('|') and '---' not in line:
            if current_para:
                pdf.body_text(current_para)
                current_para = ''
            pdf.set_font('Courier', '', 9)
            pdf.set_text_color(50, 50, 50)
            pdf.multi_cell(0, 5, line)
            pdf.ln(1)
            continue
        
        if not line:
            if current_para:
                pdf.body_text(current_para)
                current_para = ''
            continue
        
        current_para += line + ' '
    
    if current_para:
        pdf.body_text(current_para)

pdf.output(OUTPUT_PDF)
print(f"PDF created: {OUTPUT_PDF}")
print(f"Size: {os.path.getsize(OUTPUT_PDF) / 1024:.1f} KB")
print(f"Pages: {pdf.pages_count}")
