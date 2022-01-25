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

        addDiscussion: async (parent, { bookId, discussionBody, username }) => {
            const user = await User.findOne({ username });
            const book = await Book.findById(bookId);
            console.log('Book: ' + JSON.stringify(book));
            book.discussion.push(
                {
                    discussionBody: discussionBody,
                    user: user
                }
            ) 
            console.log('New Book: ' + JSON.stringify(book));
            const updatedBook = await book.save()
            console.log('Updated Book: ' + JSON.stringify(updatedBook));
            return updatedBook;
        }
    }
}

module.exports = resolvers