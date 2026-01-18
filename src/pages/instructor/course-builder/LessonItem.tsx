import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  GripVertical,
  PlayCircle,
  FileText,
  Clock,
  MoreVertical,
  Edit2,
  Trash2,
  Check,
  X,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Lesson } from "./types"

interface LessonItemProps {
  lesson: Lesson
  index: number
  sectionId: string
  onUpdate: (sectionId: string, lessonId: string, updates: Partial<Lesson>) => void
  onDelete: (sectionId: string, lessonId: string) => void
  onTogglePreview: (sectionId: string, lessonId: string) => void
}

export function LessonItem({ 
  lesson, 
  index, 
  sectionId,
  onUpdate, 
  onDelete, 
  onTogglePreview 
}: LessonItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(lesson.title)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: lesson.id,
    data: {
      type: "lesson",
      lesson,
      sectionId,
    }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const getLessonIcon = (type: "video" | "article" | "quiz") => {
    switch (type) {
      case "video": return <PlayCircle className="h-4 w-4" />
      case "article": return <FileText className="h-4 w-4" />
      case "quiz": return <FileText className="h-4 w-4" />
    }
  }

  const handleSave = () => {
    onUpdate(sectionId, lesson.id, { title: editTitle || lesson.title })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(lesson.title)
    setIsEditing(false)
  }

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 rounded-sm hover:bg-muted/50 group bg-card ${
        isDragging ? "shadow-lg ring-2 ring-primary/20" : ""
      }`}
    >
      <button 
        {...attributes}
        {...listeners}
        className="cursor-grab text-muted-foreground/50 hover:text-muted-foreground transition-opacity touch-none"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="text-muted-foreground">
        {getLessonIcon(lesson.type)}
      </div>
      
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="h-8 text-sm"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave()
              if (e.key === "Escape") handleCancel()
            }}
          />
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8"
            onClick={handleSave}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8"
            onClick={handleCancel}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <span className="flex-1 text-sm">
            {index + 1}. {lesson.title}
          </span>
          {lesson.isPreview && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
              Preview
            </span>
          )}
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {lesson.duration}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {
                setEditTitle(lesson.title)
                setIsEditing(true)
              }}>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Title
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onTogglePreview(sectionId, lesson.id)}>
                <PlayCircle className="mr-2 h-4 w-4" />
                {lesson.isPreview ? "Remove Preview" : "Make Preview"}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(sectionId, lesson.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  )
}
