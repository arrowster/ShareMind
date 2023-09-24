<template>
  <v-overlay activator="parent" location-strategy="connected" scroll-strategy="block" v-model="isOverlay">
  <v-card width="300" style="margin: auto">
    <v-responsive
      :style="{ background: `rgb(${red}, ${green}, ${blue})` }"
      height="12px"
    />
    <v-card-text>
      <v-slider
        v-model="red"
        :max="255"
        :step="1"
        label="R"
        hide-details
        class="ma-2"
      >
        <template v-slot:append>
          <v-text-field
            v-model="red"
            type="number"
            style="width: 80px"
            density="compact"
            hide-details
            variant="outlined"
          ></v-text-field>
        </template>
      </v-slider>
      <v-slider
        v-model="green"
        :max="255"
        :step="1"
        label="G"
        hide-details
        class="ma-2"
      >
        <template v-slot:append>
          <v-text-field
            v-model="green"
            type="number"
            style="width: 80px"
            density="compact"
            hide-details
            variant="outlined"
          ></v-text-field>
        </template>
      </v-slider>
      <v-slider
        v-model="blue"
        :max="255"
        :step="1"
        label="B"
        hide-details
        class="ma-2"
      >
        <template v-slot:append>
          <v-text-field
            v-model="blue"
            type="number"
            style="width: 80px"
            density="compact"
            hide-details
            variant="outlined"
          ></v-text-field>
        </template>
      </v-slider>
    </v-card-text>
    <v-btn class="w-100" variant="tonal" @click="setColor">적용</v-btn>
  </v-card>
  </v-overlay>
</template>

<script>
export default {
  name: "SelectColorBar",
  data() {
    return {
      red: 0,
      green: 0,
      blue: 0,
      isOverlay: false,
    }
  },
  methods:{
    setColor() {
      this.isOverlay = false
      console.log(this.red, this.green, this.blue)
      this.$emit("setColor", this.red, this.green, this.blue);
    },
  },
}
</script>

<style scoped>

</style>
