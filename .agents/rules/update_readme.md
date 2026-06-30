# Skill: Update Readme (Analyze Git File History and Summarize Changes)

This skill outlines the process for locating the last commit that modified a specific file (such as `README.md`), extracting the changes introduced by that commit, and summarizing those changes in a professional, structured format.

## Procedure

1. **Locate Target Commits**:
   Run the following command to retrieve the most recent commits modifying the target file (e.g., `README.md`):
   ```bash
   git log -n 5 --oneline -- <file_path>
   ```

2. **Inspect the Last Modifying Commit**:
   Identify the target commit hash from the log (excluding formatting-only commits if necessary) and view the detailed diff for the target file:
   ```bash
   git show <commit_hash> -- <file_path>
   ```
   *Tip*: If the diff is extremely large, redirect the output to a temporary file for structured reading:
   ```bash
   git show <commit_hash> -- <file_path> > temp_diff.txt
   ```

3. **Analyze and Classify Added Content**:
   Examine the added lines (prefixed with `+`) to identify:
   - Core architectural or logic patterns introduced.
   - New external tools, integrations, dependencies, or configurations.
   - Enhancements to the tech stack, developer workflows, or APIs.

4. **Formulate a Professional Summary**:
   Draft a clean, structured overview of the modifications, grouping related changes logically and utilizing professional technical terminology. Avoid generic descriptions and focus on the *engineering intent* and *value* of the additions.
