const data = {
  activities: {
    "1546968934": {
      id: "1546968934",
      title: "Learn Vue.js",
      notes: "I started today and it was not good.",
      progress: 10,
      category: "1546969049",
      createdAt: 1546959144391,
      updatedAt: 1546969144391
    },
    "1546969212": {
      id: "1546969212",
      title: "Read Witcher Books",
      notes: "These books are super nice",
      progress: 60,
      category: "1546969049",
      createdAt: 1546949144391,
      updatedAt: 1546969144391
    }
  },
  categories: {
    "1546969049": { id: '1546969049', text: "books" },
    "1546969225": { id: '1546969225', text: "movies" }
  }
}

class fakeApi {

  fillDB() {
    this.commitData(data)
  }

  commitData(data) {
    localStorage.setItem('activity_data', JSON.stringify(data))
  }

  getData() {
    const activityData = localStorage.getItem('activity_data')
    return JSON.parse(activityData)
  }

  canContinue() {
    const rndNumber = Math.floor(Math.random() * 10);
  
    if (rndNumber > 5) {
      return true;
    }
    
    return false;
  }
  
  get(resource, {force = 0}) {

    return new Promise((resolve, reject) => {

      this.asyncCall(() => {
        if (force || this.canContinue()) {
          const data = this.getData()
          resolve({...data[resource]})
        } else {
          reject('Cannot fetch ' + resource)
        }
      })
    })
  }

  post(resource, payload) {
    return new Promise((resolve, reject) => {
      const data = this.getData()
      data[resource][payload.id] = payload
      this.commitData(data)
      resolve(payload)
    })
  }

  delete(resource, payload) {
    return new Promise((resolve, reject) => {
      const data = this.getData()
      delete data[resource][payload.id]
      this.commitData(data)
      resolve(payload)
    })
  }

  asyncCall(cb) {
    setTimeout(cb, 500)
  }
}

export default new fakeApi()