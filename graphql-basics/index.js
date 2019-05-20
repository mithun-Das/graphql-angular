const Express = require("express");
const ExpressGraphQL = require("express-graphql");
const Mongoose = require("mongoose");
const cors = require('cors');

const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");

var app = Express();

Mongoose.connect("mongodb://localhost:27017/node-angular")
    .then(() => {
        console.log("Server is now connected");
    })
    .catch((err) => {
        console.log("Connection failed : ", err);
    });

const PostsModel = Mongoose.model("post", {
    title : String,
    content: String,
    imagePath: String,
    creator: String
});

const PostsType = new GraphQLObjectType({
    name: "post",
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        imagePath: { type: GraphQLString },
        creator: { type: GraphQLString }
    }
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            getPosts: {
                type: GraphQLList(PostsType),
                resolve: (parent, args, context, info) => {
                    return PostsModel.find().exec();
                } 
            },
            getPost: {
                type: PostsType,
                args: {
                    title: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: (parent, args, context, info) => {
                    return PostsModel.findOne({ 'title': args.title }).exec();
                }
            }
        },
    })
});

//app.use(cors());

app.use("/graphql", cors(), ExpressGraphQL({
    schema: schema,
    graphiql: true
}));

app.listen(3000, () => {
    console.log("Listening at :3000...");
});
