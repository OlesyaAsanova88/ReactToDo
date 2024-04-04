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

export const useToDoStore = create<ToDoStore>((set, get) => {
    
    const storedTasks = localStorage.getItem('tasks');
    const initialTasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

    set({
        tasks: initialTasks,
    });

    return ({
        tasks: initialTasks,
        createTask: (title) => {
            const { tasks } = get();
            const newTask = {
                id: generateId(),
                title: title,
                createdAt: Date.now(),
            };
            const updatedTasks = [newTask, ...tasks];
            set({ tasks: updatedTasks });
           
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        },

        updateTask: (id: string, title: string) => {
            const { tasks } = get();
            const updatedTasks = tasks.map(task => {
                if (task.id === id) {
                    return { ...task, title: title };
                }
                return task;
            });
            set({ tasks: updatedTasks });
            
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        },

        removeTask: (id: string) => {
            const { tasks } = get();
            const updatedTasks = tasks.filter(task => task.id !== id);
            set({ tasks: updatedTasks });
            
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        }
    });
});

