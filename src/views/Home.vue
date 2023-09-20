<template>
  <v-container class="d-flex justify-space-evenly">
    <v-layout class="d-flex justify-space-evenly ma-4">
      <note-menu/>
      <HowToUse />
    </v-layout>
  </v-container>
</template>

<script setup>
  import HowToUse from "@/components/HowToUse"
  import NoteMenu from "@/components/noteMenu";

</script>
