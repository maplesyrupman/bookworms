//import models
const { AuthenticationError } =  require('apollo-server-express')
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        queryTest() {
            return 'query test success'
        }
    },

    Mutation: {
        mutationTest(parent, {testVar}) {
            return 'mutation test success'
        }
    }
}

module.exports = resolvers