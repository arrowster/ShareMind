<template>
  <v-app>
    <menu-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  import MenuBar from "@/components/MenuBar";
  export default {
    components: {MenuBar}
  }
  //
</script>
