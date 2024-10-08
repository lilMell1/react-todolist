import { Taskprops } from '../interfaces/Task.interface';

export interface TaskListProps {
    tasks: Taskprops[];
    isLoading: boolean;
}