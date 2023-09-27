const { JWT_KEY, CL_URL } = require("../config");
const express = require("express");

//<--------------------Middlewares libraries------------------->//
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("./auth/passport-config");

//<---------------------Custom Middlewares--------------------->//
const { authenticateAdmin, authenticateUser } = require("./middlewares");

//<---------------------------Routes-------------------------->//
const authRoutes = require("./routes/auth.routes");
const searchRoutes = require("./routes/search.routes");
const userRoutes = require("./routes/user.routes");
const jobRoutes = require("./routes/job.routes");
const imageRoutes = require("./routes/image.routes");
const adminRoutes = require("./routes/admin.routes");
const chatroomRoutes = require("./routes/chatroom.routes");
// const userTestRoutes = require("./routes/userTest.routes");  <--- Desactivada en producción

//<---------------------------Config-------------------------->//
const app = express();
app.use(morgan("dev"));
app.use(
	// 	cors({ origin: "*", credentials: true })
	cors({
		origin: CL_URL,
		credentials: true,
	})
);

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(
	session({
		secret: JWT_KEY,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Ruta para manejar las solicitudes OPTIONS preflight

// app.use(function (req, res, next) {
// 	res.header(
// 		"Access-Control-Allow-Origin",
// 		"https://point-mvp-git-main-trendsapp2023-gmailcom.vercel.app"
// 	);
// 	res.header("Access-Control-Allow-Credentials", true);
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept"
// 	);
// 	next();
// });

app.options(CL_URL, (req, res) => {
	const allowedHeaders = [
		"Origin",
		"X-Requested-With",
		"Content-Type",
		"Accept",
		"X-CSRF-Token",
		"X-Requested-With",
		"Accept",
		"Accept-Version",
		"Content-Length",
		"Content-MD5",
		"Content-Type",
		"Date",
		"X-Api-Version",
	];
	res.header("Access-Control-Allow-Origin", CL_URL);
	res.header(
		"Access-Control-Allow-Methods",
		"GET, OPTIONS, PATCH, DELETE, POST, PUT"
	);
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	res.header("Access-Control-Allow-Headers", allowedHeaders.join(", "));
	res.status(200).end();
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", authenticateAdmin, adminRoutes);
app.use("/api/v1/user", authenticateUser, userRoutes);
app.use("/api/v1/job", authenticateUser, jobRoutes);
app.use("/api/v1/search", authenticateUser, searchRoutes);
app.use("/api/v1/images", authenticateUser, imageRoutes);
app.use("/api/v1/chatroom", authenticateUser, chatroomRoutes);

// --- solo para pruebas --- //
// app.use("/userTest", userTestRoutes);   <--- Desactivada en producción

//<-------------------Servidor Socket.io---------------------->//
const { createServer } = require("http");
appSocket = createServer(app);
const serverSocket = require("./socket/serverSocket");
serverSocket(appSocket);

module.exports = appSocket;
