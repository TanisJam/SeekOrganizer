import { Pencil, Trash2, CircleAlert } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Task } from '@/core/entities/task';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface TaskCardProps
  extends Pick<Task, 'title' | 'description' | 'status' | 'important'> {
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TaskCard({
  title,
  description,
  status,
  onEdit,
  onDelete,
  important,
}: TaskCardProps) {
  return (
    <Card className="w-full flex flex-col bg-white shadow-md max-w-md">
      <CardHeader className="flex flex-col items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-1">
          {title}
          {important && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleAlert className="h-4 w-4 text-primary hover:text-red-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>This task is marked as important</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
      </CardContent>
      <CardFooter className="mt-auto flex justify-between">
        <div className="flex items-center gap-2">
          <Badge variant={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <div className="flex justify-end space-x-2 mt-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="h-8 w-8"
            data-testid="edit-task"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="h-8 w-8 text-destructive hover:text-destructive"
            data-testid="delete-task"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
