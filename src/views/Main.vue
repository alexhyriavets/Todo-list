<template>
  <div class="main">
    <NoteEditor @add="addNoteHandler" />
    <img
      v-if="showSpinner" 
      :src="$options.spinner"
      alt="load"
      class="spinner"
    >
    <NotesGrid
      v-else
      :notes="filteredNotes"
      @delete="deleteNoteHandler"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import NoteEditor from '@/components/Main/NoteEditor'
import NotesGrid from '@/components/Main/NotesGrid'
import spinner from '@/assets/loader.gif'

export default {
  spinner,

  name: 'Main',
  components: {
    NoteEditor,
    NotesGrid
  },
  data () {
    return {
      newTodo: '',
      showSpinner: true,
      currentHashtag: ''
    }
  },
  computed: {
    ...mapState({
      notes: state => state.notes.notes
    }),
    filteredNotes () {
      return this.notes.filter(note => note.text.includes(this.currentHashtag))
    }
  },
  watch: {
    $route: {
      handler (from, to) {
        this.currentHashtag = from.hash
      },
      immediate: true
    }
  },
  async created () {
    this.showSpinner = true

    try {
      await this.fetchNotes()
    } catch (err) {
      this.$notify({
        title: 'Error',
        message: 'Error during fetching notes',
        type: 'error'
      })
      console.error(err)
    } finally {
      this.showSpinner = false
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
.spinner {
  width: 100px;
  margin: 0 auto;
  display: block;
}
</style>


