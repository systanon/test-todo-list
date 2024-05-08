import { defineStore } from 'pinia'
import { TodoistApi, Project, TodoistRequestError } from "@doist/todoist-api-typescript"

const api = new TodoistApi(import.meta.env.VITE_APP_TOKEN)

interface ProductStoreState {
  allProjects: Project[];
}


export const useProductStore = defineStore('productStore', {
  state: (): ProductStoreState => {
    return {
      allProjects: []
    }
  },
  actions: {
    getAllProjects() {
      api.getProjects()
    .then((projects: any) => this.allProjects = projects)
    .catch((error: TodoistRequestError) => console.log(error))
    },
    addProject(name: string) {
      return api.addProject({ name })
    .then((project: Project) => this.allProjects.push(project))
    .catch((error: TodoistRequestError) => console.log(error))
    },
    deleteProject(_id: string) {
      api.deleteProject(_id)
    .then((isSuccess) => {
      this.allProjects = this.allProjects.filter(({id}) => id !== _id)
      console.log(isSuccess)}
    )
    .catch((error: TodoistRequestError) => console.log(error))

    },
    editProject({id, name}: { id: string, name: string }) {
      return api.updateProject(id, { name } )
        .then(() => this.getAllProjects())
        .catch((error: TodoistRequestError) => console.log(error)) 
    },
  },
})