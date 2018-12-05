<template>
  <div class="grid">
    <div v-masonry transition-duration="0.3s" item-selector=".item">
      <div
        v-for="(note, index) in notes"
        :key="index"
        v-masonry-tile
        class="item"
      >
        <NoteItem
          :note="note"
          @delete="emitDeleteEvent"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NoteItem from '@/components/Main/NoteItem'

export default {
  name: 'NotesGrid',
  components: {
    NoteItem
  },
  props: {
    notes: {
      type: Array,
      required: true
    }
  },
  methods: {
    emitDeleteEvent (messageId) {
      this.$emit('delete', messageId)
    }
  }
}
</script>
