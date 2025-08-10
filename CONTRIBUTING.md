# 🤝 Contributing to Second Brain

Thank you for your interest in contributing to Second Brain! This document provides guidelines and information for contributors.

## 🚀 Quick Start

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch
4. **Make** your changes
5. **Test** your changes
6. **Commit** with a clear message
7. **Push** to your fork
8. **Create** a Pull Request

## 📋 Prerequisites

- Node.js (v18 or higher)
- Bun (v1.2.10 or higher)
- MongoDB (local or cloud)
- Git

## 🔧 Development Setup

### 1. Fork and Clone
```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/brainly-app.git
cd brainly-app
```

### 2. Install Dependencies
```bash
# Install all dependencies (frontend + backend)
npm run install:all
```

### 3. Environment Setup
```bash
# Backend environment
cd backend
cp .env.example .env
# Edit .env with your configuration

# Frontend environment (if needed)
cd ../frontend
cp .env.example .env
# Edit .env with your configuration
```

### 4. Start Development Servers
```bash
# From root directory - starts both frontend and backend
npm run dev
```

## 🎯 Areas to Contribute

### 🐛 Bug Fixes
- Fix issues reported in the [Issues](https://github.com/yourusername/brainly-app/issues) section
- Ensure your fix doesn't break existing functionality
- Add tests for the bug fix

### ✨ New Features
- Check the [Projects](https://github.com/yourusername/brainly-app/projects) for planned features
- Discuss your feature idea in an issue first
- Follow the existing code patterns and architecture

### 📚 Documentation
- Improve README sections
- Add code comments
- Create tutorials or guides
- Update API documentation

### 🎨 UI/UX Improvements
- Enhance the user interface
- Improve accessibility
- Add animations or transitions
- Optimize for mobile devices

### 🧪 Testing
- Add unit tests
- Add integration tests
- Improve test coverage
- Create test utilities

## 📝 Code Style Guidelines

### TypeScript
- Use strict TypeScript configuration
- Define proper interfaces and types
- Avoid `any` type when possible
- Use meaningful variable and function names

### React
- Use functional components with hooks
- Follow React best practices
- Use proper prop types
- Keep components small and focused

### Backend
- Use async/await for asynchronous operations
- Implement proper error handling
- Follow REST API conventions
- Use meaningful variable names

### General
- Use consistent indentation (2 spaces)
- Add comments for complex logic
- Keep functions small and focused
- Follow the existing file structure

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
bun test
```

### Manual Testing
- Test on different browsers
- Test on mobile devices
- Test with different screen sizes
- Test all user flows

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```
feat(auth): add password reset functionality
fix(ui): resolve mobile layout issues
docs(readme): update installation instructions
test(api): add user authentication tests
```

## 🔄 Pull Request Process

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes
- Write clean, well-documented code
- Add tests for new functionality
- Update documentation if needed
- Follow the code style guidelines

### 3. Test Your Changes
```bash
# Run all tests
npm test

# Start development servers
npm run dev

# Test manually in browser
```

### 4. Commit Your Changes
```bash
git add .
git commit -m "feat(scope): your commit message"
```

### 5. Push to Your Fork
```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request
- Use a clear, descriptive title
- Describe the changes in detail
- Include screenshots if applicable
- Reference related issues
- Request reviews from maintainers

### 7. PR Review Process
- Address review comments
- Make requested changes
- Update the PR as needed
- Maintainers will merge when ready

## 🐛 Reporting Bugs

### Before Reporting
- Check existing issues
- Try to reproduce the bug
- Test on different browsers/devices

### Bug Report Template
```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen

**Actual Behavior**
What actually happened

**Environment**
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 22]

**Additional Context**
Any other context about the problem
```

## 💡 Feature Requests

### Before Requesting
- Check existing issues and projects
- Think about the use case
- Consider implementation complexity

### Feature Request Template
```markdown
**Feature Description**
Clear description of the feature

**Use Case**
Why this feature would be useful

**Proposed Implementation**
How you think it could be implemented

**Additional Context**
Any other relevant information
```

## 🏷️ Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements or additions to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `question`: Further information is requested

## 📞 Getting Help

- **Issues**: Use GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub discussions for questions and ideas
- **Email**: Contact maintainers directly for sensitive issues

## 🎉 Recognition

Contributors will be recognized in:
- README contributors section
- Release notes
- Project documentation

## 📄 License

By contributing to Second Brain, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Second Brain! 🧠✨
