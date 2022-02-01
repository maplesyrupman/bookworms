//import models
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth')
const { User, BookClub, Event } = require('../models');


const resolvers = {
    Query: {
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')

        },

        user: async (parent, { userId }) => {
            return User.findById(userId)
                .select('-__v -password')
                .populate('bookClubs')

        },



        bookClubs: async (parent, { bookId }) => {
            console.log(bookId)
            return await BookClub.find({ bookId })
                .populate('members')
                .populate('events')
                .sort({ createdAt: -1 })
        },

        bookClub: async (parent, { clubId }) => {
            return await BookClub.findById(clubId).populate('members').populate('discussion.user').populate('events')
        },

        popularClubs: async () => {
            return await BookClub.find()
            .populate('members')
            .populate('events')
            .sort({ memberCount: -1 })
        },
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

        createClub: async (parent, args, context) => {
            console.log(args)
            if (context.user) {
                const bookClub = await BookClub.create({ ...args, creator: context.user.username, members: [context.user._id] })
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { bookClubs: bookClub._id } },
                    { new: true }
                )

                return bookClub;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        joinClub: async (parent, { clubId }, context) => {
            if (context.user) {
                const bookClub = await BookClub.findByIdAndUpdate(
                    clubId,
                    { $addToSet: { members: context.user._id } },
                    { new: true }
                ).populate('members')

                await User.findByIdAndUpdate(
                    context.user._id,
                    { $addToSet: { bookClubs: clubId } }
                )

                return bookClub
            }

            throw new AuthenticationError('You must be logged in to join a club')
        },

        addMessage: async (parent, { clubId, body }, context) => {
            if (context.user) {
                return await BookClub.findOneAndUpdate(
                    { _id: clubId },
                    {
                        $push: {
                            discussion: {
                                $each: [{ body, user: context.user._id }],
                                $position: 0
                            }
                        }
                    },
                    { new: true }
                ).populate('discussion.user')
            }
            throw new AuthenticationError('You need to be logged in!');
        },


        addEvent: async (parent, args , context) => {
            
            if (context.user) {
                const event = await Event.create({ ...args })
                await BookClub.findByIdAndUpdate(
                    { _id: args.clubId },
                    { $push: { events: event._id } },
                    { new: true }
                )

                return event;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
}

module.exports = resolvers