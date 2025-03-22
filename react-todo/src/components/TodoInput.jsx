import { useState } from "react"

export default function TodoInput(props) {
    const {handleAddTodos, todoValue, setTodoValue} = props
    // const [todoValue, setTodoValue] = useState('')
    return(
        <header>
            <input placeholder="Enter Todo tasks..." value={todoValue} onChange={(e) => {
                setTodoValue(e.target.value)
            }}/>
            <button onClick={() => {
                handleAddTodos(todoValue)
                setTodoValue('')
            }

            }>Add task</button>
        </header>
    )
}