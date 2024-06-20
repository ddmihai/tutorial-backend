"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: app.get('env') === 'production' ? 'https://tutorialx-a759317e325f.herokuapp.com' : 'http://localhost:3333'
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// use static file
const uploadsDirectory = path_1.default.join(__dirname, 'src', 'uploads');
app.use('/uploads', express_1.default.static(uploadsDirectory));
//Session settings from express session
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const user_routes_1 = __importDefault(require("./src/routes/user.routes"));
const tutorials_routes_1 = __importDefault(require("./src/routes/tutorials.routes"));
const chapter_routes_1 = __importDefault(require("./src/routes/chapter.routes"));
app.set('trust proxy', 1);
app.use((0, express_session_1.default)({
    secret: 'secret quick for now',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: app.get('env') === 'production',
        secure: app.get('env') === 'production',
        sameSite: app.get('env') === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000 // Valid pentru o zi
    },
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions',
        ttl: 14 * 24 * 60 * 60, // = 14 days. Default
        autoRemove: 'native' // Default
    })
}));
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/users', user_routes_1.default);
app.use('/tutorial', tutorials_routes_1.default);
app.use('/chapter', chapter_routes_1.default);
exports.default = app;
