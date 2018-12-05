<template>
  <div class="editor">
    <div class="color-pick" :style="{ backgroundColor: newTodoColor.hex }"></div>
    <el-input
      v-model="newTodo"
      class="todo-input"
      type="textarea"
      :autosize="{ minRows: 6, maxRows: 6}"
      placeholder="Write a todo message.."
    />
    <br>
    <br>
    <el-button
      class="change-btn"
      round
      @click="openColorPicker"
    >
      Change the color
    </el-button>
    <Chrome
      v-if="showColorPicker"
      v-model="newTodoColor"
      class="color-picker"
      v-click-outside="hideColorPicker"
    />
    &nbsp;
    <el-button
      class="add-btn"
      type="primary"
      round
      @click="addNote"
    >
      Add
    </el-button>
  </div>
</template>

<script>
import { Chrome } from 'vue-color'
import ClickOutside from 'vue-click-outside'

const getRandomHexColor = () =>
  '#' + Math.floor(Math.random() * 16777215).toString(16)

export default {
  name: 'NoteEditor',
  components: {
    Chrome
  },
  directives: {
    ClickOutside
  },
  data () {
    return {
      newTodo: '',
      newTodoColor: { hex: getRandomHexColor() },
      showColorPicker: false
    }
  },
  methods: {
    openColorPicker () {
      this.showColorPicker = true
    },
    hideColorPicker () {
      this.showColorPicker = false
    },
    addNote () {
      const payload = {
        noteMessage: this.newTodo,
        noteColor: this.newTodoColor.hex
      }

      this.$emit('add', payload)

      this.clearField()
      this.changeRandomColor()
    },
    clearField () {
      this.newTodo = ''
    },
    changeRandomColor() {
      this.newTodoColor = { hex: getRandomHexColor() }
    }
  }
}
</script>


<style lang="scss" scoped>
.todo-input {
  width: 450px;
}

.editor {
  position: relative;
  width: 463px;
  margin: 0 auto;
  margin-bottom: 45px;
}

.color-pick {
  position: absolute;
  width: 500px;
  height: 220px;
  left: -22px;
  top: -11px;
  z-index: -1;
  border-radius: 5px;
}

.change-btn {
  margin-left: 202px;
}

.color-picker {
  position: absolute;
  z-index: 100;
  top: 201px;
  right: 200px;
}
</style>

