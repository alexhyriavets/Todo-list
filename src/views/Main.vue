<template>
  <div class="main">
    <NoteEditor @add="addNoteHandler" />
    <NotesGrid
      :notes="notes"
      @delete="deleteNoteHandler"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import NoteEditor from '@/components/Main/NoteEditor'
import NotesGrid from '@/components/Main/NotesGrid'

export default {
  name: 'Main',
  components: {
    NoteEditor,
    NotesGrid
  },
  data () {
    return {
      newTodo: ''
    }
  },
  computed: {
    ...mapState({
      notes: state => state.notes.notes
    })
  },
  async created () {
    try {
      await this.fetchNotes()
    } catch (err) {
      this.$notify({
        title: 'Error',
        message: 'Error during fetching notes',
        type: 'error'
      })
      console.error(err)
    }
  },
  methods: {
    ...mapActions({
      fetchNotes: 'notes/fetch',
      deleteNote: 'notes/delete',
      addNote: 'notes/add'
    }),
    async deleteNoteHandler (messageId) {
      try {
        await this.deleteNote(messageId)

        this.$notify({
          title: 'Success',
          message: 'Note deleted successfully',
          type: 'success'
        })
      } catch (err) {
        this.$notify({
          title: 'Error',
          message: 'Error during deleting note',
          type: 'error'
        })
        console.error(err)
      }
    },
    async addNoteHandler ({ noteMessage, noteColor }) {
      console.log('here')

      if (!noteMessage) {
        this.$notify({
          title: 'Error',
          message: 'You have to enter note message',
          type: 'error'
        })
        return
      }

      try {
        await this.addNote({
          text: noteMessage,
          bgColor: noteColor
        })

        this.$notify({
          title: 'Success',
          message: 'Note added successfully',
          type: 'success'
        })
      } catch (err) {
        this.$notify({
          title: 'Error',
          message: 'Error during adding new note',
          type: 'error'
        })
        console.error(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>


