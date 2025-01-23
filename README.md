# Drag-and-Drop-Workflow-UI-for-LLM-Applications

# LLM Workflow UI

A powerful drag-and-drop interface for creating and deploying LLM-powered workflows. Built with React, React Flow, and OpenAI integration.

![LLM Workflow UI](https://images.unsplash.com/photo-1607798748738-b15c40d33d57?auto=format&fit=crop&q=80)

## 🚀 Features

- **Visual Workflow Builder**
  - Drag-and-drop interface
  - Node-based workflow design
  - Real-time preview
  
- **LLM Integration**
  - OpenAI GPT models support
  - Configurable model parameters
  - Secure API key management

- **Interactive Chat**
  - AI assistant interface
  - Real-time responses
  - Message history

## 🛠️ Tech Stack

- React 18
- TypeScript
- React Flow
- Zustand
- Tailwind CSS
- Lucide Icons
- OpenAI API

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/llm-workflow-ui.git

# Navigate to project directory
cd llm-workflow-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🌟 Getting Started

### 1. Initial Setup

```bash
# Create a new branch for your work
git checkout -b feature/my-feature

# Create a .env file for your OpenAI API key
echo "OPENAI_API_KEY=your-api-key-here" > .env
```

### 2. Development Workflow

```bash
# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### 3. Git Workflow

```bash
# Check status of your changes
git status

# Stage changes
git add .

# Create a commit
git commit -m "feat: add new workflow feature"

# Push changes
git push origin feature/my-feature

# Create a pull request
gh pr create --title "Feature: New Workflow Implementation" --body "Description of changes"
```

## 🏗️ Project Structure

```
llm-workflow-ui/
├── src/
│   ├── components/
│   │   ├── nodes/
│   │   │   ├── InputNode.tsx
│   │   │   ├── LLMNode.tsx
│   │   │   └── OutputNode.tsx
│   │   ├── Sidebar.tsx
│   │   └── ChatWindow.tsx
│   ├── store.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
└── README.md
```

## 💻 Usage

### Creating a Workflow

1. Drag nodes from the sidebar onto the canvas
2. Connect nodes in sequence:
   - Input → LLM → Output
3. Configure the LLM node with your OpenAI API key
4. Enter your prompt in the Input node
5. Click "Run" to execute the workflow

### Using the Chat Interface

1. Deploy your workflow using the "Deploy" button
2. Click "Chat" to open the AI assistant
3. Start chatting with the AI

## 🔄 Git Commit Convention

```bash
# Feature
git commit -m "feat: add new workflow validation"

# Bug fix
git commit -m "fix: resolve node connection issue"

# Documentation
git commit -m "docs: update installation guide"

# Style changes
git commit -m "style: improve chat window layout"

# Code refactoring
git commit -m "refactor: optimize state management"
```

## 🚀 Deployment

```bash
# Build the project
npm run build

# Preview production build
npm run preview

# Deploy to production
npm run deploy
```

## 🤝 Contributing

```bash
# Fork the repository
gh repo fork yourusername/llm-workflow-ui

# Clone your fork
git clone https://github.com/yourusername/llm-workflow-ui.git

# Create a feature branch
git checkout -b feature/amazing-feature

# Push changes
git push origin feature/amazing-feature

# Create pull request
gh pr create
```

## 📝 Git Best Practices

1. **Keep commits atomic**
```bash
# Bad
git commit -m "update everything"

# Good
git commit -m "feat: add input validation to LLM node"
```

2. **Use feature branches**
```bash
# Create and switch to feature branch
git checkout -b feature/new-chat-ui

# After work is complete
git push origin feature/new-chat-ui
```

3. **Regular updates from main**
```bash
# Update main branch
git checkout main
git pull origin main

# Update feature branch
git checkout feature/new-chat-ui
git rebase main
```

4. **Clean history with interactive rebase**
```bash
# Cleanup last 3 commits
git rebase -i HEAD~3
```

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, email support@llmworkflow.com or join our Slack channel.

---

Made with ❤️ by Your Team
