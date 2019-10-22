export class Component {
    constructor(id) {
        this.$el = document.getElementById(id)
        this.init()
    }

    //Определяем инит тут, чтобы в дочерних классах его переопределить
    //в инит выполняем логику в дочерних элементах
    init() {}

    onShow() {}

    onHide() {}

    hide() {
        this.$el.classList.add('hide')
        this.onHide()
    }

    show() {
        this.$el.classList.remove('hide')
        this.onShow()
    }
}