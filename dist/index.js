"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
// Port Host
const PORT = config_1.default.port;
// route
app.use("/", router_1.default);
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "production" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});
const server = app
    .listen(PORT, () => {
    console.log(`
    ##############################################
    🛡️  Server listening on port: ${PORT} 🛡️
    ##############################################
  `);
})
    .on("error", (err) => {
    console.error(err);
    process.exit(1);
});
server.timeout = 1000000;
//# sourceMappingURL=index.js.map