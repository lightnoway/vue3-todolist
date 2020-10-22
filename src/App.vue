<template>
  <section class="todoapp">
    <header class="header">
      <h1>todo list</h1>
      <input
        id="newTodo"
        class="new-todo"
        placeholder="What needs to be done?"
      />
    </header>
    <section class="main" style="display: block">
      <input class="toggle-all" type="checkbox" />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li data-id="1533501855500" class="completed">
          <div class="view">
            <input class="toggle" type="checkbox" />
            <label>Learn Elm Architecture</label>
            <button class="destroy"></button>
          </div>
        </li>
        <li data-id="1533501861171" class="">
          <div class="view">
            <input class="toggle" type="checkbox" />
            <label>Build Todo List App</label>
            <button class="destroy"></button>
          </div>
        </li>
        <li data-id="1533501867123" class="">
          <div class="view">
            <input class="toggle" type="checkbox" />
            <label>Win the Internet!</label>
            <button class="destroy"></button>
          </div>
        </li>
      </ul>
    </section>
    <footer class="footer">
      <span class="todo-count"
        ><strong id="todoCount">0</strong> item left</span
      >
      <ul class="filters">
        <li>
          <a
            class="selected"
            id="allWorks"
            onclick="changeClass(this)"
            href="#/"
            >All</a
          >
        </li>
        <li>
          <a href="#active" id="activedItems" onclick="changeClass(this)"
            >Active</a
          >
        </li>
        <li>
          <a href="#completed" id="completedTodos" onclick="changeClass(this)"
            >Completed</a
          >
        </li>
      </ul>
      <button class="clear-completed" id="btnClear">Clear completed</button>
    </footer>
  </section>
</template>

<script>
import "./assets/css/index.css";
export default {
  name: "App",
};
</script>
 