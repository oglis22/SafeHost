import express from 'express';
const PORT = process.env.PORT || 3000;
import router from './router'
express()
.use(require('body-parser').json())
.use(require('cors')({origin: '*'}))
.use('/', router)
.listen(PORT, () => console .log(`Server is running on PORT: ${PORT}`));