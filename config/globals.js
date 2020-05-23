  
module.exports = {
	env: {
		PORT: process.env.PORT || 4000,
		SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
		MONGODB_CONNECT_URI: process.env.NODE_ENV === 'production' ? process.env.MONGODB_CONNECT_URI : 'mongodb://localhost:27017/share-book?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
		NODE_ENV: process.env.NODE_ENV || 'development',
		JWT_SECRET_KEY: process.env.JWT_SECRET_KEY|| 'test'
	}
};