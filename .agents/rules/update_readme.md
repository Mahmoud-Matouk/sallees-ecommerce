---
trigger: manual
---

# Skill: Update Readme (Sync README Content with Codebase Changes)

This skill outlines the process for reading recent git commits to identify new features, files, folders, or tool integrations, and updating the project's `README.md` main sections (e.g., directory structure tree, feature list, tables) to keep the documentation in sync with the codebase.

Do NOT add a separate commit summary, changelog, or history section. Instead, update the existing document content directly.

## Procedure

1. **Identify Codebase Changes**:
   Analyze the recent git commits to identify what code files, folders, features, or configurations were modified, added, or deleted:

   ```bash
   git log -n 5 --oneline
   ```

   Inspect the specific file modifications in those commits:

   ```bash
   git show <commit_hash> --stat
   ```

2. **Locate Target README Sections**:
   Open `README.md` and find the sections that need to be updated to reflect these codebase changes (e.g., the directory structure tree under "Project Structure", lists of features, list of API integrations/domains, or the "Tech Stack" tables).

3. **Update the Main Document Body**:
   Modify the relevant sections of `README.md` directly. For example:
   - If a folder was deleted/added, update the ASCII folder structure tree.
   - If a new domain/feature was added, update the "Supported Domains" table or feature lists.
   - If a tool/library was removed or configured, update the "AI-Augmented Development" or "Tech Stack" tables.

4. **Verify Consistency**:
   Verify that all updated file links and directory paths in the README match the actual status of the workspace, and that the tone remains professional and unified with the rest of the document.
