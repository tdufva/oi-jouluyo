#!/bin/zsh
cd -- "$(dirname -- "$0")" || exit 1
export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"
python3 editor_server.py --open
