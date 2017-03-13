Room Mates
===================


I created a basic roommate compatibility website for folks who are in need of a roommate.

----------


### Routes


METHOD   | URL      | VIEW        | PURPOSE
-------- | ---      | ---         |  ---     
GET      | /        | home.ejs    | landing page
POST     | /profile | -           | profile auth
GET      | /signup  | signup.ejs  | signup page 1
POST     | /signup  | -           | post signup 1 info
GET      | /signup2 | singup2.ejs | more info signup page
POST     | /signup2 | -           | post info of user
GET      | /logout  | -           | clear user
GET      | /profile | profile.ejs | show current user profile
POST     | profile/addIt    | -           | add user interest
DELETE   | profile/del/:int | -           | delete user interest
GET      | /profile/edit    | edit.ejs    | show edit profile page
POST     | /profile/edit    | -           | post edited info
GET      | /profile/:id     | userProfile | show specific user
GET      | /search           | search.ejs     | shows search view
POST     | /search          | -    | gets search info to display matches






### Database

**Tables/Models** 

By default all tables come with the following attributes:

> - id
> -  createdAt
> - updatedAt


**Users Table**



id   | username  | email | fname | lname | password | bio | area | smokes | priceRange | dob | gender | pets | cleanliness | occupation |

---- | --------- | ---    |  ---  | ---- | --------| --- | ---- | -----| ------- | -------| ----- | ----- | ------|  ------ |
1    | Dude | test@testing.com | John | Doe | (hashed) | string | city | int | int | date | int | string | int | string
1    | Dude | test@testing.com | John | Doe | (hashed) | string | city | int | int | date | int | string | int | string
1    | Dude | test@testing.com | John | Doe | (hashed) | string | city | int | int | date | int | string | int | string

**User Interests Table**


id   | userId | interestId |
------ | ---      | ---    
1| 1 | 1
1| 1 | 1
1| 1 | 1

**Interests Table**


id   | interest| 
| -------- | ---  
1| dancing
1| dancing
1| dancing




### Node Modules used

>- express
>- ejs
>- express-ejs-layouts
>- body-parser
>- sequelize
>- pg
>- pg-hstore
>- async
>- bcrypt
>- passport
>- passport-local
>- express-session
>- connect-flash
>- dotenv
