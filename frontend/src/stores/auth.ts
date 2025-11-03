import { defineStore } from 'pinia'

export const useJobSeekerAuthStore = defineStore('jobseeker-auth', {
  state: () => ({
    accessToken: '' as string,
    client: '' as string,
    uid: '' as string,
    expiry: '' as string,
    tokenType: '' as string,
  }),

  actions: {
    setCredentials(headers: any) {
      this.accessToken = headers['access-token'] ?? ''
      this.client = headers['client'] ?? ''
      this.uid = headers['uid'] ?? ''
      this.expiry = headers['expiry'] ?? ''
      this.tokenType = headers['token-type'] ?? ''
    },

    clearCredentials() {
      this.accessToken = ''
      this.client = ''
      this.uid = ''
      this.expiry = ''
      this.tokenType = ''
    },
  },
})
