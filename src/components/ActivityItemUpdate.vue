<template>
  <div>
    <div class="activity-title-wrapper">
      <div class="activity-title">
        <input v-model="modifiedActivity.title" 
               type="text" 
               class="input">
      </div>
    </div>
    <div class="activity-category">
      <select v-model="modifiedActivity.category" 
              class="select">
        <option disabled value="">Please select one</option>
        <option v-for="category in categories"
                :key="category.id"
                :value="category.id">{{ category.text }}</option>
      </select>
    </div>
    <div class="control activity-notes">
      <textarea v-model="modifiedActivity.notes"
                class="textarea"
                placeholder="Write some notes here" />
    </div>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="../img/user.png">
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">Filip Jerga</a> 
            updated {{ modifiedActivity.updatedAt | prettyTime }}
          </p>
        </div>
      </div>
      <div class="media-right">
        <input id="progress"
               v-model.number="modifiedActivity.progress"
               type="range"
               name="progress"
               min="0" max="100" value="90" step="10">
        <label for="progress">{{ modifiedActivity.progress }} %</label>
      </div>
    </div>
    <div class="activity-controll">
      <a class="button is-warning" @click="updateActivity">Commit Update</a>
      <a class="button is-danger" @click="$emit('toggleUpdate', false)">Cancel</a>
    </div>
  </div>
</template>

<script>
import textUtility from "@/mixins/textUtility.js";
import store from '@/store'

export default {
  mixins: [textUtility],
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
      modifiedActivity: { ...this.activity }
    }
  },
  methods: {
    updateActivity() {
      store.updateActivity(this.modifiedActivity)
        .then(() => {
          this.$emit('toggleUpdate', false)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.activity-title {
  margin-bottom: 5px;
}
.activity-category {
  margin-bottom: 5px;
}
.activity-settings {
  float: right;
  font-size: 22px;
  &:hover {
    cursor: pointer;
  }
}
.activity-controll {
  margin: 20px 0 0 0;
  a {
    margin-right: 5px;
  }
}
.activity-notes {
  margin-bottom: 10px;
}
.media-right {
  display: flex;
  align-items: center;
  label {
    margin-left: 5px;
  }
}
.post .title {
  margin-bottom: 5px;
}
.color-red {
  color: red;
}
.color-orange {
  color: orange;
}
.color-green {
  color: green;
}
</style>
