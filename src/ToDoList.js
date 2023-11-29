import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import {
  setPage,
  changeItem,
  addNewItem,
} from "./store/reducers/todoListReducer";

function ToDoList() {
  const dispatch = useDispatch();
  const todolist = useSelector((state) => state.list.todoList);
  const pageLimit = 10;
  const [pageNumber, setPageNumber] = useState(0);
  const [newItem, setNewItem] = useState("");
  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");
  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/todos?_page=1&_limit=${pageLimit}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(setPage({ data, pageNumber: 1 }));
      });
  }, []);

  // FUNCTION FOR ADD NEW TASK
  function addItem() {
    // If item empty show alert
    if (!newItem) {
      alert("Press enter your task.");
      return;
    }
    // // Add new TASK to TASKS array
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        userId: 1,
        title: newItem,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Сreate a new array with the added task
        const newTodoList = [{ ...data, id: todolist.length + 1 }, ...todolist];
        dispatch(addNewItem({ data: newTodoList }));
      });
    // MAKE RESET newItem back to original state
    setNewItem("");
  }
  // FUNCTION FOR DELETE
  function deleteItem(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        const newArray = todolist.filter((item) => item.id !== id);
        dispatch(changeItem({ data: newArray }));
      });
  }
  function EditeTask(id) {
    setShowEdit(id);
  }
  // FUNCTION FOR UPDATE
  const updateCurrentItem = (newItem, id) => {
    const newUpdatedList = todolist.map((i) => {
      return i.id !== id ? i : { ...newItem, id: id };
    });
    return newUpdatedList;
  };
  function editItem(id, newText) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        userId: 1,
        id: id,
        title: newText,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updetedItem = updateCurrentItem(data, id);
        dispatch(changeItem({ data: updetedItem }));
      });
    setUpdatedText("");
    setShowEdit(-1);
  }
  // PAGINATION
  const itemsPerPage = 5;
  const pagesVisited = pageNumber * itemsPerPage;

  const pageCount = Math.ceil(todolist.length / itemsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // map our task
  const todoAll = todolist
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((item, index) => {
      return (
        <div key={item.id}>
          <li className="task-li-container">
            <span>{index + 1}.</span>{" "}
            <span className="text-task">{item.title}</span>
            <button
              className="button-container edit"
              onClick={() => deleteItem(item.id)}
            >
              <img className="edit-img" src="delete.png" alt="icon" />
            </button>
            <button
              className="button-container edit"
              onClick={() => EditeTask(item.id)}
            >
              <img className="edit-img" src="edite.png" alt="icon" />
            </button>
          </li>
          {showEdit === item.id ? (
            <div>
              <input
                className="show-input"
                type="text"
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
              />
              <button
                className="button-container add"
                onClick={() => editItem(item.id, updatedText)}
              >
                Update
              </button>
            </div>
          ) : null}
        </div>
      );
    });

  return (
    <div className="main-container">
      <h2 className="header-text">My Tasks List</h2>
      <ul className="list-container">
        <div className="task-container first">
          <li className="add-li-container">
            <input
              className="input-new-task"
              type="text"
              placeholder="Add new task..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <button className="button-container add" onClick={() => addItem()}>
              Add
            </button>
          </li>
        </div>
        {todoAll}
      </ul>
      {todolist.length > itemsPerPage + 1 && (
        <div className="pagination">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationContainer"}
            previousLinkClassName={"prevBtn"}
            nextLinkClassName={"nextBtn"}
            activeClassName={"activePagination"}
            pageLinkClassName={"pageLink"}
          />
        </div>
      )}
    </div>
  );
}

export default ToDoList;
