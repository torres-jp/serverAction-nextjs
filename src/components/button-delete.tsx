import { Button } from './ui/button'
import { removeTask } from '@/actions/task-action'

export function TaskButtonDelete({ taskId }: { taskId: number }) {
  return (
    <form action={removeTask}>
      <input type='hidden' name='taskId' value={taskId} />
      <Button variant='destructive'>Delete</Button>
    </form>
  )
}
