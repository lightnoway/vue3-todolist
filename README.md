

## 需求及说明
页面展示 [参考效果](https://todomvc-app.herokuapp.com/)
- 新增todo 输入框
    - 回车新增todo
- todoList header
    - checkAll
- todoList 列表
    - check
    - 删除
    - 修改
- todoList footer 及其他
    - 显示剩余
    - 过滤 all,active,completed
    - clear completed

交互-添加
交互-删除
交互-编辑
  - 双击item ，进入编辑状态
    - 切换显示：显示输入框，值为原文本值；隐藏原 check，label
    - 编辑时按Esc ，cancel: 直接回到（丢弃编辑的输入框中文本）非编辑态
    - 编辑时按回车，confirm: 
        - 输入框文本为空，删除当前item
        - 输入框文本不为空
            - 修改当前item.text
            - 回到非编辑态 
交互-check
交互-过滤
交互-cleanDone

## 实现步骤
创建项目：`vue create`
模板引入,[素材](https://github.com/dwyl/javascript-todo-list-tutorial)
新增todo
列表展示
checkAll
footer


## 日志
搜索一个 可以被import 的 todo模板
- npmjs
    - javascript-todo-list-tutorial  
        - yarn add 失败： npm test
        - 手动复制样式，模板


- filter 被废弃了        
- [ ] lodash 按需引入
- [ ] 支持自动部署，比如vercel