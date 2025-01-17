import React from 'react'
import { Button } from '../ui/button'
import { Trash2Icon } from 'lucide-react'
import useManageComment from '@/hooks/useComment'
import { useRouter } from 'next/navigation'

export default function DeleteCommentBtn({commentId}:{
    commentId: string
}) {
    const router =  useRouter()
    const handleDelete = useManageComment((state) => state.onDelete)
  return (
    <Button
    size={"icon"}
    onClick={() => handleDelete(commentId, router)}
    variant={"ghost"}
    className="text-red-500"
  >
    <Trash2Icon className="h-4 w-4" />
  </Button>
  )
}
