{
    let tasks = [
        {
            content: "Zjeść kolacje",
            done: false,
        },
        {
            content: "Wyjść na spacer",
            done: true,
        },
    ];

    let hideDone = false;

    const bindEvents = () => {
        const doneButtons = document.querySelectorAll(".js-done");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindButtonsEvents = () => {
        const hideDoneButton = document.querySelector(".js-hideDoneButton");
        const completeAllButton = document.querySelector(".js-completeAllButton");

        hideDoneButton.addEventListener("click", hideDoneTasks);
        completeAllButton.addEventListener("click", completeAllTasks);
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="${hideDone === true & task.done ? "hidden" : ""} list__element">
                <button class="js-done list__button list__button--done">${task.done ? "✔" : ""}</button>
                <span class="${task.done ? "list__element--done" : ""}">${task.content}</span>
                <button class="js-remove list__button list__button--remove">🗑</button>
            </li>
            `;
        };
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let buttonsHtmlString = "";

        buttonsHtmlString = `
        <button class="js-hideDoneButton section__taskButtons--button 
        ${tasks.length === 0 ? "hidden" : ""}">
        ${hideDone === true ? "Pokaż ukończone" : "Ukryj ukończone"}
        </button>
        <button ${tasks.every(({ done }) => done) ? "disabled" : ""} class="js-completeAllButton section__taskButtons--button 
        ${tasks.length === 0 ? "hidden" : ""}">Ukończ wszystkie</button>
        `;
        document.querySelector(".js-taskButtons").innerHTML = buttonsHtmlString;
    };

    const render = () => {
        renderButtons();
        renderTasks();
        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskInput = document.querySelector(".js-newTask");
        const newTaskContent = newTaskInput.value.trim();

        if (newTaskContent === "") {
            return;
        } else {
            addNewTask(newTaskContent);
            newTaskInput.value = "";
            render();
        };


    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
                done: false,
            }
        ];
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) => index === taskIndex ? { ...task, done: !task.done } : task);
        render();
    };

    const hideDoneTasks = () => {
        hideDone = !hideDone;
        render();
    };

    const completeAllTasks = () => {
        tasks = tasks.map(task => task.done === false ? { ...task, done: true } : task);
        render();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}