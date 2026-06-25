import { describe, expect, it } from 'vitest'
import routes from './routes'

describe('routes', () => {
  it('should match the route snapshot', () => {
    // ARRANGE
    // ACT
    // ASSERT
    expect(routes).toMatchInlineSnapshot(`
      [
        {
          "file": "routes/home.tsx",
          "index": true,
        },
        {
          "children": undefined,
          "file": "routes/screen-one.tsx",
          "path": "screen-one",
        },
        {
          "children": undefined,
          "file": "routes/screen-two.tsx",
          "path": "screen-two",
        },
        {
          "children": undefined,
          "file": "routes/admin.login.tsx",
          "path": "admin/login",
        },
        {
          "children": undefined,
          "file": "routes/admin.dashboard.tsx",
          "path": "admin/dashboard",
        },
      ]
    `)
  })
})
