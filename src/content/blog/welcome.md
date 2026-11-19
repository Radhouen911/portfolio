---
title: "Welcome: what this blog is for"
description: "Why I'm writing here, and what you can expect: CTF write-ups, security notes and lessons from building things."
pubDate: 2026-11-19
tags: ["Meta"]
draft: true
---

This is a placeholder post so you can see how the blog looks. Replace it with your own first post, or delete it.

## How to write a post

1. Create a new `.md` file in `src/content/blog/`.
2. Add the frontmatter at the top (`title`, `description`, `pubDate`, `tags`).
3. Write in Markdown below it. Code blocks get syntax highlighting:

```python
def greet(name: str) -> str:
    return f"Hello, {name}"
```

4. Set `draft: true` to keep a post visible only on your local machine. Remove it (or set `false`) to publish.

> Posts are plain files in the repo, so every change is versioned and deploys automatically on push.
