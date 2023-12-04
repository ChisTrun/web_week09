const express = require('express');
const path = require('path');
const configViewEngine = require('./configs/configViewEngine');
const configStaticResource = require('./configs/configStaticResource');
const configSession = require('./configs/configSession');
const  {NotFound, HandleError} = require('./Middlewares/ErrorHandling');
require('dotenv').config();


//Config APP
const app = express();
const port = process.env.PORT;
app.use(express.urlencoded({extended: true}));
configSession(app);
configViewEngine(app,path.join(__dirname,'views'));
configStaticResource(app,path.join(__dirname,'public'));

//Router
app.use('/',require('./routes/site.r'));
app.use('/acc',require('./routes/acc.r'));
app.use('/admin',require('./routes/admin.r'));
app.use('/product',require('./routes/product.r'));
app.use('/categories',require('./routes/categories.r'));
app.use('/order',require('./routes/order.r'));


//MiddleWare
app.use(NotFound);
app.use(HandleError);

app.listen(port,() => {console.log(`Server is listening on port ${port}`);})
