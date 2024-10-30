import { defineStore } from "pinia";
import Auth from '@/api/Auth'
import type { List, createListItem, createListPayload, listContent, listContentState, selectedList } from '@/types'
import { useUserStore } from "./userStore";

export const uselistitems = defineStore('listitemstore', {

  state: () => ({
    listItems: [] as List,
    selectedList: {} as selectedList,
    listContent: [] as listContentState,
    selectedListContent: [] as listContent[]
  }),
  actions: {

    async getList() {
      // useUserStore().loading = true
      const res = await Auth.getList()
      this.listItems = res
      useUserStore().loading = false
    },

    setSelectedList(index: number, listId: number, userId: number) {
      this.selectedList = ({ "index": index, "listId": listId, "userId": userId })
    },

    async getListContent() {
      useUserStore().loading = true
      this.selectedListContent = this.listContent.filter(i => i.id == this.selectedList.listId)
      if (this.selectedListContent.length < 1) {
        const res = await Auth.getListContent(this.selectedList.listId)
        this.listContent.push(res)
      }
      useUserStore().loading = false
    },

    async createNewList(payload: createListPayload) {
      useUserStore().loading = true
      const res = await Auth.createList(payload)
      const resp = await Auth.getList()
      this.listItems = resp
      this.selectedList = (
        {
          "index": this.listItems.indexOf(this.listItems[0]),
          "listId": this.listItems[0].id,
          "userId": this.listItems[0].userId
        })
      this.listContent.push(res)
      useUserStore().loading = false
      return 'done'
    },

    async deleteListItem(listId: number, listItemId: number) {
      useUserStore().loading = true
      await Auth.deleteListItem(listId, listItemId)
      this.listContent = this.listContent.filter(i => i.id != listId)
      this.selectedListContent = this.listContent.filter(i => i.id == this.selectedList.listId)
      useUserStore().loading = false
    },

    async createListItem(listId: number, payload: createListItem) {
      useUserStore().loading = true

      console.log("filte", this.listContent);

      const res = await Auth.addListItem(listId, payload)
      this.listContent.push(res)
      useUserStore().loading = false
    },
    async deleteList(listId: number) {
      useUserStore().loading = true
      await Auth.deleteList(listId)
      useUserStore().loading = false
    },

  }
}) 