import type { FillLesson } from "../../curriculum";

const lesson: FillLesson = {
  id: "js-05",
  moduleId: "js",
  title: "对象与解构",
  subtitle: "Objects & Destructuring",
  xp: 15,
  difficulty: "medium",
  type: "fill-in-blank",
  questions: [
    {
      instruction: "对象属性的简写语法：当变量名与属性名相同时",
      template:
        'const name = "Alice"\nconst age = 25\nconst user = { ___, ___ }',
      blanks: ["name", "age"],
      explanation:
        "当属性名与变量名相同时，可以直接写变量名：{ name, age } 等价于 { name: name, age: age }。",
    },
    {
      instruction: "从对象中解构属性",
      template:
        'const user = { name: "Bob", age: 30 }\nconst { ___, ___ } = user',
      blanks: ["name", "age"],
      explanation:
        "解构赋值 const { prop1, prop2 } = obj 从对象中提取属性并创建同名变量。",
    },
    {
      instruction: "解构时为属性设置别名",
      template: 'const { name: ___ } = { name: "Carol" }',
      blanks: ["userName"],
      hint: "格式：{ 原属性名: 新变量名 }",
      explanation:
        "解构时用冒号重命名：const { name: userName } = obj，创建的是 userName 变量，而非 name。",
    },
    {
      instruction: "使用展开运算符合并对象",
      template:
        'const defaults = { color: "blue", size: 10 }\nconst custom = { size: 20 }\nconst merged = { ___defaults, ___custom }',
      blanks: ["...", "..."],
      explanation:
        "... 展开运算符可以将对象的属性展开到新对象中。后面的属性会覆盖前面的同名属性，所以 merged.size 是 20。",
    },
    {
      instruction: "可选链操作符：安全访问可能为 null 的属性",
      template: "const user = null\nconst name = user___name",
      blanks: ["?."],
      hint: "使用 ?. 代替 .",
      explanation:
        "可选链 ?. 在左侧为 null/undefined 时短路返回 undefined，而不是抛出错误。user?.name 当 user 为 null 时安全返回 undefined。",
    },
  ],
};

export default lesson;
