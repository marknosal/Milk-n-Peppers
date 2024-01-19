#M I L K + Peppers README

##Summary
This Flask app is for Dayna so anyone can access the clothes she has for sale.  
Users can signup or log on and browse the entire catalog of clothing and accessories.
You can view each article in detail and them to your vart for purchase.
This app uses the Stripe API to make purchases possible.
It contains a home page with a carousel that rotates images of items on sale.
It contains a Blog page to that shows all blogs. Right now there aren't any, 
but the option to add more is there. Users can only view the Blog page if they have an account and are logged in.
There is also an About page that shows info about MilknPeppers and how to get in contact.

##Intro
If your trying to get this app up and running on your end:
1.Fork+Clone the repository
2.In the root direcctory run the following commands in order:
    A)pipenv install && pipenv shell - this installs the dependencies for your project, creating the pipfile.lock
        on the other side of the "&&" is what activates your project's virtual environment
    B)npm install --prefix client - this installs the depencies for the front of your project,
         located in the package.json file in the client subdirectory.  This creates the package-lock.json file
    C)python server/app.py - This starts the app and log all server responses in this terminal
3. Open a new terminal and run this command:
    A)npm start --prefix client - This will start the front end and will open a tab in your web browser.
        If it doesn't navigate to localhost:4000 in your web browser

I'll go through the back and then front of the project
**
###BackEnd
All back code is located within the "server" subdirectory.
####app.py 
This file starts the application. It holds the routes and logic for any request made to the server.
It is a RESTful API so you can see flask-restful is imported.
The first route uses the before request decorator to chek if the user is logged in or whether they can make requests to a particular route.
**CheckSession** checks if a user is logged on and if they are it returns that object.
**Login** is used to log a user into the session.  
It uses bcrypt to authenticate their passwoerd and if successful saves their id to the session.
**Logout does** the opposite, it clears the session's user_id attribute
**Signup** similar to Login, but first it creates a new User object and creates a record for users table in the app's database. 
Then it saves the new user_id to the session.
**Blogs** has  two functions a GET and POST.  The get is used to retrieve all blog records and return them.  
The post is used so the owner of the website can add a new blog if they are logged in.
**Clothings** is similar, the get will retrieve all clothing records from the database.  
It also has a class method which will return true or false depending on if the clothing object that was passed in is in stock or not.
**ClothingsByID** has a get method that will return a specific clothing record based on the ID
**Profile** is currently blank
**ClothingImagePaths** will return all image paths in the projects static folder.
**ClothingImagePathsById** is used to return all the image paths for a specific clothing ID.  
Useful to access all images associated with a specific article of clothing.
**Customs** has a get method that will return all customs(or "item in a user's cart").  
It also only returns said customs if they have not been purchased yet.  They way you can keep track of previous purchases.  
The post method is used to add a spefic article of clothing to the user's cart.  
There is logic here to prevent a user from adding a quantity of item that is more than the stock.  Patch has some complicated logic.  
It is used when a user successfully purchases an item.  
It marks the purchased item's custom.purchased to "True" and at the same time lower's the purchased clothing.stock by the quantity of the item that was purchased.
**CustomById** has a delete method to remove a custom from the user's cart.  As well as a patch which is used to update an item in the cart.
**CheckoutSession** this is a route needs for the Stripe API with a successful post the embedded checkout page will appear for the user to safely entire their payment info.  
There's a get_user_cart function to that will take the customs the user wants to purchase and returning the strip_price_id and the quantity of each custom they are looking to purchase.
**SessionStatus** is used for after the user has successfully made a purchase. returns important info the front end uses to make requests to update requests and give the user info about their eReceipt.

####config.py 
This file is used to congfig the application and it's database.
It first imports the necessary dependencies and then instantiates the Flask application with the static folder with the metadata.  
It sets up the ability to use flask migration, bcrypt, imports its secret key, makes the app a RESTful API, and finally enables CORS.

####test.py
This file is used to seed test data for the database.  Some is commented out because I didn't it to overwrite the clothings table as those are real items.  
It always creates an admin user that has the ability to add more blog posts.

###Subdirectories

####instance
This contains the database file for all records

####migrations
This will hold the migrations for the database

####models
This contains the model files for each table in the database
The models are:
#####blog
The blog records, it does have an relationships
#####clothing
Contains the measurements(if the item comes with any), description, name, type, stock, etc.  It also contains it's Stripe price_id.
It has a one to many relationship with customs and to clothing_image_paths so it can have access to multiple related photos.
Lastly it has an association proxy so it can be linked to users that may purchase the item.
#####clothing_image_paths
Contains the paths to jpg files in the static folder. It has a many to one relationship with clothings
#####customs
This is the intermediary class between User and Clothing classes.  The association proxy goes through this table.
It has a notes on the cart item that the user can edit, quantity to show how many of the clothing the user wants, 
and a one to many relationship with User and Clothing classes.
#####user
This is the user record.  It has a password hash, username, email, and name.
For relationships it has a one to many with customs and an association proxy (through customs) to the clothings table.

####public
Exists for later use

