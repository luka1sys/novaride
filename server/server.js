// ვიღებთ express framework-ს, რომელიც გვაძლევს შესაძლებლობას ავაწყოთ API და სერვერი
const express = require('express');
// dotenv გამოიყენება .env ფაილში შენახული ცვლადების (მაგ: PORT, MONGO_URL) ასატვირთად process.env-ში
const dotenv = require('dotenv');
// ვიღებთ mongoose-ს, რომელიც MongoDB-სთან სამუშაო  ბიბლიოთეკაა
const mongoose = require('mongoose');
//  authRouter არის router ფაილი  სადაც იწერება user-თან დაკავშირებული როუთები (login, signup და ა.შ.)
const authRouter = require('./routes/auth.routes');
// დავაიმპორტეთ cors react ის პორტის დასაკავშირებლად 
const cors = require('cors');
const path = require('path');
// ვაიმპორტებთ carRouter ფაილს 
const carRouter = require('./routes/car.routes');
const bookingRouter = require('./routes/booking.routes');
const cookieParser = require('cookie-parser');
const paymentRouter = require('./routes/payment.routes');
const oauthRouter = require('./routes/oauth.routes');
// ვტვირთავთ .env ფაილში შენახულ კონფიგურაციებს (მაგ: MONGO_URL, PORT)
dotenv.config();
// ვქმნით express აპლიკაციას
const app = express()
app.use(cookieParser())
// middleWare - JSON ფორმატის request body-ს კითხულობს
app.use(express.json())
app.use(cors({
  origin: process.env.CLIENT_URL,  // შენი React პორტი
  credentials: true
}));

// app.use('/cars/images',express.static( path.join(__dirname, 'uploads/cars')));
// app.use('/uploads', express.static('uploads'));
// ვუთითებთ რომ '/users' როუტზე ყველა მოთხოვნა გადავიდეს authRouter-ში
app.use('/api/users', authRouter)
app.use('/api/users/oauth', oauthRouter);
app.use('/api/cars', carRouter)
app.use('/api/booking', bookingRouter)
app.use('/api/checkout', paymentRouter)
// Error handling middleware → ყველა შეცდომა რომელიც next(err)-ით მოვა აქ დამუშავდება
app.use((err, req, res, next) => {
  // 
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';


  // ვაბრუნებთ JSON პასუხს შეცდომის სტატუსით და მესიჯით
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});
// ვუკავშირდებით MongoDB-ს (მისამართს ვიღებთ process.env.MONGO_URL-დან)
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    // თუ კავშირი წარმატებულია, ვბეჭდავთ მესიჯს
    console.log('conected to mongoDb')
    // ვრთავთ სერვერს მითითებულ PORT-ზე ან default 3000-ზე
    app.listen(process.env.PORT || 3000, () => {
      console.log(`server is runing ${process.env.PORT}`)
    })
  })
  .catch(err => {
    // თუ კავშირი MongoDB-სთან ვერ მოხერხდა, ვბეჭდავთ ერორს
    console.log('Database conecting error', err);
    // process.exit(1) სრულად წყვეტს node პროცესს
    process.exit(1);
  })