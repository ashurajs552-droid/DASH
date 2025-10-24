# Quick Start Guide - AI Features 🚀

## Get Started in 5 Minutes

### 1. Install Dependencies
```bash
cd student-erp-dashboard
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access the Application
Open your browser and go to: `http://localhost:5173`

---

## Testing the AI Features

### Login Credentials
**Student Account:**
- Email: `student@demo.com`
- Password: `password`

### Navigate Through Features

#### 1️⃣ **AI Chat Assistant**
- Click the "AI Assistant" tab
- Click "Open AI Chat" or use the floating chat button
- Try asking:
  - "Help me with math homework"
  - "Explain photosynthesis"
  - "How do I prepare for exams?"

#### 2️⃣ **AI Assignment Generator**
- Click the "AI Assignments" tab
- Enter:
  - Subject: "Mathematics"
  - Topic: "Calculus"
  - Difficulty: Medium
- Click "Generate Assignment"
- View your personalized assignment

#### 3️⃣ **My Notes**
- Click the "My Notes" tab
- Click "New Note"
- Fill in:
  - Title: "Physics Formulas"
  - Subject: "Physics"
  - Content: Your notes
  - Tags: "physics, formulas, mechanics"
- Click "Save Note"
- Try the search feature
- Pin/unpin notes

#### 4️⃣ **Student Tools**
- Click the "Student Tools" tab
- Select any tool (e.g., "Essay Writing Helper")
- Enter your topic
- Click "Generate with AI"
- View the comprehensive guidance

---

## Features Overview

### 📊 Overview Tab
- Student profile and stats
- CGPA and attendance tracking
- Subject performance charts
- Academic summary

### 🤖 AI Assistant Tab
- Real-time chat with AI tutor
- Context-aware responses
- Homework help
- Concept explanations

### ✨ AI Assignments Tab
- Custom assignment generation
- Multiple difficulty levels
- Subject-specific content
- Save and export options

### 📝 My Notes Tab
- Create and organize notes
- Tag-based search
- Pin important notes
- Subject categorization

### 🛠️ Student Tools Tab
- Essay Writing Helper
- Math Problem Solver
- Study Plan Generator
- Concept Explainer
- Lab Report Assistant
- Practice Quiz Generator

---

## Tips for Best Experience

### 💡 Pro Tips
1. **Be Specific**: The more details you provide, the better the AI responses
2. **Explore All Tools**: Each tool serves a different purpose
3. **Save Your Work**: Use notes to save important information
4. **Regular Practice**: Generate assignments regularly for practice
5. **Use Tags**: Tag your notes for easy searching later

### ⚡ Keyboard Shortcuts
- **Chat**: Press `Enter` to send message
- **Search Notes**: Type in search box to filter instantly

### 📱 Mobile Friendly
- All features work on mobile devices
- Responsive design adapts to your screen
- Touch-friendly interface

---

## Common Questions

### Q: Is this real AI?
A: Currently uses simulated AI responses. For production, integrate with OpenAI API, Claude, or similar services.

### Q: Can I save my chat history?
A: Chat history is maintained during your session but not persisted. Future update will add this.

### Q: How do I export my notes?
A: Click the note to view details. Export functionality coming in future update.

### Q: Can I customize the AI responses?
A: Yes! Edit the response logic in the respective component files.

---

## Next Steps

### For Students
1. Explore all tabs and features
2. Create your first note
3. Generate a practice assignment
4. Chat with the AI assistant
5. Try different educator tools

### For Developers
1. Check `AI_FEATURES.md` for technical details
2. Review component structure in `/src/components/student/`
3. Customize AI responses as needed
4. Add real AI API integration
5. Deploy to production

---

## Need Help?

### Documentation
- **README.md** - General project information
- **AI_FEATURES.md** - Detailed AI features documentation
- **This File** - Quick start guide

### Support
- Open an issue in the repository
- Check the code comments for implementation details
- Review the component files for customization options

---

## What's New? ✨

### Recently Added Features
✅ AI Chat Assistant with floating button
✅ AI Assignment Generator with 3 difficulty levels
✅ Notes Management with search and tags
✅ 6 Educator AI Tools for different subjects
✅ Tab-based navigation for easy access
✅ Beautiful animations and transitions
✅ Mobile-responsive design

---

## Troubleshooting

### Issue: Dependencies not installing
**Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Issue: Port already in use
**Solution**: Kill the process on port 5173 or change port in `vite.config.ts`

### Issue: TypeScript errors
**Solution**: Run `npm run build` to check for errors and fix any type issues

### Issue: Styles not loading
**Solution**: Make sure Tailwind CSS is properly configured in `tailwind.config.js`

---

## Success Checklist ✅

- [ ] Installed dependencies successfully
- [ ] Development server running
- [ ] Logged in as student
- [ ] Viewed all 5 tabs
- [ ] Tested AI chat assistant
- [ ] Generated an assignment
- [ ] Created a note
- [ ] Tried an educator tool
- [ ] Checked mobile responsiveness

---

**Ready to learn with AI! 🎓✨**

For detailed documentation, see `AI_FEATURES.md`  
For deployment instructions, see `README.md`
