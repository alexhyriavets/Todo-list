import axios from 'axios'
import { uuid } from 'vue-uuid'

const state = () => ({
  notes: []
})

const types = {
  SET_NOTES: 'SET_NOTES',
  ADD_NOTE: 'ADD_NOTE',
  DELETE_NOTE: 'DELETE_NOTE'
}

const getters = {}

const actions = {
  async fetch ({ commit }) {
    try {
      const { data: notes } = await axios.get('https://apeps.kiev.ua/api/getMessages')

      commit(types.SET_NOTES, notes)
    } catch (err) {
      throw err
    }
  },

  async add ({ commit }, newNote) {
    try {
      await axios.post('https://apeps.kiev.ua/api/addMessage', newNote)

      const noteWithId = {
        ...newNote,
        messageID: uuid.v1()
      }

      commit(types.ADD_NOTE, noteWithId)
    } catch (err) {
      throw err
    }
  },

  async delete ({ commit }, messageId) {
    try {
      await axios.post('https://apeps.kiev.ua/api/deleteMessage', messageId)

      commit(types.DELETE_NOTE, messageId)
    } catch (err) {
      throw err
    }
  }
}

const mutations = {
  [types.SET_NOTES] (state, notes) {
    state.notes = notes
  },
  [types.ADD_NOTE] (state, newNote) {
    state.notes = [...state.notes, newNote]
  },
  [types.DELETE_NOTE] (state, messageId) {
    state.notes = state.notes.filter(note => note.messageID !== messageId)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}