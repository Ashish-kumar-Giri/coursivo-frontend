import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  GripVertical,
  ChevronDown,
  ChevronRight,
  Edit2,
  Trash2,
  Check,
  X,
  Plus,
  Video,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LessonItem } from "./LessonItem";
import type { Section, Lesson } from "./types";

interface SectionItemProps {
  section: Section;
  index: number;
  onUpdate: (sectionId: string, updates: Partial<Section>) => void;
  onDelete: (sectionId: string) => void;
  onToggle: (sectionId: string) => void;
  onAddLesson: (sectionId: string, type: "video" | "article" | "quiz") => void;
  onUpdateLesson: (
    sectionId: string,
    lessonId: string,
    updates: Partial<Lesson>,
  ) => void;
  onDeleteLesson: (sectionId: string, lessonId: string) => void;
  onToggleLessonPreview: (sectionId: string, lessonId: string) => void;
}

export function SectionItem({
  section,
  index,
  onUpdate,
  onDelete,
  onToggle,
  onAddLesson,
  onUpdateLesson,
  onDeleteLesson,
  onToggleLessonPreview,
}: SectionItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(section.title);

  // Make section itself sortable
  const {
    attributes,
    listeners,
    setNodeRef: setSectionRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: section.id,
    data: {
      type: "section",
      section,
    },
  });

  // Make the lesson container a droppable area
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: `section-${section.id}-lessons`,
    data: {
      type: "section",
      sectionId: section.id,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    onUpdate(section.id, { title: editTitle || section.title });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(section.title);
    setIsEditing(false);
  };

  return (
    <div
      ref={setSectionRef}
      style={style}
      className={`overflow-hidden rounded-sm border border-border bg-card ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-border bg-muted/50 p-4">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none text-muted-foreground hover:text-foreground"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <button
          onClick={() => onToggle(section.id)}
          className="text-muted-foreground hover:text-foreground"
        >
          {section.isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {isEditing ? (
          <div className="flex flex-1 items-center gap-2">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="h-8 text-sm"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") handleCancel();
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
            <div className="flex-1">
              <span className="text-sm font-semibold">
                Section {index + 1}: {section.title}
              </span>
              <span className="ml-2 text-xs text-muted-foreground">
                ({section.lessons.length}{" "}
                {section.lessons.length === 1 ? "lesson" : "lessons"})
              </span>
            </div>

            {/* Add Lesson Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <Plus className="h-4 w-4" />
                  Add Lesson
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => onAddLesson(section.id, "video")}
                >
                  <Video className="mr-2 h-4 w-4" />
                  Video Lesson
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onAddLesson(section.id, "article")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Article
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onAddLesson(section.id, "quiz")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Quiz
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => {
                setEditTitle(section.title);
                setIsEditing(true);
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(section.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* Lessons - Droppable area */}
      {section.isExpanded && (
        <div
          ref={setDroppableRef}
          className={`min-h-[60px] p-2 transition-colors ${
            isOver ? "bg-primary/5" : ""
          }`}
        >
          {section.lessons.length === 0 ? (
            <div className="py-6 text-center">
              <p className="mb-3 text-sm text-muted-foreground">
                {isOver ? "Drop lesson here" : "No lessons in this section"}
              </p>
              {!isOver && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => onAddLesson(section.id, "video")}
                  >
                    <Video className="h-4 w-4" />
                    Add Video
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => onAddLesson(section.id, "article")}
                  >
                    <FileText className="h-4 w-4" />
                    Add Article
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <SortableContext
              items={section.lessons.map((l) => l.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-1">
                {section.lessons.map((lesson, lessonIndex) => (
                  <LessonItem
                    key={lesson.id}
                    lesson={lesson}
                    index={lessonIndex}
                    sectionId={section.id}
                    onUpdate={onUpdateLesson}
                    onDelete={onDeleteLesson}
                    onTogglePreview={onToggleLessonPreview}
                  />
                ))}
              </div>
            </SortableContext>
          )}
        </div>
      )}
    </div>
  );
}
