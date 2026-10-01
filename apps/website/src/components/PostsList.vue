<script setup lang="ts">
import { postController } from "@gold/apis/posts"
import { useQuery } from "@tanstack/vue-query"
import { apiConfig } from "../config/api"

const { data: posts, isPending, isError } = useQuery(postController.getPostList({ limit: 10 }))
</script>

<template>
  <section class="border-gold-500/20 rounded-2xl border bg-white p-6 shadow-sm">
    <p class="text-gold-700 text-xs font-semibold tracking-wide uppercase">
      @gold/apis + TanStack Vue Query
    </p>
    <h2 class="text-foreground mt-2 text-xl font-bold">Posts from shared API layer</h2>
    <p class="text-foreground-muted mt-2 text-sm">
      API base URL:
      <code class="bg-gold-100 rounded px-1.5 py-0.5 text-sm">{{ apiConfig.baseURL }}</code>
    </p>

    <p v-if="isPending" class="text-foreground-muted mt-4 text-sm">Loading posts…</p>
    <p v-else-if="isError" class="mt-4 text-sm text-red-600">Failed to load posts.</p>

    <ul v-else class="mt-4 grid list-none gap-3 p-0 sm:grid-cols-2">
      <li
        v-for="post in posts"
        :key="post.id"
        class="border-gold-500/15 bg-gold-50/40 rounded-xl border p-4"
      >
        <p class="text-gold-700 mb-1 text-xs font-semibold tracking-wide uppercase">
          #{{ post.id }}
        </p>
        <h3 class="text-foreground mb-2 text-sm font-semibold">{{ post.title }}</h3>
        <p class="text-foreground-muted m-0 line-clamp-3 text-sm">{{ post.body }}</p>
      </li>
    </ul>
  </section>
</template>
