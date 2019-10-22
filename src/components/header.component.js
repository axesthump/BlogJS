import {
    Component
} from '../core/component'

export class HeaderComponent extends Component {
    constructor(id) {
        //метод, для того, чтобы вызвать родительский конструктор
        super(id)
    }

    init() {
        if (localStorage.getItem('visited')) {
            this.hide()
        }
        //.bind(this) для того, чтобы мы могли обращаться к контексту из приватных функций
        this.$el.querySelector('.js-header-start').addEventListener('click', buttonHandler.bind(this))
    }
}

//Так как мы не в export, ниже будут создаваться приватные переменные

function buttonHandler() {
    //Чтобы окошко с преветсвием открывалось только при первом открытии, сохрним данные о пользователе в локалсторедж
    localStorage.setItem('visited', JSON.stringify(true))
    this.hide()
}