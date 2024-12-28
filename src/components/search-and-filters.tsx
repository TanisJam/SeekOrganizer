import { useTaskStore } from '@/store/useTaskStore';
// import { TaskCard } from './task-card';

export const SearchAndFilters = () => {
  const {
    setSearchQuery,
    setStatusFilter,
    setImportantFilter,
    // getFilteredTasks,
  } = useTaskStore();

  // const filteredTasks = getFilteredTasks();

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar tareas..."
      />
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setStatusFilter(
            e.target.value as 'all' | 'pending' | 'in-progress' | 'completed'
          )
        }
      >
        <option value="all">Todas</option>
        <option value="pending">Pendientes</option>
        <option value="in-progress">En Progreso</option>
        <option value="completed">Completadas</option>
      </select>
      <label>
        <input
          type="checkbox"
          onChange={(e) => setImportantFilter(e.target.checked)}
        />
        Solo importantes
      </label>

      {/* Mostrar tareas filtradas */}
      {/* {filteredTasks.map((task) => (
        <TaskCard key={task.id}

        />
      ))} */}
    </div>
  );
};
