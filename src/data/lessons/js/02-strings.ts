import type { FillLesson } from '../../curriculum'

const lesson: FillLesson = {
  id: 'js-02',
  moduleId: 'js',
  title: '字符串操作',
  subtitle: 'String Methods',
  xp: 10,
  difficulty: 'easy',
  type: 'fill-in-blank',
  questions: [
    {
      instruction: '使用模板字符串将变量嵌入字符串中',
      template: 'const name = "Alice"\nconst greeting = `Hello, ${___}!`',
      blanks: ['name'],
      hint: '模板字符串用反引号，变量用 ${ } 包裹',
      explanation: '模板字符串（template literals）使用反引号，可以用 ${变量名} 内嵌任意表达式。',
    },
    {
      instruction: '获取字符串的长度',
      template: 'const str = "TypeScript"\nconst len = str.___',
      blanks: ['length'],
      explanation: 'String.length 属性返回字符串中字符的数量。',
    },
    {
      instruction: '将字符串转为大写',
      template: 'const s = "hello"\nconst up = s.___()',
      blanks: ['toUpperCase'],
      explanation: 'toUpperCase() 返回字符串的大写版本，原字符串不变。对应方法 toLowerCase() 转小写。',
    },
    {
      instruction: '检查字符串是否包含某个子串',
      template: 'const text = "TypeScript is great"\nconst hasTS = text.___(\"TypeScript\")',
      blanks: ['includes'],
      hint: '该方法返回 boolean',
      explanation: 'includes() 方法检查字符串是否含有给定子串，返回 true 或 false。',
    },
    {
      instruction: '用指定字符分割字符串为数组',
      template: 'const csv = "a,b,c,d"\nconst arr = csv.___(",")',
      blanks: ['split'],
      explanation: 'split(separator) 按分隔符将字符串分割为数组。与 Array 的 join() 方法相反。',
    },
  ],
}

export default lesson
