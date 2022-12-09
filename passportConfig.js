const passport = require("passport");
const UsersCollection = require("./models/UserSchema.js");
const GoogleStrategy = require('passport-google-oauth20').Strategy;


console.log(process.env.CLIENTID)

//serialize and deserialize user
passport.serializeUser((user, done)=>{
  done(null, user.id) // setiing cookie in the session and sending it to the client browser
  // user id we are storing in session
  // in the cookie we are sending session id; 
})

passport.deserializeUser(async (id, done)=>{
  const user = await UsersCollection.findOne({id:id})
  done(null,user )
})

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: process.env.CALLBACKURL
  },
  async function(accessToken, refreshToken, profile, cb) {
console.log(profile)

    try{
       const user = await UsersCollection.findOne({id: profile.id})
       if(user){
        cb(null, user)
     }else{
       const newUser = new UsersCollection({
         displayName: profile.displayName,
         id: profile.id,
         imageUrl: profile.picture
       })
       await newUser.save();
       cb(null,newUser)
 
     }
    }catch(err){
      console.log(err.message)
    }
   
   

   
  }
));