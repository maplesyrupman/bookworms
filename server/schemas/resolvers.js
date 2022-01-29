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

        },

        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')


        },

        bookClubs: async (parent, {title, authors}) => {
            return await BookClub.find({
                title,
                authors
            })
            .populate('members')
            .sort({ createdAt: -1 })
        },

        bookClub: async (parent, { clubId }) => {
            console.log(clubId)
            const club = await BookClub.findById(clubId).populate('members')
            console.log(club)
            return club
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
            if (context.user) {
                const bookClub = await BookClub.create({ ...args, creator: context.user.username })
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { bookClubs: bookClub._id } },
                    { new: true }
                )

                return bookClub;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        joinClub: async (parent, {clubId}, context) => {
            if (context.user) {
                const bookClub = await BookClub.findByIdAndUpdate(
                    clubId,
                    { $addToSet: {members: context.user._id}},
                    {new: true}
                ).populate('members')

                await User.findByIdAndUpdate(
                    context.user._id,
                    {$addToSet: { bookClubs: clubId }}
                )

                return bookClub
            }

            throw new AuthenticationError('You must be logged in to join a club')
        },

        addDiscussion: async (parent, { bookClubId, discussionBody }, context) => {
            if (context.user) {
                const updatedBookClub = await BookClub.findOneAndUpdate(
                    { _id: bookClubId },
                    { $push: { discussions: { discussionBody, username: context.user.username } } },
                    { new: true }
                );

                return updatedBookClub;
            }

            throw new AuthenticationError('You need to be logged in!');
        },


        addEvent: async (parent, args) => {
            return await Event.create({ ...args })
        }
    }
}

module.exports = resolvers