import React from 'react'
import { useToDoStore } from '../../../data/stores/useToDoStore'

import styles from './contentTask.module.scss'

import { InputPlus } from '../InputPlus/inputPlus'
import { InputTask } from '../InputTask/inputTask'


export const ContentTask: React.FC = () => {

    const tasks = useToDoStore( state => state.tasks);
    const createTask = useToDoStore( state => state.createTask);
    const updateTask = useToDoStore( state => state.updateTask);
    const removeTask = useToDoStore( state => state.removeTask);

    console.log(tasks)
    
    return (
<article className={styles.article}>

<h1 className={styles.articleTitle} >Todo list</h1>

<section className={styles.articleSection}>
    <InputPlus 
        onAdd={(title) => {
            if(title) {
                createTask(title)
            }
        }}
    />
</section>
<section className={styles.articleSectionTwo}>
    {!tasks.length && (
        <p className={styles.articleText}>There is no tasks</p>
    )}
    {tasks.map((task) => (
        <InputTask
            key={task.id}
            id={task.id}
            title={task.title}
            onDane={checked => updateTask(task.id, checked ? task.title : '')}
            onEdited={({id, title}: {id:string; title: string}) => {
                if(title) {
                    updateTask(id, title)
                }
            }}
            onRemoved={() => removeTask(task.id)}
        />
    ))}
</section>
</article>
        
    )
}

