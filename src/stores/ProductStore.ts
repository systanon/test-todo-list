import { defineStore } from 'pinia'
import { TodoistApi, Project, TodoistRequestError } from "@doist/todoist-api-typescript"

const api = new TodoistApi(import.meta.env.VITE_APP_TOKEN)

interface ProductStoreState {
  projects: Record<string, Project>;
}


export const useProductStore = defineStore('productStore', {
  state: (): ProductStoreState => {
    return {
      projects: {}
    }
  },
  getters: {
    allProjects:  (state) => {
      return Object.values(state.projects)
    }
  },
  actions: {
    getAllProjects() {
      api.getProjects()
    .then((projects: any) => projects.forEach(this.setProject))
    .catch((error: TodoistRequestError) => console.log(error))
    },
    addProject(name: string) {
      return api.addProject({ name })
    .then((project: Project) => this.setProject(project))
    .catch((error: TodoistRequestError) => console.log(error))
    },
    deleteProject(_id: string) {
      api.deleteProject(_id)
    .then((isSuccess) => {
      delete  this.projects[_id]
      console.log(isSuccess)}
    )
    .catch((error: TodoistRequestError) => console.log(error))

    },
    editProject(project: Project) {
      const {id, name } = project
      return api.updateProject(id, {name} )
        .then(() => this.setProject(project))
        .catch((error: TodoistRequestError) => console.log(error)) 
    },
    setProject(project: Project) {
      const {id}: {id: string} = project
      this.projects[id] = project
    }
  },
})