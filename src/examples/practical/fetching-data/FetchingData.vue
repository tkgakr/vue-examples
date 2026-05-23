<!--
この例では、GitHubのAPIからVue Coreの最新のコミットデータを取得し、リストとして表示します。
2つの主要なブランチを切り替えることができます。
-->
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

interface CommitAuthor {
  name: string
  email: string
  date: string
}

interface Commit {
  sha: string
  html_url: string
  author: {
    login: string
    html_url: string
  } | null
  commit: {
    message: string
    author: CommitAuthor
  }
}

const API_URL = 'https://api.github.com/repos/vuejs/core/commits?per_page=3&sha='
const branches = ['main', 'minor'] as const
type Branch = (typeof branches)[number]

const currentBranch = ref<Branch>(branches[0])
const commits = ref<Commit[]>([])

watchEffect(async () => {
  // このエフェクトは直ちに実行され、`currentBranch.value` が変わるたびに再実行される
  const url = `${API_URL}${currentBranch.value}`
  const response = await fetch(url)
  commits.value = (await response.json()) as Commit[]
})

// コミットメッセージの1行目(要約)だけを抽出する
function truncate(v: string) {
  const newline = v.indexOf('\n')
  return newline > 0 ? v.slice(0, newline) : v
}

// ISO 8601形式を読みやすくする（例: 2026-05-23T08:30:00Z -> 2026-05-23 08:30:00）
function formatDate(v: string) {
  return v.replace(/T|Z/g, ' ').trim()
}
</script>

<template>
  <h1>Latest Vue Core Commits</h1>
  <template
    v-for="branch in branches"
    :key="branch"
  >
    <input
      :id="branch"
      v-model="currentBranch"
      type="radio"
      :value="branch"
      name="branch"
    >
    <label :for="branch">{{ branch }}</label>
  </template>
  <p>vuejs/core@{{ currentBranch }}</p>
  <ul v-if="commits.length > 0">
    <li
      v-for="{html_url, sha, author, commit } in commits"
      :key="sha"
    >
      <a
        :href="html_url"
        target="_blank"
        class="commit"
      >{{ sha.slice(0, 7) }}</a>
      - <span class="message">{{ truncate(commit.message) }}</span><br>
      by <span class="author">
        <a
          v-if="author"
          :href="author.html_url"
          target="_blank"
        >{{ commit.author.name }}</a>
        <template v-else>{{ commit.author.name }}</template>
      </span>
      at <span class="date">{{ formatDate(commit.author.date) }}</span>
    </li>
  </ul>
</template>

<style>
a {
  text-decoration: none;
  color: #42b883;
}
li {
  line-height: 1.5em;
  margin-bottom: 20px;
}
.author,
.date {
  font-weight: bold;
}
</style>
