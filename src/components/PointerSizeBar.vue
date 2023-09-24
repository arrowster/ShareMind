<template>
  <v-overlay v-if="isActivate" activator="parent" location-strategy="connected" scroll-strategy="block" v-model="isOverlay">
    <v-card width="300" style="margin: auto">
      <v-card-text>
        <v-slider
          v-model="pointSize"
          :max="20"
          :step="1"
          label="size"
          hide-details
          class="ma-2"
        >
          <template v-slot:append>
            <v-text-field
              v-model="pointSize"
              type="number"
              style="width: 80px"
              density="compact"
              hide-details
              variant="outlined"
            />
          </template>
        </v-slider>
      </v-card-text>
      <v-btn class="w-100" variant="tonal" @click="setPointSize">적용</v-btn>
    </v-card>
  </v-overlay>
</template>


<script>
export default {
  name: "PointerSizeBar",
  props: {
    isActivate: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      pointSize: 2,
      isOverlay: false,
    }
  },
  watch: {
    isOverlay(value) {
      this.$emit("close", value);
    }
  },
  methods:{
    setPointSize() {
      this.isOverlay = false
      this.$emit("setPointSize", this.pointSize);
    },
  },
}
</script>

<style scoped>

</style>
