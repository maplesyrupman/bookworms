//import models

const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth')
const { User, BookClub, Book } = require('../models');
const discussionSchema = require('../models/Discussion');


const resolvers = {
    Query: {
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password');
        },

        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password');
        },

        books: async () => {
            return Book.find().sort({ createdAt: -1 })
        },

        book: async (parent, { title }) => {
            console.log('Finding Book: ' + title);
            const book = await Book.find(
                {
                    "title": { $regex: '.*' + title + '.*', $options: 'i' }
                }
            );
            console.log('Book: ' + JSON.stringify(book));
            return book;
        },

        bookClubs: async () => {
            return BookClub.find().sort({ createdAt: -1 })
        },

        // bookClubs: async (parent, { username }) => {
        //     const params = username ? { username } : {};
        //     return BookClub.find().sort({ createdAt: -1 })
        // },


        // bookClub: async (parent, { _id }) => {
        //     return BookClub.findOne({ _id });
        // }
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

        addBook: async (parent, args) => {
            const book = await Book.create(args);
            console.log('Book: ' + JSON.stringify(book));
            return book;
        },

        createBookClub: async(parent, { bookClubName, username }) => {
            const user = await User.findOne({ username });
            const bookClub = new BookClub();
            bookClub.createdBy = user;
            bookClub.bookClubName = bookClubName;
            const bookClubUpdated = await bookClub.save();
            console.log('BookClub: ' + JSON.stringify(bookClubUpdated));
            return bookClubUpdated;
        },

        addDiscussion: async (parent, { bookClubId, discussionBody, username }) => {
            const user = await User.findOne({ username });
            const bookClub = await BookClub.findById(bookClubId);
            console.log('BookClub: ' + JSON.stringify(bookClub));
            bookClub.discussion.push(
                {
                    discussionBody: discussionBody,
                    user: user
                }
            ) 
            console.log('New BookClub: ' + JSON.stringify(bookClub));
            const updatedBookClub = await bookClub.save()
            console.log('Updated BookClub: ' + JSON.stringify(updatedBookClub));
            return updatedBookClub;
        }
    }
}

module.exports = resolvers