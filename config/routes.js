module.exports = router => {
    router.get("/", (req, res) => 
        res.render(("index"))
    );
    
    router.get("/saved", (req, res) => 
        res.render(("saved"))
    );
}