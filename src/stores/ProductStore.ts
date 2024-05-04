import { defineStore } from 'pinia'
import { TodoistApi } from "@doist/todoist-api-typescript"

const api = new TodoistApi(import.meta.env.VITE_APP_TOKEN)


export const useProductStore = defineStore('productStore', {
  state: () => {
    return {
      productList: [],
      allProjects: []
    }
  },
  actions: {
    getAllProjects() {
      api.getProjects()
    .then((projects: any) => this.allProjects = projects)
    .catch((error: any) => console.log(error))
    },
    addProject(name: string) {
      return api.addProject({ name })
    .then((project: any) => this.allProjects = this.allProjects.concat(project))
    .catch((error: any) => console.log(error))
    },
    deleteProject(_id: string) {
      api.deleteProject(_id)
    .then((isSuccess) => {
      this.allProjects = this.allProjects.filter(({id}) => id !== _id)
      console.log(isSuccess)}
    )
    .catch((error) => console.log(error))

    },
    editProject({id, name}) {
      return api.updateProject(id, { name } )
        .then(() => this.getAllProjects())
        .catch((error) => console.log(error)) 
    },
  },
})