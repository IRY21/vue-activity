<template>
  <article class="post">
    <ActivityItemUpdate 
      v-if="isUpdateActive"
      :categories="categories"
      :activity="activity"
      @toggleUpdate="changeUpdateState"
    />
    <ActivityItemDetail 
      v-else
      :categories="categories"
      :activity="activity"
      @toggleUpdate="changeUpdateState"
    />
  </article>
</template>

<script>
import ActivityItemDetail from "./ActivityItemDetail";
import ActivityItemUpdate from "./ActivityItemUpdate";

export default {
  components: {
    ActivityItemDetail,
    ActivityItemUpdate
  },
  props: {
    categories: {
      type: Object,
      required: true
    },
    activity: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isUpdateActive: false
    }
  },
  methods: {
    changeUpdateState(isUpdate) {
      this.isUpdateActive = isUpdate
    }
  }
}
</script>

<style scoped>

</style>