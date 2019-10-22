import {
    Component
} from '../core/component'
import {
    Form
} from '../core/form'
import {
    Validators
} from '../core/validators'
import {
    apiService
} from '../services/api.service'

export class CreateComponent extends Component {
    constructor(id) {
        super(id)
    }

    init() {
        this.$el.addEventListener('submit', submitHandler.bind(this))

        //Иницилизируем форму и добавляем в нее значения полей (ключ должен совпадать с name у поля, это для удобства)
        this.form = new Form(this.$el, {
            title: [Validators.required],
            fulltext: [Validators.required, Validators.minLength(30)]
        })
    }
}

async function submitHandler(e) {
    e.preventDefault()

    if (this.form.isValid()) {
        //Собираем данные из формы
        const formData = {
            type: this.$el.type.value,
            date: new Date().toLocaleDateString(),
            ...this.form.value()
        }

        await apiService.createPost(formData)
        this.form.clear()
        alert('Запись создана')

    }
}