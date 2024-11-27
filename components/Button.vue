<script setup lang="ts">
const {
  variant = 'bold',
  color = 'brand',
  is = 'button',
} = defineProps<{
  variant?: 'bold' | 'subtle' | 'outlined' | 'ghost';
  color?: 'brand' | 'neutral' | 'informative' | 'successful' | 'cautionary' | 'destructive';
  is?: string;
}>();
</script>

<template>
  <component
    :is
    :class="['relative inline-flex rounded-full px-2', variant, color]"
  >
    <slot name="icon" />
    <span class="px-2 font-medium leading-8"><slot /></span>
  </component>
</template>

<style scoped lang="scss">
$colors: 'brand', 'neutral', 'informative', 'successful', 'cautionary', 'destructive';

@each $color in $colors {
  .#{$color} {
    --button-color: var(--#{$color});
    --button-color-subtle: var(--#{$color}-subtle);
  }
}

button {
  &::before {
    content: '';
    border-radius: 9999px;
    position: absolute;
    inset: 0;
    background: var(--button-state);
    transition: background-color var(--animation-duration);
  }

  &:hover {
    --button-state: rgb(from var(--state-color) r g b / 0.075);
  }

  &:focus,
  &:active {
    --button-state: rgb(from var(--state-color) r g b / 0.125);
  }

  &:disabled {
    --button-state: rgb(from var(--state-color) r g b / 0.5);

    &::before {
      mix-blend-mode: var(--state-blend, normal);
    }
  }
}

.bold {
  background: var(--button-color);
  color: var(--button-color-subtle);
}

.subtle {
  background: var(--button-color-subtle);
  color: var(--button-color);
}

.outlined {
  box-shadow: inset 0 0 0 var(--border-width) var(--button-color);
  color: var(--button-color);
}

.ghost {
  color: var(--button-color);
  text-decoration: underline;
  text-decoration-style: dotted;
  text-decoration-color: var(--foreground-subtle);
  text-underline-offset: 0.25rem;
}
</style>
