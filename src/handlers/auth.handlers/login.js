const { NODE_ENV } = require("../../../config");
const { validateUser } = require("../../controllers/auth.controllers");

module.exports = async (req, res) => {
	const userData = req.body;
	
	try {
		const token = await validateUser(userData);
		if (!token) {
			res.cookie("token", "", {
				expires: new Date(0),
			});
			return res
				.status(400)
				.json({ error: "Usuario o contraseña incorrectos" });
		}

		// // Cabeceras para evitar el almacenamiento en caché de la cookie
		// res.header("Cache-Control", "no-store");
		// res.header("Expires", "Mon, 01 Jan 2000 00:00:00 GMT");
		// res.header("Pragma", "no-cache");

		res.cookie("token", token, {
			httpOnly: false,
			secure: NODE_ENV === "production",
			sameSite: "none",
		});
		res.status(200).send("Login successfully.");
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};