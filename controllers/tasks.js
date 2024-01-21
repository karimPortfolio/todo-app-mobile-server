import { prisma } from "../config/prisma.js";
import { 
    createNewTask,
    deleteUserTask,
    getAllUserTasks, 
    getTaskById,
    taskCompleteStatus
} from "../db/tasks.js";


//get all tasks for a signed up user
export const getTasks = async (req, res) => {
    try
    {
        const id = req.params.id;

        if (!id)
        {
            return res.status(400).json({
                type:'failed',
                message:'No id provided.'
            });
        }

        //get tasks from database
        const tasks = await getAllUserTasks(id);
    
        //check if no task found for the signed up user 
        if (!tasks)
        {
            return res.status(400).json({
                type:'failed',
                message:'No task found. Create new task.'
            });
        }

        //tasks found
        res.status(200).json({
            type:'success',
            tasks: tasks
        });

    }
    catch (err)
    {
        console.log(err);
        return res.status(500).json({
            type:'failed',
            message:'Something went wrong. Try again later.'
        });
    }
    finally
    {
        prisma.$disconnect;
    }
}

//add new task
export const createTask = async (req, res) => {
    
    try{
        const {title, content} = req.body;
        const id = req.params.id;
    
        if (title === "" && content === "")
        {
            return res.status(400).json({
                type:'failed',
                message:'Please provide all task information.'
            });
        }
        else if (!id)
        {
            return res.status(400).json({
                type:'failed',
                message:'No id provided.'
            });
        }
    
        const new_task = await createNewTask(title, content, id);
        if (!new_task)
        {
            return res.status(500).json({
                type:'failed',
                message:'Something went wrong while creating task.'
            });
        }
    
        res.status(200).json({
            type:'success',
            message:'Task created successfully',
        });
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            type:'failed',
            message:'Something went wrong. Try again later.'
        });
    }
    finally {
        prisma.$disconnect;
    }
}

//delete task
export const deleteTask = async (req, res) => {
    try
    {
        const id = parseInt(req.params.id);

        if (!id)
        {
            return res.status(400).json({
                type:'failed',
                message:'No id provided.'
            });
        }

        const delete_task = await deleteUserTask(id);
        
        if (!delete_task)
        {
            return res.status(500).json({
                type:'failed',
                message:'Something went wrong while creating task.'
            });
        }

        //tasks found
        res.status(200).json({
            type:'success',
            message:'Task has been deleted.'
        });

    }
    catch (err)
    {
        console.log(err);
        return res.status(500).json({
            type:'failed',
            message:'Something went wrong. Try again later.'
        });
    }
    finally
    {
        prisma.$disconnect;
    }
}

//update task
export const updateTask = async (req, res) => {
    
    try{
        const {title, content} = req.body;
        const id = parseInt(req.params.id);
    
        if (title === "" && content === "")
        {
            return res.status(400).json({
                type:'failed',
                message:'Please provide all task information.'
            });
        } 
        else if (!id)
        {
            return res.status(400).json({
                type:'failed',
                message:'No id provided.'
            });
        }

        const edited_task = await prisma.tasks.update({
            where:{id:id},
            data:{
                title,
                content,
            }
        })
    
        if (!edited_task)
        {
            return res.status(500).json({
                type:'failed',
                message:'Something went wrong while editing task.'
            });
        }
    
        res.status(200).json({
            type:'success',
            message:'Task edited successfully.',
        });
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            type:'failed',
            message:'Something went wrong. Try again later.'
        });
    }
    finally {
        prisma.$disconnect;
    }
}


//change tasks status to completed or not complete yet
export const taskCompleted = async (req, res) => {

    try{
        const id = parseInt(req.params.id);
        
        if (!id)
        {
            return res.status(400).json({
                type:'failed',
                message:'No id provided.'
            });
        }

        const getTask = await getTaskById(id);

        if (!getTask)
        {
            return res.status(400).json({
                type:'failed',
                message:'No task found with the id provided.'
            });
        }

        const edited_task = await taskCompleteStatus(id, getTask);
    
        if (!edited_task)
        {
            return res.status(500).json({
                type:'failed',
                message:'Something went wrong while change task status.'
            });
        }

        res.status(200).json({
            type:'success',
            message: edited_task.isCompleted 
                    ? `Congratulations! Task ${edited_task.title} completed successfully.` 
                    : `Task ${edited_task.title} status change to not completed yet.` ,
        });
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            type:'failed',
            message:'Something went wrong. Try again later.'
        });
    }
    finally {
        prisma.$disconnect;
    }
}

