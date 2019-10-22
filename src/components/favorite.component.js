import {
    Component
} from '../core/component'
import {
    apiService
} from '../services/api.service'
import {
    renderPost
} from '../templates/post.template'

export class FavoriteComponent extends Component {
    constructor(id, {
        loader
    }) {
        super(id)
        this.loader = loader
    }

    init() {
        this.$el.addEventListener('click', linkClickHandler.bind(this))
    }

    onShow() {
        const favorites = JSON.parse(localStorage.getItem('favorites'))
        this.favorites = favorites
        const html = renderList(favorites)
        console.log(html)
        this.$el.insertAdjacentHTML('afterbegin', html)
    }

    onHide() {
        this.$el.innerHTML = ''
    }
}


function renderList(list = []) {
    if (list && list.length) {
        return `
            <ul>
                ${list.map(p => `<li><a href="#" class="js-link" data-id="${p.id}">${p.title}</a></li>`).join(' ')}
            </ul>
        `
    } else {
        return `<p class="center">Список пуст</p>`
    }
}

async function linkClickHandler(e) {
    e.preventDefault()
    if (e.target.classList.contains('js-link')) {
        const postId = e.target.dataset.id
        console.log(postId)
        this.$el.innerHTML = ''
        this.loader.show()
        const post = await apiService.fentchPostById(postId)
        this.loader.hide()
        this.$el.insertAdjacentHTML('afterbegin', renderPost(post, {
            widthButtom: false,
            back: true
        }))
        //Реализация кнопки назад
        this.$el.querySelector('button').addEventListener('click', back.bind(this))
    }
}

function back() {
    this.onHide()
    this.onShow()
}