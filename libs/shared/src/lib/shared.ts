export const sharedSchema = /* GraphQL */`
  type ASharedType {
    shared: String!
  }

  extend type Query {
    aSharedEntity: ASharedType!
  }
`

export const sharedResolver = {
  Query: {
    aSharedEntity: () => ({
      shared: "Hi! I'm shared"
    })
  }
}


