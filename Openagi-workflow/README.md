# 🤖 OpenAGI Workflow

<div align="center">
  <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop" alt="OpenAGI Banner" width="800px" />
  
  <p align="center">
    <strong>A powerful visual workflow builder for AI operations using OpenAI's GPT models</strong>
  </p>

  <p align="center">
    <a href="#-features">Features</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-installation">Installation</a> •
    <a href="#-usage">Usage</a> •
    <a href="#%EF%B8%8F-development">Development</a> •
    <a href="#-contributing">Contributing</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React-18-blue?logo=react" alt="React 18" />
    <img src="https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript" alt="TypeScript 5.3" />
    <img src="https://img.shields.io/badge/Tailwind-3.4-blue?logo=tailwindcss" alt="Tailwind 3.4" />
    <img src="https://img.shields.io/badge/License-MIT-green" alt="License MIT" />
  </p>
</div>

## 🌟 Overview

OpenAGI Workflow is a sophisticated visual interface for creating and managing AI workflows. It provides an intuitive drag-and-drop environment where users can design, test, and deploy AI operations using OpenAI's powerful GPT models.

## ✨ Features

- 🎨 **Visual Workflow Builder**
  - Intuitive drag-and-drop interface
  - Real-time node connections
  - Visual feedback and validation

- 🔄 **Real-time Execution**
  - Instant workflow testing
  - Live output preview
  - Error handling and feedback

- 💬 **Interactive Chat Interface**
  - Real-time AI responses
  - Conversation history
  - Multiple chat sessions

- 🎛️ **Advanced Configuration**
  - Model selection (GPT-3.5/GPT-4)
  - Temperature control
  - Token limit management
  - API key security

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/openagi-workflow.git

# Navigate to project directory
cd openagi-workflow

# Install dependencies
npm install

# Start development server
npm run dev
```

## 💻 Installation

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- OpenAI API key

### Step-by-Step Setup

1. **Initialize Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/openagi-workflow.git
   git push -u origin main
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📖 Usage

### Building Your First Workflow

1. **Add Nodes**
   - Drag components from the left sidebar
   - Position them on the canvas
   - Available nodes: Input, LLM Engine, Output

2. **Connect Components**
   ```
   Input Node → LLM Engine → Output Node
   ```

3. **Configure Settings**
   - Input: Enter your prompt/question
   - LLM Engine:
     - Select model (GPT-3.5/GPT-4)
     - Set temperature (0-1)
     - Configure max tokens
     - Add API key
   - Output: View generated response

### Using the Chat Interface

1. **Deploy Workflow**
   - Click "Deploy" button
   - Wait for confirmation

2. **Start Chat**
   - Click "Chat" button
   - New conversation starts
   - Previous chats accessible from sidebar

## 🛠️ Development

### Project Architecture

```
openagi-workflow/
├── src/
│   ├── components/          # React components
│   │   ├── nodes/          # Flow diagram nodes
│   │   │   ├── InputNode   # Input component
│   │   │   ├── LLMNode     # LLM engine component
│   │   │   └── OutputNode  # Output component
│   │   ├── ChatWindow      # Chat interface
│   │   └── Sidebar         # Component sidebar
│   ├── hooks/              # Custom React hooks
│   ├── store/              # State management
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions
│   └── App.tsx             # Main application
├── public/                 # Static assets
└── ...
```

### Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Flow Diagram**: React Flow
- **Icons**: Lucide React
- **AI Integration**: OpenAI API

### Git Workflow

1. **Feature Development**
   ```bash
   # Create feature branch
   git checkout -b feature/new-feature

   # Make changes
   git add .
   git commit -m "feat: add new feature"

   # Push changes
   git push origin feature/new-feature
   ```

2. **Code Review Process**
   ```bash
   # Update from main
   git checkout main
   git pull origin main

   # Merge feature
   git merge feature/new-feature
   git push origin main
   ```

### Commit Convention

```
type(scope): description

Types:
- feat     New feature
- fix      Bug fix
- docs     Documentation
- style    Formatting
- refactor Code restructuring
- test     Testing
- chore    Maintenance
```

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide](CONTRIBUTING.md) for details.

1. **Fork Repository**
2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit Changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push Branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT models
- React Flow for workflow interface
- Lucide for icons
- All contributors and supporters