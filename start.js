const app = require('./app');
const port = process.env.PORT || 3001;
const { connect } = require("./database/dbSetup");

connect();

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});