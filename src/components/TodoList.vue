<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold my-4">Todo List</h1>
    <input v-model="newTodo" @keyup.enter="_addProject" type="text" class="border border-gray-400 rounded-lg p-2 w-full mb-4" placeholder="Add new todo...">
    <ul>
      <li v-for="({name, id}) in allProjects" :key="id" class="flex items-center justify-between bg-gray-100 p-2 mb-2">
        <span v-if="!editingId || editingId !== id">{{ name }}</span>
        <input v-else v-model="editedTodo.name" @keyup.enter="updateTodo" type="text" class="border border-gray-400 rounded-lg p-1 w-full" placeholder="Edit todo...">
        <div>
          <button @click="editTodo(id)" class="text-blue-500 hover:text-blue-700">{{ editingId === id ? 'Save' : 'Edit' }}</button>
          <button @click="removeTodo(id)" class="text-red-500 hover:text-red-700">Remove</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions, mapGetters } from 'pinia'
import { useProductStore } from '../stores/ProductStore'
import { Project } from "@doist/todoist-api-typescript"

export default defineComponent({
  name: 'TodoList',
  data: () => {
    return {
      newTodo: '',
      editingId: null,
      editedTodo: null
    }
  },
  computed: {
    ...mapState(useProductStore, ['projects']),
    ...mapGetters(useProductStore, ['allProjects'])
  },
  methods: {
    ...mapActions(useProductStore, ['getAllProjects', 'addProject', 'deleteProject', 'editProject']),
    async _addProject(){
      await this.addProject(this.newTodo)
      this.newTodo = ''
    },
    editTodo (_id: string) {
      if (this.editingId === null) {
       this.saveProject(_id)
      } else {
        this.editedProject(this.editedTodo)
      }
    },
    saveProject(_id: string) {
      this.editingId = _id;
      this.editedTodo = this.projects[_id]
    },
    editedProject(project: Project) {
      this.editProject(project).finally( () => {
        this.editingId = null
        this.editedTodo = null
      })
      }
  },
  mounted() {
    this.getAllProjects()
  }
});
</script>

<style scoped>
/* Add Tailwind CSS classes here */
</style>
