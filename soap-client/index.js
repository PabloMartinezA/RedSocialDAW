const express = require('express');
const app = express();

app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use(express.static("public"));

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
