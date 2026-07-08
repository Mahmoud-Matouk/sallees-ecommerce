---
trigger: always_on
description: Rules for generating and formatting Git commits in this project
globs: *
---

# Git Commit Guidelines

This guide provides simple principles to follow when making commits to this project.

## Core Principles

1. **Group related changes** - Keep each commit focused on a single logical change or feature
2. **Use multiple commits** - Break down large changes into several smaller, targeted commits
3. **Write descriptive messages** - Explain _why_ the change was made, not just what files were changed
4. **Be thorough** - Include all related changes in each commit

## Commit Message Format

```text
<type>: <short summary>

<optional longer description>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Formatting, missing semicolons, etc; no code change
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding or updating tests
- **chore**: Changes to the build process, dependencies, etc

### Examples

Good:

```text
feat: Add multilingual support for IELTS system

Implements translation files for both Arabic and English to ensure
complete localization of all IELTS-related features
```

Bad:

```text
Updates files

Changed many files to add new feature
```

## Best Practices

- Run `npx prettier --write .` to format your code before committing
- Keep the summary line under 50 characters if possible
- Wrap longer descriptions at 72 characters
- Use the imperative mood in the subject line ("Add feature" not "Added feature")
- Reference issue numbers when relevant
- Commit often - small, frequent commits are better than large, infrequent ones
