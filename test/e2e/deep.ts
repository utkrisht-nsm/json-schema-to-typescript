export const input = {
  type: 'object',
  properties: {
    foo: {
      type: 'object',
      oneOf: [
        {
          oneOf: [
            { type: 'number' },
            { $ref: '#/definitions/foo' },
            { $ref: '#/definitions/bar' },
            {
              properties: {
                baz: { type: 'number' }
              }
            }
          ]
        },
        { $ref: '#/definitions/bar' }
      ]
    }
  },
  definitions: {
    foo: {
      properties: {
        a: { type: 'string' },
        b: { type: 'integer' }
      },
      additionalProperties: false,
      required: ['a', 'b']
    },
    bar: {
      properties: {
        a: { type: 'string' }
      },
      required: ['a', 'b']
    }
  },
  required: ['foo'],
  additionalProperties: false
}

export const output = `export interface Deep {
  foo: ((number | Foo | Bar | {
    baz?: number;
    [k: string]: any;
  }) | Bar);
}
export interface Foo {
  a: string;
  b: number;
}
export interface Bar {
  a: string;
  [k: string]: any;
}
`
