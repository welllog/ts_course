import type { FillLesson } from "../../curriculum";

const lesson: FillLesson = {
  id: "js-11",
  moduleId: "js",
  title: "ES Modules",
  subtitle: "import / export",
  xp: 15,
  difficulty: "medium",
  type: "fill-in-blank",
  questions: [
    {
      instruction: "导出一个命名函数",
      template: "___ function add(a, b) {\n  return a + b\n}",
      blanks: ["export"],
      explanation:
        "使用 export 关键字导出声明。命名导出可以有多个，导入时需要使用 { add } 语法。",
    },
    {
      instruction: "导入命名导出",
      template: '___ { add, multiply } from "./math.js"',
      blanks: ["import"],
      explanation: '使用 import { name1, name2 } from "module" 导入命名导出。',
    },
    {
      instruction: "导出默认值",
      template: "export ___ function App() {\n  return <div>Hello</div>\n}",
      blanks: ["default"],
      explanation:
        '每个模块只能有一个默认导出。导入时无需花括号：import App from "./App"，并且可以任意命名。',
    },
    {
      instruction: "导入时重命名",
      template: 'import { add ___ sum } from "./math.js"',
      blanks: ["as"],
      explanation:
        '使用 as 关键字在导入时重命名：import { originalName as newName } from "module"。',
    },
    {
      instruction: "导入模块的所有命名导出",
      template: 'import ___ math from "./math.js"\nmath.add(1, 2)',
      blanks: ["* as"],
      explanation:
        "import * as name 将模块所有命名导出汇聚到一个命名空间对象中。",
    },
  ],
};

export default lesson;
