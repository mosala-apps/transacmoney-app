<template>
  <v-btn 
    min-height="44" 
    class="gradient primary"
    :class="btnClass"
    :type="type"
    :disabled="isDisabled"
    @click="onClick"
  >
    {{ label }} <v-icon v-if="icon" small>{{ icon }}</v-icon>
    <v-progress-circular
      v-if="isLoading"
      indeterminate
      color="white"
      size="23"
      :width="2"
    ></v-progress-circular>
  </v-btn>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    btnClass: {
      type: String,
      default: 'primary',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onClick() {
      this.$emit('onClick')
    },
  },
}
</script>
