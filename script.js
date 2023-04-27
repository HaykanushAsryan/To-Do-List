let todos = localStorage.getItem("todos") ?
    JSON.parse(localStorage.getItem("todos")) :
    [
        {
            title: "task1",
            completed: true,
            input: "text1"
        },
        {
            title: "task2",
            completed: false,
            input: "text2"
        }
    ]

const listContainer = document.querySelector('.listContainer')
const inputEdit = document.createElement("input")


function render() {
    listContainer.innerHTML = ""
    todos.forEach((obj, i) => {
        const div = document.createElement("div")

        const span = document.createElement("span")
        span.innerText = obj.title

        const checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.checked = obj.completed

        if (checkbox.checked === false) {
            span.style.textDecoration = "none"
            span.style.color = "black"


        }
        if (checkbox.checked) {
            // console.log(Object.values(obj)[0]);   
            //  let text = Object.values(obj)[0]
            span.style.textDecoration = "line-through"
            span.style.color = "red"
            JSON.parse(localStorage.getItem("todos"))

        }

        checkbox.onchange = () => {
            obj.completed = !obj.completed
            console.log(obj);


            render()

            localStorage.setItem("todos", JSON.stringify(todos))

        }




        const editBtn = document.createElement("button")

        editBtn.innerText = "EDIT"
        edit()

        function edit() {
            editBtn.onclick = () => {
                checkbox.disabled = true
                if (checkbox.checked === false) {

                    editBtn.innerText = "SAVE"
                    span.append(inputEdit)
                    inputEdit.value = obj.title

                    editBtn.onclick = () => {
                        checkbox.disabled = false

                        span.innerText = inputEdit.value
                        obj.title = inputEdit.value
                        editBtn.innerText = "EDIT"

                        edit()
                        localStorage.setItem("todos", JSON.stringify(todos))

                    }

                } if (checkbox.checked) {
                    alert("Checked!")
                }
            }


        }


        const deleteBtn = document.createElement("button")
        deleteBtn.innerText = "X"
        deleteBtn.onclick = () => {

            console.log(todos);
            console.log(obj);
            console.log(i);

            if (obj.completed) {

                let targetIndex = i
                todos = todos.filter((obj, index) => index !== targetIndex)
                render()

                localStorage.setItem("todos", JSON.stringify(todos))

            } else {
                alert("Is not checked!")
            }

        }


        div.append(checkbox, span, editBtn, deleteBtn)
        listContainer.append(div)

        localStorage.setItem("todos", JSON.stringify(todos))

    })

}

render()


const addInput = document.querySelector(".addInput")
const addBtn = document.querySelector(".addButton")

addBtn.onclick = () => {
    if (addInput.value.trim()) {

        todos.push({
            title: addInput.value,
            completed: false,
            input: inputEdit.value
        })
        addInput.value = ''
        render()
        console.log(todos);
    } else {
        alert("FILL THE FIELD!")
    }


}

