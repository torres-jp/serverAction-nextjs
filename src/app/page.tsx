import { TaskCard } from '@/components/task-card'
import prisma from '@/lib/prisma'

async function HomePage() {
  const tasks = await prisma.task.findMany()
  console.log(tasks)

  return (
    <div className='grid grid-cols-3 gap-4'>
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  )
}

export default HomePage

//07:00
