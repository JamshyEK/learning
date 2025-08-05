import React, { useState } from "react";

interface IColumn {
  title: string;
  key: string;
}

interface IRow {
  id: string;
  taskName: string;
  status: Status;
}

enum Status {
  INPROGRESS = "inprogress",
  COMPLETED = "completed",
}

const column: IColumn[] = [
  { title: "Task Name", key: "taskName" },
  {
    title: "Status",
    key: "status",
  },
  {
    title: "Action",
    key: "action",
  },
];

const Todo: React.FC = () => {
  const [tasks, setTasks] = useState<IRow[]>([]);
  const [taskName, setTaskName] = useState<string>("");
  const [selectedCell, setSelectedCell] = useState<[number, string]>([0, ""]);
  const handleAddTask = () => {
    if (taskName) {
      const id: string = crypto.randomUUID();
      setTasks((prev) => [
        ...prev,
        { id: id, taskName: taskName, status: Status.INPROGRESS },
      ]);
      setTaskName("");
    }
  };

  const handleDeleteTask = (taskId: string): void => {
    const filteredTasks = tasks.filter((item) => item.id !== taskId);
    setTasks(filteredTasks);
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { value, name } = e.target;
    const updatedList = tasks.map((item, i) => {
      if (index === i) {
        return { ...item, [name]: value };
      } else {
        return item;
      }
    });
    setTasks(updatedList);
  };

  return (
    <div className='pr-10 pl-10'>
      <h1 className='text-center text-4xl pt-2 font-thin text-stone-700'>
        --Todo--
      </h1>
      <div className='flex flex-row justify-between'>
        <input
          type='text'
          name='task'
          value={taskName}
          placeholder='Enter task'
          onChange={(event) => {
            const { value } = event.target;
            setTaskName(value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
          className='border border-gray-300 p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
          onClick={handleAddTask}
          className='bg-blue-600 p-1 pl-3 pr-3 text-white rounded'>
          Add Task
        </button>
      </div>
      <div className='pt-4'>
        <table className='table-auto border-collapse border border-gray-400 w-full'>
          <thead>
            <tr>
              {column.map((item, index) => (
                <th className='border border-gray-300 px-4 py-2' key={index}>
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((item, index) => (
              <tr key={index}>
                <td
                  className='border border-gray-300 px-4 py-2'
                  onDoubleClick={() => {
                    setSelectedCell([index, "taskName"]);
                  }}>
                  {selectedCell[0] === index &&
                  selectedCell[1] === "taskName" ? (
                    <input
                      type='text'
                      name='taskName'
                      value={tasks[index]["taskName"]}
                      placeholder='Enter task'
                      onChange={(event) => handleEditChange(event, index)}
                      onBlur={() => setSelectedCell([0, ""])}
                      className='border border-gray-300 p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  ) : (
                    item.taskName
                  )}
                </td>
                <td
                  onDoubleClick={() => {
                    setSelectedCell([index, "status"]);
                  }}
                  className='border border-gray-300 px-4 py-2'>
                  {selectedCell[0] === index && selectedCell[1] === "status" ? (
                    <select
                      name='status'
                      onChange={(event) => handleEditChange(event, index)}
                      onBlur={() => setSelectedCell([0, ""])}
                      className='border border-gray-300 p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                      {Object.values(Status).map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  ) : (
                    item.status
                  )}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-center'>
                  <button
                    onClick={() => handleDeleteTask(item.id)}
                    className='bg-red-600 pl-2 pr-2 text-white rounded'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Todo;
