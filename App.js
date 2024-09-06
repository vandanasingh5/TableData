function TaskTable() {
    const initialTasks = [
      { id: 1, task: "Onboarding Call" },
      { id: 2, task: "Google Search Console Access" },
      { id: 3, task: "Google Analytics Access" },
      { id: 4, task: "Website Access" },
      { id: 5, task: "Technical Audit" },
      { id: 6, task: "Anchor Text and Semantic Analysis" },
      { id: 7, task: "Competitor Analysis" },
      { id: 8, task: "Anchor Text / URL Mapping" },
      { id: 9, task: "Google Data Studio Report + Local Reporting Suite" },
      { id: 10, task: "Site Level Optimization" },
      { id: 11, task: "On Page Optimization" },
      { id: 12, task: "Content Creation" },
      { id: 13, task: "Content Publishing" },
      { id: 14, task: "Premium Press Release" },
      { id: 15, task: "Authority Niche Placements" },
      { id: 16, task: "Review Management" },
      { id: 17, task: "Index Links" },
      { id: 18, task: "Video Recap" }
    ];
  
    const [tasks, setTasks] = React.useState(initialTasks);
    const [editableTaskId, setEditableTaskId] = React.useState(null);
    const [editedTask, setEditedTask] = React.useState("");
  
    const handleEditClick = (id, task) => {
      setEditableTaskId(id);
      setEditedTask(task);
    };
  
    const handleSaveClick = async (id) => {
      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, task: editedTask } : task
      );
      setTasks(updatedTasks);
      setEditableTaskId(null);
  
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
          id,
          task: editedTask
        });
        console.log("Data posted to API:", response.data);
      } catch (error) {
        console.error("Error posting data", error);
      }
    };
  
    const handleCancelClick = () => {
      setEditableTaskId(null);
      setEditedTask("");
    };
  
    const handleInputChange = (event) => {
      setEditedTask(event.target.value);
    };
  
    return (
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                {editableTaskId === task.id ? (
                  <input
                    type="text"
                    value={editedTask}
                    onChange={handleInputChange}
                  />
                ) : (
                  task.task
                )}
              </td>
              <td className="action-btns">
                {editableTaskId === task.id ? (
                  <React.Fragment>
                    <button
                      className="edit-btn save-btn"
                      onClick={() => handleSaveClick(task.id)}
                    >
                      Save
                    </button>
                    <button
                      className="edit-btn cancel-btn"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                  </React.Fragment>
                ) : (
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(task.id, task.task)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  ReactDOM.render(<TaskTable />, document.getElementById('root'));
  