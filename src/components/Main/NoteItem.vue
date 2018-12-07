<template>
  <div class="note-wrapper" :style="{ backgroundColor: note.bgColor }">
    <div class="close-btn" @click="$emit('delete', note.messageID)">
      &times;
    </div>
    <div class="note" v-html="noteText" />
  </div>
</template>

<script>
export default {
  name: 'NoteItem',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  computed: {
    noteText () {
      return this.note.text.replace(
        /(^|\s)(#[a-z\d-]+)/ig,
        `$1<a href="/#/?tag=$2" class='hash-tag'>$2</a>`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.note-wrapper {
  position: relative;
  box-sizing: border-box;
  padding: 20px;
  margin: 10px;
  width: 200px;
  border-radius: 5px;
  transition: all 250ms ease-in-out;

  &:hover {
    opacity: 0.8;
  }

  &:hover .close-btn {
    display: block;
  }
}

.close-btn {
  display: none;
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
}

.hash-tag {
  color: aquamarine;

  &:visited {
    color: aquamarine;
  }

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
