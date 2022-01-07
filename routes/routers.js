const router = require("express").Router();
const path = require("path");
const fs = require("fs");

const data = [];

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../views", "home.html"));
});

router.get("/write", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../views", "write.html"));
});

router.post("/guest", (req, res, next) => {
  let guestEntry = {
    name: req.body.name,
  };
  data.push(guestEntry);
  fs.writeFile("guest.txt", JSON.stringify(data), () => {
    res.status(302).redirect("/");
  });
});

router.get("/read", (req, res, next) => {
  fs.readFile("guest.txt", "utf8", (err, data) => {
    let guestList = [];

    if (!err) {
      try {
        guestList = JSON.parse(data);
      } catch (e) {
        fs.writeFileSync("guest.txt", []);
        guestList = [];
      }
    }
    data = guestList;

    res.render("read", { title: "Guest List", guestList });
  });
});

module.exports = router;
