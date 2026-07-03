<script setup lang="ts">
import { postController } from '@gold/apis/posts';
import { useQuery } from '@tanstack/vue-query';
import { apiConfig } from '../config/api';

const { data: posts, isPending, isError } = useQuery(postController.getPostList());
</script>

<template>
  <section class="rounded-2xl border border-gold-500/20 bg-white p-6 shadow-sm">
    <p class="text-xs font-semibold uppercase tracking-wide text-gold-700">
      @gold/apis + TanStack Vue Query
    </p>
    <h2 class="mt-2 text-xl font-bold text-foreground">Posts from shared API layer</h2>
    <p class="mt-2 text-sm text-foreground-muted">
      API base URL:
      <code class="rounded bg-gold-100 px-1.5 py-0.5 text-sm">{{ apiConfig.baseURL }}</code>
    </p>

    <p v-if="isPending" class="mt-4 text-sm text-foreground-muted">Loading posts…</p>
    <p v-else-if="isError" class="mt-4 text-sm text-red-600">Failed to load posts.</p>

    <ul v-else class="mt-4 grid list-none gap-3 p-0 sm:grid-cols-2">
      <li
        v-for="post in posts"
        :key="post.id"
        class="rounded-xl border border-gold-500/15 bg-gold-50/40 p-4"
      >
        <p class="mb-1 text-xs font-semibold uppercase tracking-wide text-gold-700">
          #{{ post.id }}
        </p>
        <h3 class="mb-2 text-sm font-semibold text-foreground">{{ post.title }}</h3>
        <p class="m-0 line-clamp-3 text-sm text-foreground-muted">{{ post.body }}</p>
      </li>
    </ul>
  </section>
</template>
