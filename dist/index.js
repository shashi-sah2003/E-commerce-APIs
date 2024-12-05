"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const corsOptions = {
    origin: '*', // Replace with your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use("/users", userRoutes_1.default);
app.use("/products", productRoutes_1.default);
app.use("/orders", orderRoutes_1.default);
db_1.default.sync().then(() => {
    app.listen(3000, () => {
        console.log("Server running on http://localhost:3000");
    });
});
