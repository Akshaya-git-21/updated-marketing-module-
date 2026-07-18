# QC Checklist Access Guide

## Where to Access the QC Checklist System

The new QC Checklist with scoring system is accessible from **TWO** main locations:

---

## 📍 Access Point 1: Project Kanban View (Task Details)

### Path:
1. Navigate to **"Projects & Campaigns"** from the main menu
2. Click on any project to open the Kanban view
3. Click on any **task card** in the milestone columns
4. The **Task Details & QC Workflow** dialog opens
5. Click on the **"✅ QC Checklist"** tab (second tab)

### What You'll See:
- **Metrics Bar**: Total Items Scored, Average Score, Pass Threshold, Overall Weighted Score, QC Result
- **Accordion by Asset Type**: Content QC, SEO QC grouped separately
- **Score Sliders**: Each checklist item has a 0-10 slider
- **Weighted Scores**: Real-time calculation showing weighted scores
- **Gold Standard References**: Access to benchmarks and best practices
- **Auto-Move Indicator**: Green alert when score meets threshold for auto-progression

### Sample Items You'll See:
- Grammar & Spelling (Score: 10/10, Weight: 1.0x)
- Brand Tone & Voice (Score: 9/10, Weight: 1.5x) 
- Fact-Checking & Accuracy (Score: 6/10, Weight: 2.0x) - **Rework Required**
- Target Keywords Integration (Score: 9/10, Weight: 2.0x)
- Meta Title & Description (Score: 4/10, Weight: 1.5x) - **Failed**

---

## 📍 Access Point 2: QC Dashboard (QC Tracker)

### Path:
1. Navigate to **"Projects & Campaigns"** from the main menu
2. Click on the **"QC Dashboard"** tab (third tab in Projects view)
3. In the QC Tracker section, click the **eye icon** 👁️ on any task row
4. The **QC Task Review** dialog opens
5. Click on the **"QC Checklist"** tab (second tab with checklist icon)

### What You'll See:
Same comprehensive QC scoring interface as Access Point 1, plus:
- Integration with the QC review workflow
- Ability to see QC status alongside detailed scoring
- Quick access to gold standards while reviewing

---

## 🎯 Features of the QC Checklist System

### 1. **Dynamic Scoring (0-10 Scale)**
- Interactive sliders for each checklist item
- Real-time weighted score calculation
- Color-coded scores:
  - **Green**: Score ≥ Pass Threshold (e.g., 8+)
  - **Orange**: Score ≥ Threshold - 2 (e.g., 6-7)
  - **Red**: Score < Threshold - 2 (e.g., <6)

### 2. **Weighted Scoring System**
- Each item has a weight multiplier (1.0x, 1.5x, 2.0x)
- Formula: `Weighted Score = Score × Weight`
- Example: Score 9 × Weight 1.5 = 13.5 weighted points
- Overall score calculated as percentage of total possible weighted points

### 3. **Auto-Move to Next Milestone**
- When Overall Weighted Score ≥ Pass Threshold (e.g., 78%)
- Green button appears: **"✅ Approve & Auto-Move"**
- System automatically moves task to next milestone
- Stakeholders get notified

### 4. **Gold Standards Reference**
- Click **"📘 View Gold Standard"** on any item
- See benchmark expectations
- View measurement methods (Manual/Automated/Hybrid)
- Access reference documentation links

### 5. **Asset Type Grouping**
Currently supports:
- **Content QC**: Grammar, Brand Voice, Fact-Checking, Readability, Plagiarism, Structure
- **SEO QC**: Keywords, Meta Tags, Internal Links, Image Alt Tags
- **Design QC**: (can be added)
- **Technical QC**: (can be added)
- **SMM QC**: (can be added)

### 6. **QC Comments per Item**
- Detailed feedback textarea for each checklist item
- Examples:
  - "Need to update 2023 statistics to 2024, verify claim in paragraph 3"
  - "Meta description is 185 characters - exceeds limit, needs shortening"
  - "Only 2 internal links found, need to add 2-3 more relevant links"

### 7. **Metrics Dashboard**
Top bar shows:
- **Items Scored**: 7/10 (completed vs total)
- **Average Score**: 7.2/10
- **Pass Threshold**: 78%
- **Overall Weighted Score**: 82% (green when passing)
- **QC Result**: Pass/Rework/Fail badge

---

## 🎓 Training Tickets Integration

When QC fails accumulate (≥3 fails in same category within 30 days):
- Automatic training ticket created
- Escalation levels: L1, L2, L3
- Access via **"Training Tickets"** tab in QC Dashboard

---

## 💡 Quick Start Guide

### For QC Reviewers:
1. Go to Projects & Campaigns → Click any project
2. Click a task card → Click "✅ QC Checklist" tab
3. Use sliders to score each item (0-10)
4. Add comments for any items needing improvement
5. Check Overall Weighted Score in metrics bar
6. If score ≥ threshold, click "Approve & Auto-Move"
7. If score < threshold, task stays for rework

### For Content Creators:
1. Go to QC Dashboard → QC Tasks tab
2. Find your tasks in "Pending" or "Rework" status
3. Click eye icon to see detailed QC scores
4. Review comments on failed/rework items
5. Make improvements based on feedback
6. Resubmit for QC review

---

## 📊 Sample Scoring Scenario

**Task**: Blog Post - "Cloud Computing Guide"

**Content QC** (6 items):
- Grammar & Spelling: 10/10 × 1.0 = 10 ✅
- Brand Voice: 9/10 × 1.5 = 13.5 ✅
- Fact-Checking: 6/10 × 2.0 = 12 ⚠️ (Rework - outdated stats)
- Readability: 8/10 × 1.0 = 8 ✅
- Originality: 10/10 × 2.0 = 20 ✅
- Structure: 9/10 × 1.0 = 9 ✅

**SEO QC** (4 items):
- Keywords: 9/10 × 2.0 = 18 ✅
- Meta Tags: 4/10 × 1.5 = 6 ❌ (Failed - too long)
- Internal Links: 6/10 × 1.0 = 6 ⚠️ (Rework - need more)
- Image Alt Tags: 0/10 × 1.0 = 0 ⏳ (Pending)

**Overall Calculation**:
- Total Weighted Score: 102.5
- Total Max Weighted: 125
- **Overall Score: 82%**
- Pass Threshold: 78%
- **Result: PASS** ✅ (eligible for auto-move)

**Action Items**:
- Content: Update 2023 statistics to 2024
- SEO: Shorten meta description to 160 chars
- SEO: Add 2-3 more internal links
- (These can be fixed post-publish or held until complete)

---

## 🔧 Troubleshooting

**Issue**: Can't see QC Checklist tab
- **Solution**: Make sure you clicked on a task card first, then look for the tab at the top of the dialog

**Issue**: Scores not calculating
- **Solution**: Try moving the slider - it updates in real-time as you change values

**Issue**: Gold Standards not showing
- **Solution**: Click the "📘 View Gold Standards" button at the top or per-item button

**Issue**: Can't auto-move task
- **Solution**: Check that Overall Weighted Score ≥ Pass Threshold. If not, improve failing items first.

---

## 📞 Support

For questions about the QC Checklist system:
1. Check this guide first
2. Review Gold Standards documentation
3. Contact QC Manager for scoring clarification
4. Report bugs or feature requests to development team

---

**Last Updated**: November 2024  
**Version**: 2.0 - Dynamic Scoring System
