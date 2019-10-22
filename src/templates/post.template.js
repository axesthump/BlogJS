export function renderPost(post, options = {
    widthButton: true,
    back: false
}) {
    const tag = post.type === 'news' ?
        '<li class="tag tag-blue tag-rounded">Новость</li>' :
        '<li class="tag tag-rounded">Заметка</li>'

    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    const candidate = favorites.find(p => p.id === post.id)

    const btn = candidate ?
        `<button class="button-round button-small button-danger" data-id="${post.id}" data-title="${post.title}">Удалить</button>` :
        `<button class="button-round button-small button-primary" data-id="${post.id}" data-title="${post.title}">Сохранить</button>`

    const btnBack = `<button class="button-round button-small button-primary">Назад</button>`
    return `
    <div class="panel">
		<div class="panel-head">
			<p class="panel-title">${post.title}</p>
			<ul class="tags">
			    ${tag}
			</ul>
		</div>
		<div class="panel-body">
			<p class="multi-line">${post.fulltext}</p>
		</div>
		<div class="panel-footer w-panel-footer">
            <small>${post.date}</small>
            ${options.widthButton ? btn : ''}
            ${options.back ? btnBack : ''}
		</div>
	</div>`
}