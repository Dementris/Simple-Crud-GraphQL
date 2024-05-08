import express from "express"
import "dotenv/config"
import bodyParser from "body-parser"
import cors from "cors";
import { resolve } from "path"
import { fileURLToPath } from "url"
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4';
import mongoose from "mongoose"
import {router} from "./routes/examsRouter.js";
import {typeDefs} from "./graphql/typeDefs.js";
import {resolvers} from "./graphql/resolver.js";

const app = express()
const PORT = process.env.PORT || 3000
const examRoutes = router

const __dirname = resolve(fileURLToPath(import.meta.url))
const viewsPath = resolve(__dirname, "../views")

// DB config
const db = process.env.MONGO_LOCAL_URL
mongoose.connect(db,{dbName: 'Lab5'})
    .then(() => console.log('DB connect'))
    .catch(err => console.log(err));

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

//Apollo Server
const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});
await server.start();

//Router
app.use('/exams', examRoutes)
app.set("view engine", "pug")
app.set('views', viewsPath)

// Apollo Server path
app.use('/graphql', cors(), express.json(), expressMiddleware(server));

app.listen(PORT, () => {
    console.log("Example app listening on port ${url}")
})