####static
This is used to store all static files, such as the jpg files for storing photos of the available clothings/accessories.


###FrontEnd
All front end code is contained within the client subdirectory. on top level it has a node_modules subdirectory for your importing pleasure.
A public subdirectory that has the index.html file, the html file your react app is rooted in. As well as the package.json and package-lock.json files.
Lastly and most importantly is the src subdirectory.  The top level this file:

####index.css
Contains all the css for all components.
####index.js
This contains the top level component a BrowserRouter used to route the views the user sees.
It is also wrapped in the UserContext because all children components will need access/may change based on the user that is logged in.

####Components Subdirectory
This contains more subdirectories I use to split the components based on their view.  The whole front end app is split into three parts.
The top which is just the MilknPeppers banner, a side banner which is a NavBar the user can use to switch between pages of the app, 
and the main section which will change, mount, and render depending on which NavLink the user clicks in the sidebanner.
I'll go through each subdirctory containing child components for each view the NavBar links too.
At the top level it contains an App.jsx which is nested in the index.js file. This mounts the 3 sectionals of the website, top, side, and main.
Error.jsx is here that is a generic component used to display error messages throughout the application.

#####About
This contains one file About.jsx.  Its a pretty static view that shows MilknPeppers about page.
#####Base
This contains the 3 main sections of the website I spoke about above, TopBannerm SideBanner(NavBar), and the Main(dynamic) files.
The Main.jsx is probably most important because it has a Routes (as of react-router-dom v6, 
it used to be a Switch in v5) that is used to switch which component is rendered based on which NavLink the NavBar changes the URL too.
#####Blog
Blog.jsx is used to fetch all blog posts, it does this with a useEffect hook, and displays them all in a BlogCard.jsx.  
It displays each blog as a thumbnail of the title. If clicked an ExpandedBlog.jsx component is rendered which shows the full blog post.
There is also a NewBlogPortal.jsx which opens a popup so the user can post a new Blog if they wish.  
This isn't fully fleshed out as the owner of the website doesn't have any full blog posts as of yet.  This is only viewable if the user is logged in as the admin.
#####Clothes
This works similarly as the Blog subdirectory.  IT contains a Clothes.jsx which fetches all the available clothings and accessories MilknPeppers has for sale.
They are all displayed as thumbnails that when clicked switch to an ExpandedClothing.jsx.  
This has all associated photos with the expanded clothing as well as measurements, if given, and a button to add the clothing to the suer's cart.  
It will only let the user add a quantity that is <= to the clothings' stock.
MeasurementList.jsx is used to mount a list of the clothings measurements if they exist.
#####Context
This is to hold any context the developer needs  It currently just has UserContext, which contains the login and logout functions.  
It also has a useEffect that sends a fetch request to '/check_session' to see if their is a logged in user so the user doesn't have to relog in everytime the restart their browser.
#####Home
Home.jsx is the parent componet if the Home NavLink is clicked.  Its not fleshed out yet, but its main feature is the ClothingCarousel.jsx.  
This will rotate all images in the static folder and if clicked the user will be rerouted to the ExpandedClothing.jsx of the clicked image.
WelcomeMessagejsx is a component that is the welcome message displayed at the top.  
There are also commented out sections for reviews and latest blogs, but they haven't been built yet.
#####Login
This subdirectory is used to diplay a login or signup form for the user which can be toggled. 
Login.jsx is the parent component and LoginForm or SignupForm child components are mounted depending on which the user toggles.
#####Profile
Once the user signs in after login or signup the Login component is replaced with this one.
The parent component is Profile.jsx which contains the LogoutPortal.jsx and Cart.jsx
Cart.jsx which uses a useEffect hook to fetch all custom (cart item) records associated with the logged in user that have the purchased attributed set to false.
For each custom that is returned by the server a CartItem.jsx is displayed.  Within each their is a:
CartImages.jsx is used to show the associated images with the custom and display them as thumbnails.
CustomizePortal.jsx is button that will pop up a form so the user can make comments/requests for th custom.  This works, but isn't as complete as I would like.  
In the future they will be able to request quotes on custom alterations on clothings they want to purchase.
#####Requests
This only has one file, Requests.jsx which isn't used anywhere else.  In the future it can be used to allow the user to request custom alterations.
#####Stripe
This subdirectory contains components used to facilitate the Stripe API.  If the user clicks the purchase button on the Profile components they will be rerouted here.
CheckoutForm.jsx is used when the user first is rerouted to the '/checkout' view.  
It will display a form so the user can view what they are purchasing and input their payment methods.
After the payment is successful they are reouted again to '/return'
This shows a thank you message and info on the eReceipt that is sent to the user.  
It also has logic that will send various fetch requests pertaining to the purchased items, depending on if the payment was successful or not.


Thats pretty much it.  Please make an issue ticket if you see anything that needs fixing.

Future updates will include:
1. Clearing a user's cart if they they the same items as another user, but the other user purchases them and the stock is 0
2. Requesting custom alteration quotes
3. Reviews

PS there are also test.jsx and test.py files  in the front and back end.  Those are there if you are fiddling wit the syntax of something or just testing it out.

**Thanks!**