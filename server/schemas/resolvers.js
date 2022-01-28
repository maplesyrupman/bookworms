//import models
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth')
const { User, BookClub, Book, Event } = require('../models');
const discussionSchema = require('../models/Discussion');


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

        books: async () => {
            return Book.find().sort({ createdAt: -1 })
        },

        book: async (parent, { title, authors }) => {
            console.log('Finding Book: ' + title);
            const book = await Book.find(
                {
                    "title": { $regex: '.*' + title + '.*', $options: 'i' }
                }
            );
            return book;
        },

        bookClubs: async () => {
            return BookClub.find().sort({ createdAt: -1 })
        },

        bookClub: async (parent, { bookClubName }) => {
            return BookClub.findOne({ bookClubName })

        },

        events: async () => {
            return Event.find().sort({ createdAt: -1 })
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

        // addBook: async (parent, args) => {
        //     const book = await Book.create(args);
        //     console.log('Book: ' + JSON.stringify(book));
        //     return book;
        // },

        createBookClub: async (parent, args, context) => {
            if (context.user) {
                const bookClub = BookClub.create({ ...args, username: context.user.username })
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { bookClubs: bookClub._id } },
                    { new: true }
                )

                return bookClub;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        // addDiscussion: async (parent, { bookClubId, discussionBody, username }) => {
        //     const user = await User.findOne({ username });
        //     const bookClub = await BookClub.findById(bookClubId);
        //     bookClub.discussion.push(
        //         {
        //             discussionBody: discussionBody,
        //             user: user
        //         }
        //     )
        //     const updatedBookClub = await bookClub.save()
        //     return updatedBookClub;
        // },

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

        //addEvent(eventName: String!, eventDate: String, location: String, link: String): Event
        addEvent: async (parent, args) => {
            return await Event.create({ ...args })
        }
    }
}

module.exports = resolvers