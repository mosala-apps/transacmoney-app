<template>
  <v-menu rounded="custom" offset-y>
    <template #activator="{ attrs, on }">
      <v-list-item-avatar class="cursor-pointer" v-bind="attrs" v-on="on">
        <v-avatar>
        <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-img>
      </v-avatar>
      </v-list-item-avatar>
    </template>

    <v-list>
      <v-list-item v-for="(item, i) in menus" :key="i" link :to="item.to">
        <v-list-item-action>
          <v-icon color="primary">{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <div class="profile-menu__auth-action">
       Deconnexion
      </div>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">

const menus = [
  {
    icon: "mdi-home",
    title: "Accueil",
    to: "/",
  },
];
</script>
<style lang="scss" scoped>
.profile-menu__auth-action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
