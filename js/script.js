{
    let tasks = [];

    let hideDone = false;
    let sorted = false;

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
        const sortButton = document.querySelector(".js-sortButton");

        hideDoneButton.addEventListener("click", hideDoneTasks);
        completeAllButton.addEventListener("click", completeAllTasks);
        sortButton.addEventListener("click", sortTasks);
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="${hideDone & task.done ? "hidden" : ""} list__element">
                <button class="js-done list__button list__button--done">${task.done ? "✔" : ""}</button>
                <span class="${task.done ? "list__element--done" : ""}">${task.content}</span>
                <span class="js-timeAdded list__time">Dodano o godzinie: ${task.time}</span>
                <button class="js-remove list__button list__button--remove">🗑</button>
            </li>
            `;
        };
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let buttonsHtmlString = "";
        buttonsHtmlString = `
                <button class="js-sortButton section__taskButtons--button ${tasks.length === 0 ? "hidden" : ""}">
                ${sorted === false ? "Sortuj od najstarszych" : "Sortuj od najnowszych"}
                </button>

                <button class="js-hideDoneButton section__taskButtons--button 
                ${tasks.length === 0 ? "hidden" : ""}">
                ${hideDone === true ? "Pokaż ukończone" : "Ukryj ukończone"}
                </button>

                <button ${tasks.every(({ done }) => done) ? "disabled" : ""} class="js-completeAllButton section__taskButtons--button ${tasks.length === 0 ? "hidden" : ""}">Ukończ wszystkie
                </button>
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
        }
        addNewTask(newTaskContent);
        newTaskInput.value = "";
        render();
    };

    const getTime = () => {
        const date = new Date();
        let hour = addZero(date.getHours());
        let minute = addZero(date.getMinutes());

        return `${hour}:${minute}`;
    };

    const addZero = number => number < 10 ? `0${number}` : number;

    const addNewTask = (newTaskContent) => {
        if (sorted === false) {
            tasks = [
                {
                    content: newTaskContent,
                    done: false,
                    time: getTime()
                },
                ...tasks
            ];
            return;
        };

        tasks = [
            ...tasks,
            {
                content: newTaskContent,
                done: false,
                time: getTime()
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

    const sortTasks = () => {
        sorted = !sorted;
        tasks = tasks.sort((a, b) => tasks.indexOf(b) - tasks.indexOf(a));
        render();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}