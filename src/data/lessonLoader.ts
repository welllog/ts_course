import type { Lesson } from './curriculum'

import js01 from './lessons/js/01-variables'
import js02 from './lessons/js/02-strings'
import js03 from './lessons/js/03-functions'
import js04 from './lessons/js/04-arrays'
import js05 from './lessons/js/05-objects'
import js06 from './lessons/js/06-control-flow'
import js07 from './lessons/js/07-loops'
import js08 from './lessons/js/08-closures'
import js09 from './lessons/js/09-async'
import js10 from './lessons/js/10-classes'
import js11 from './lessons/js/11-modules'
import js12 from './lessons/js/12-challenge'

import ts01 from './lessons/ts/01-why-ts'
import ts02 from './lessons/ts/02-annotations'
import ts03 from './lessons/ts/03-arrays'
import ts04 from './lessons/ts/04-interfaces'
import ts05 from './lessons/ts/05-types'
import ts06 from './lessons/ts/06-functions'
import ts07 from './lessons/ts/07-enums'
import ts08 from './lessons/ts/08-inference'
import ts09 from './lessons/ts/09-nullability'
import ts10 from './lessons/ts/10-assertions'
import ts11 from './lessons/ts/11-generics'
import ts12 from './lessons/ts/12-constraints'
import ts13 from './lessons/ts/13-utility-types'
import ts14 from './lessons/ts/14-type-guards'
import ts15 from './lessons/ts/15-mapped-types'
import ts16 from './lessons/ts/16-template-literals'
import ts17 from './lessons/ts/17-conditional-types'
import ts18 from './lessons/ts/18-declaration-files'
import ts19 from './lessons/ts/19-react-types'
import ts20 from './lessons/ts/20-node-types'

const lessonMap: Record<string, Lesson> = {
  'js-01': js01,
  'js-02': js02,
  'js-03': js03,
  'js-04': js04,
  'js-05': js05,
  'js-06': js06,
  'js-07': js07,
  'js-08': js08,
  'js-09': js09,
  'js-10': js10,
  'js-11': js11,
  'js-12': js12,
  'ts-basic-01': ts01,
  'ts-basic-02': ts02,
  'ts-basic-03': ts03,
  'ts-basic-04': ts04,
  'ts-basic-05': ts05,
  'ts-basic-06': ts06,
  'ts-basic-07': ts07,
  'ts-basic-08': ts08,
  'ts-basic-09': ts09,
  'ts-basic-10': ts10,
  'ts-adv-01': ts11,
  'ts-adv-02': ts12,
  'ts-adv-03': ts13,
  'ts-adv-04': ts14,
  'ts-adv-05': ts15,
  'ts-adv-06': ts16,
  'ts-adv-07': ts17,
  'ts-adv-08': ts18,
  'ts-adv-09': ts19,
  'ts-adv-10': ts20,
}

export function getLesson(lessonId: string): Lesson | undefined {
  return lessonMap[lessonId]
}
