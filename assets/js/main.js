window.addEventListener('load', () => {
	const form = document.querySelector("#taskform");
	const input = document.querySelector("#taskinput");
	const list_el = document.querySelector("#tasks");

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const task = input.value;
		if(!task){
			alert("Please fill out the task");
			return;
		}

		const task_ = document.createElement('div');

		task_.classList.add('task');

		const content_ = document.createElement('div');

		content_.classList.add('content');

		task_.appendChild(content_);

		const task_input = document.createElement('input');
		task_input.classList.add('text');
		task_input.type = 'text';
		task_input.value = task;
		task_input.setAttribute('readonly', 'readonly');

		content_.appendChild(task_input);

		const task_actions = document.createElement('div');

		task_actions.classList.add('actions');
		
		const task_edit = document.createElement('button');

		task_edit.classList.add('edit');
        
		task_edit.innerText = 'Edit';

		const task_delete = document.createElement('button');
		task_delete.classList.add('delete');
		task_delete.innerText = 'Delete';

		task_actions.appendChild(task_edit);
		task_actions.appendChild(task_delete);

		task_.appendChild(task_actions);

		list_el.appendChild(task_);

		input.value = '';

		task_edit.addEventListener('click', (e) => {
			if (task_edit.innerText.toLowerCase() == "edit") {
				task_edit.innerText = "Save";
				task_input.removeAttribute("readonly");
				task_input.focus();
			} else {
				task_edit.innerText = "Edit";
				task_input.setAttribute("readonly", "readonly");
			}
		});

		task_delete.addEventListener('click', (e) => {
			list_el.removeChild(task_);
		});
		var list = document.querySelector('.task');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'input.text') {
    ev.target.classList.toggle('checked');
  }
}, false);

		
	});
});