import { create } from 'zustand';
import { generateId } from '../helpers';

interface Task {
    id: string;
    title: string;
    createdAt: number;
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
}
export const useToDoStore = create<ToDoStore>((set, get) => ({
    tasks: [
        {
            id: "1",
            title: 'I like React',
            createdAt: 0,
        }
    ],
    createTask: (title) => {
        const { tasks } = get();
        const newTask = {
            id: generateId(),
            title: title,
            createdAt: Date.now(),
        };
        set({
            tasks: [newTask].concat(tasks),
        });
    },

    updateTask: (id: string, title: string) => {
        const { tasks } = get();


        const newTasks = tasks.map( (task) => {
            if(task.id === id) {
                task.title = title
            }
            return task
        })

        set({
            tasks: newTasks
        })
},
      
    removeTask: (id: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.filter((task) => task.id !== id)
        });
    },    
}));