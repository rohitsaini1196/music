var publicPath = path.resolve(__dirname, "/views");
// point for static assets
app.use(express.static(publicPath));
//view engine setup
app.set("views", path.join(__dirname, "/views/"));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
