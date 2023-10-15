import type { RuleListener } from '../utils/eslint-types/Rule.js'

import { createEslintRule } from '../utils/create-eslint-rule.js'
import { sleepSync } from '../utils/sleep-sync.js'
import { complete } from '../utils/complete.js'
import { RuleContext } from '../utils/eslint-types/Rule.js'

type MESSAGE_ID = 'no-rush'

type Options = [Partial<{ delay: number }>]

export const RULE_NAME = 'no-rush'

type Context = RuleContext<MESSAGE_ID, Options>

export default createEslintRule<Options, MESSAGE_ID>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce a delay',
    },
    schema: [
      {
        type: 'object',
        properties: {
          delay: {
            type: 'number',
            default: 10,
          },
        },
      },
    ],
    messages: {
      'no-rush': 'no-rush',
    },
  },
  defaultOptions: [
    {
      delay: 10,
    },
  ],
  create: (context: Context): RuleListener => {
    const options = complete(context.options.at(0), {
      delay: 10,
    })
    return {
      Program: () => sleepSync(options.delay * 1000),
    }
  },
})
