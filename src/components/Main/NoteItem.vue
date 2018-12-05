<template>
  <div class="note-wrapper" :style="{ backgroundColor: note.bgColor }">
    <div class="close-btn" @click="$emit('delete', note.messageID)">
      &times;
    </div>
    <div class="note">
      {{ note.text }}
    </div>
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
</style>
