#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

chmod +x "$SCRIPT_DIR/generateMarkdown.sh"

if [ "$#" -ne 1 ]; then
  echo "Use: $0 <nome-do-arquivo>"
  exit 1
fi

BLOG_TITLE="$1"
CURRENT_DATE=$(date +'%Y-%m-%d')
TAGS=("tag1" "tag2")

FRONT_MATTER="---
title: $BLOG_TITLE
pubDate: $CURRENT_DATE
tags:"
for tag in "${TAGS[@]}"; do
  FRONT_MATTER+="
  - $tag"
done
FRONT_MATTER+="
---

Content
"

FILE_NAME=$(echo "$BLOG_TITLE" | sed 's/ /-/g' | tr '[:upper:]' '[:lower:]')
FILE_PATH="$SCRIPT_DIR/src/content/blog/${FILE_NAME}.md"

echo -e "$FRONT_MATTER" > "$FILE_PATH"

echo "File \"$FILE_NAME\" created \"$FILE_PATH\""
