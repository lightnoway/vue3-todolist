<template>
  <section class="todoapp">
    <header class="header">
      <h1>todo list</h1>
      <input
        id="newTodo"
        class="new-todo"
        v-model="input"
        placeholder="What needs to be done?"
        @keyup.enter="addItem"
        autofocus
      />
    </header>
    <section class="main" style="display: block">
      <input class="toggle-all" type="checkbox" />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li
          v-for="item of todos"
          :key="item"
          :class="{ completed: item.completed }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="item.completed" />
            <label>{{ item.text }}</label>
            <button class="destroy" @click="removeItem(item)"></button>
          </div>
        </li>
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
import { ref } from "vue";

function useAddItem(todos) {
  const input = ref("");
  function addItem() {
    if (input.value) {
      todos.value.push({
        complete: false,
        text: input.value,
      });
      input.value = "";
    }
  }
  return { input, addItem };
}
function useRemoveItem(list) {
  return {
    removeItem,
  };
  function removeItem(item) {
    const index = list.value.indexOf(item);
    if (index > -1) {
      list.value.splice(index, 1);
    }
  }
}

export default {
  name: "App",
  setup() {
    const todos = ref([]);
    const { removeItem } = useRemoveItem(todos);
    return {
      todos,
      ...useAddItem(todos),
      removeItem,
    };
  },
};
</script>
 