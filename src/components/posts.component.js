import {
    Component
} from '../core/component'
import {
    apiService
} from '../services/api.service'
import {
    TransformService
} from '../services/transform.service'
import {
    renderPost
} from '../templates/post.template'

export class PostsComponent extends Component {
    constructor(id, {
        loader
    }) {
        super(id)
        this.loader = loader
    }

    init() {
        this.$el.addEventListener('click', buttonHandler.bind(this))
    }

    async onShow() {
        this.loader.show()
        const fbData = await apiService.fentchPosts()
        const posts = TransformService.fbObjectToArray(fbData)
        posts.reverse()
        //Рендерим посты
        const html = posts.map(post => renderPost(post))
        this.loader.hide()

        this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
    }

    onHide() {
        this.$el.innerHTML = ''
    }
}

function buttonHandler(e) {
    if (e.target.tagName === 'BUTTON') {
        const id = event.target.dataset.id
        const title = event.target.dataset.title
        //Берем из локал сторедж, если его там нет то пустой массив
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []
        if (favorites.find(p => p.id === id)) {
            //удалить элемент
            favorites = favorites.filter(p => p.id !== id)
            event.target.textContent = 'Сохранить'
            event.target.classList.add('button-primary')
            event.target.classList.remove('button-danger')
        } else {
            //добавить
            favorites.push({
                id,
                title
            })
            event.target.textContent = 'Удалить'
            event.target.classList.add('button-danger')
            event.target.classList.remove('button-primary')
        }

        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}