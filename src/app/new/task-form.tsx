import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CloudFog } from 'lucide-react'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export function TaskForm() {
  async function createTask(formData: FormData) {
    'use server'
    const name = formData.get('name')?.toString()
    const description = formData.get('description')?.toString()
    const priority = formData.get('priority')?.toString()

    console.log(name, description, priority)

    if (!name || !description || !priority) {
      return
    }

    const newTask = await prisma.task.create({
      data: {
        name: name,
        description: description,
        priority: priority,
      },
    })
    redirect('/')
    console.log(newTask)
  }

  return (
    <form action={createTask}>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Create Task</CardTitle>
          <CardDescription>
            Fill out the form below to create a new task.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Input name='name' id='name' placeholder='Name of your task' />
            </div>

            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                name='description'
                id='description'
                placeholder='Description of your task'
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='priority'>Priority</Label>
              <Select name='priority'>
                <SelectTrigger id='priority'>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent position='popper'>
                  <SelectItem value='low'>Low</SelectItem>
                  <SelectItem value='medium'>Medium</SelectItem>
                  <SelectItem value='high'>High</SelectItem>
                  <SelectItem value='urgent'>Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline'>Cancel</Button>
          <Button type='submit'>Create Task</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
