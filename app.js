const Koa = require("koa");
const path = require("path");
const Router = require("koa-router");
const views = require("koa-views");
const serve = require("koa-static");
const globalRouter = require("./src/router");
const globalDB = require("./src/db");
const nunjucks = require("nunjucks");
const bodyParser = require('koa-body');
const port = process.env.PORT || 3001;

const app = new Koa();
const router = new Router();

const nunjucksEnvironment = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(path.join(__dirname, "/src/pages"))
);

const render = views(path.join(__dirname, "/src/pages"), {
  extention: "html",
  options: {
    nunjucksEnv: nunjucksEnvironment,
  },
  map: {
    html: "nunjucks",
  },
});

app.use(bodyParser({
  formidable:{uploadDir: './uploads'},
  multipart: true,
  urlencoded: true
}));

app.use(render);
app.use(serve(path.join(__dirname, "/dist")));

router.use("/", globalRouter.router.routes());
app.use(router.routes());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});