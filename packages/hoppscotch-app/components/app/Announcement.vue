<template>
  <div
    class="flex transition"
    :class="[background, { 'justify-center': center }]"
  >
    <component
      :is="link ? 'a' : 'span'"
      :href="link"
      target="_blank"
      class="
        flex
        py-2
        px-4
        transition
        relative
        items-center
        justify-center
        group
      "
      :class="color"
    >
      <SmartIcon :name="icon" class="svg-icons mr-2" />
      <span class="md:hidden">
        {{ short }}
      </span>
      <span class="hidden md:inline">
        {{ long }}
      </span>
    </component>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string
    short: string
    long: string
    background: string
    color: string
    center: boolean
    link: string
  }>(),
  {
    icon: "info",
    short: "",
    long: "",
    background: "bg-accent",
    color: "text-accentContrast",
    center: false,
    link: "",
  }
)
</script>
