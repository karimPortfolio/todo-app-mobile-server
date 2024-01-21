import { prisma } from "../config/prisma.js";


//create new task for a specific user using user id
export const createNewTask = async (title, content, id) => {
    try
    {
        const newTask = await prisma.tasks.create({
            data: {
                title,
                content,
                isCompleted: false,
                userId:id
            }
        });
        return newTask;
    }
    catch(err)
    {
        console.log(err);
        return;
    }
}

//get all tasks for a specific user using user id
export const getAllUserTasks =  async (id) => {
    try
    {
        const tasks = await prisma.tasks.findMany({where:{userId:id}});
        return tasks;
    }
    catch (err)
    {
        console.log(err);
        return;
    }
}

//get task by task id
export const getTaskById = async (id) => {
    try
    {
        const task = await prisma.tasks.findUnique({where:{id:id}});
        return task;
    }
    catch (err)
    {
        console.log(err);
        return;
    }
}

//delete a specific task using task id
export const deleteUserTask = async (id) => {
    try
    {
        const deletedTask = await prisma.tasks.delete({where:{id:id}});
        return deletedTask;
    }
    catch (err)
    {
        console.log(err);
        return;
    }
}

//update a specific task details using task id
export const updateUserTask = async (title, content, id) => {
    try
    {
        const updatedTask = await prisma.tasks.update({
            where:{id:id},
            data:{
                title,
                content,
            }
        })
        return updatedTask;
    }
    catch (err)
    {
        console.log(err);
        return;
    }
}

//change the status of a specific task from completed/uncompleted using task id and the last task status
export const taskCompleteStatus = async (id, getTask) => {
    try
    {
        const completedTask = await prisma.tasks.update({
            where:{id:id},
            data:{
                isCompleted: !getTask.isCompleted
            }
        })
        return completedTask;
    }
    catch (err)
    {
        console.log(err);
        return;
    }
}
