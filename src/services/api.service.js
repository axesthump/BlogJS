//service нужен для работы с бэкендом
class ApiService {
    constructor(baseUrl) {
        this.url = baseUrl
    }

    //Создать пост
    async createPost(post) {
        try {
            const request = new Request(this.url + '/posts.json', {
                method: 'post',
                body: JSON.stringify(post)
            })
            return useRequest(request)
        } catch (error) {
            console.error(error)
        }
    }

    //Запрашиваем пост
    async fentchPosts() {
        try {
            const request = new Request(`${this.url}/posts.json`, {
                method: 'get'
            })
            return useRequest(request)
        } catch (error) {
            console.error(error)
        }
    }


    async fentchPostById(id) {
        try {
            const request = new Request(`${this.url}/posts/${id}.json`, {
                method: 'get'
            })
            return useRequest(request)
        } catch (error) {
            console.error(error)
        }
    }
}

async function useRequest(request) {
    const response = await fetch(request)
    return await response.json()
}

export const apiService = new ApiService('https://blog-js-d82c8.firebaseio.com')