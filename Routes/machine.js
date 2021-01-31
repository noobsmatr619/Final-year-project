const router = require("express").Router();
const upload = require("../upload");
const machine = require("../Model/machine");
const User = require("../Model/User");
const auth = require("../middleware/auth");

const config = require("config");
const verify = require("../middleware/verify");
router.get("/", async (req, res) => {
    try {
        let machine = await machine.find({});
        // console.log(machine);
        res.status(200).json(machine);
    } catch (error) { }
});

router.get("/:id", auth, verify.isAdmin, async (req, res) => {
    try {
        const machine = await machine.findById(req.params.id);
        if (!machine) {
            return res.status(400).json({ msg: "machine Not Found" });
        }

        res.json(machine);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
});

router.post(
    "/addmachine",
    auth,
    verify.isAdmin,
    upload.single("image"),
    async (req, res) => {
        let { name, size, quantity, description, category, count, price } = req.body;
        let { filename } = req.file;
        try {
            let newmachine = new machine({
                name: name,
                image: filename,
                count,
                category,
                size,
                quantity,
                description,
                price,
            });
            await newmachine.save();
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);
router.post(
    "/:id",
    auth,
    verify.isAdmin,
    upload.single("image"),
    async (req, res) => {

        let { name, size, quantity, description, category, count, price } = req.body;
        // console.log(req.body);
        try {
            if (req.file) {
                let { filename } = req.file;
                await machine.findByIdAndUpdate(req.params.id, {
                    name: name,
                    image: filename,
                    count: count,
                    category: category,
                    size: size,
                    quantity: quantity,
                    description: description,
                    price: price,
                });
            } else {
                await machine.findByIdAndUpdate(req.params.id, {
                    name: name,
                    count: count,
                    category: category,
                    size: size,
                    quantity: quantity,
                    description: description,
                    price: price,
                });
            }
            res.status(200).json({});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);
router.patch("/update/:id", auth, verify.isAdmin, async (req, res) => {
    try {
        const machine = await machine.findById(req.params.id);
        machine.remove();
        res.status(200).json({});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", auth, verify.isAdmin, async (req, res) => {
    try {
        const machine = await machine.findById(req.params.id);
        machine.remove();
        res.status(200).json({});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
