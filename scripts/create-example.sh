#!/usr/bin/env bash

set -euo pipefail

usage() {
  cat <<'USAGE'
Usage:
  scripts/create-example.sh <category> <example-name>

Example:
  scripts/create-example.sh basic handling-input
  -> src/examples/basic/handling-input/HandlingInput.vue
USAGE
}

to_pascal_case() {
  local input=$1
  local pascal=''
  local part

  IFS='-' read -ra parts <<< "$input"
  for part in "${parts[@]}"; do
    pascal+="$(printf '%s' "${part:0:1}" | tr '[:lower:]' '[:upper:]')${part:1}"
  done

  printf '%s\n' "$pascal"
}

to_title_case() {
  local input=$1
  local title=''
  local part

  IFS='-' read -ra parts <<< "$input"
  for part in "${parts[@]}"; do
    if [[ -n $title ]]; then
      title+=' '
    fi
    title+="$(printf '%s' "${part:0:1}" | tr '[:lower:]' '[:upper:]')${part:1}"
  done

  printf '%s\n' "$title"
}

if [[ $# -ne 2 ]]; then
  usage >&2
  exit 1
fi

category=$1
example_name=$2

if [[ ! $category =~ ^[a-z][a-z0-9-]*$ ]]; then
  printf 'Error: category must be kebab-case, got "%s".\n' "$category" >&2
  exit 1
fi

if [[ ! $example_name =~ ^[a-z][a-z0-9]*(-[a-z0-9]+)*$ ]]; then
  printf 'Error: example-name must be kebab-case, got "%s".\n' "$example_name" >&2
  exit 1
fi

component_name=$(to_pascal_case "$example_name")
example_title=$(to_title_case "$example_name")
category_title=$(to_title_case "$category")
example_dir="src/examples/${category}/${example_name}"

if [[ -e $example_dir ]]; then
  printf 'Error: "%s" already exists.\n' "$example_dir" >&2
  exit 1
fi

mkdir -p "$example_dir"

cat > "${example_dir}/${component_name}.vue" <<'EOF'
<script setup lang="ts">

</script>

<template>

</template>

<style>

</style>
EOF

cat > "${example_dir}/${component_name}.test.ts" <<EOF
import { mount } from '@vue/test-utils'

import ${component_name} from './${component_name}.vue'

describe('${component_name}', () => {
  it('${example_title}', () => {
    const wrapper = mount(${component_name})
  })
})
EOF

cat > "${example_dir}/README.md" <<EOF
# ${example_title}

## 学んだこと

-

## 気になったこと

-

## 参考
EOF

printf 'Created %s\n' "$example_dir"
printf '  %s.vue\n' "$component_name"
printf '  %s.test.ts\n' "$component_name"
printf '  README.md\n'
cat <<EOF

\`src/router/index.ts\` の \`exampleRoutes\` にルートを追加してください。

  \`\`\`ts
  {
    path: '/${category}/${example_name}',
    component: () => import('@/examples/${category}/${example_name}/${component_name}.vue'),
    meta: { category: '${category_title}', title: '${example_title}' },
  },
  \`\`\`
EOF
