import {
    HeaderComponent
} from './components/header.component'
import {
    NavigationComponent
} from './components/navigation.component'
import {
    CreateComponent
} from './components/create.component'
import {
    FavoriteComponent
} from './components/favorite.component'
import {
    PostsComponent
} from './components/posts.component'
import './styles.css'
import {
    LoaderComponent
} from './components/loader.component'


new HeaderComponent('header')

const nav = new NavigationComponent('navigation')
const loader = new LoaderComponent('loader')

const post = new PostsComponent('posts', {
    loader
})
const create = new CreateComponent('create')
const favorite = new FavoriteComponent('favorite', {
    loader
})

//Добавляем компоненты
nav.registerTabs([{
        name: 'create',
        component: create
    },
    {
        name: 'posts',
        component: post
    },
    {
        name: 'favorite',
        component: favorite
    }
])