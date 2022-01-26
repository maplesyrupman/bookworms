//import models

const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth')
const { User, BookClub } = require('../models');


const resolvers = {
    Query: {
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('bookClubs');
        },

        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('bookClubs');
        },

        bookClubs: async () => {
            return BookClub.find().sort({ createdAt: -1 })
        },

        bookClubs: async (parent, { username }) => {
            const params = username ? { username } : {};
            return BookClub.find().sort({ createdAt: -1 })
        },


        bookClub: async (parent, { _id }) => {
            return BookClub.findOne({ _id });
        }
    },


    Mutation: {
        signup: async (parent, args) => {
            const user = await User.create(args);

            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }


            const token = signToken(user);
            return { token, user };
        },

        addBookClub: async (parent, args, context) => {
            if (context.user) {
                const bookClub = await BookClub.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { bookClubs: bookClub._id } },
                    { new: true }
                );

                return bookClub;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        addDiscussion: async (parent, { bookClubId, discussionBody }, context) => {
            if (context.user) {
                const updatedBookClub = await BookClub.findOneAndUpdate(
                    { _id: bookClubId },
                    { $push: { discussions: { discussionBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                );

                return updatedBookClub;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
}

module.exports = resolvers