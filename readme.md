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



id   | username  | email            | fname | lname | password | bio   | area | smokes | priceRange | dob | gender | pets | cleanliness | occupation

---- | --------- | -------------- |  ---  | ---- | -------- | -------| ---- | -------| ---------- | ----| ------ | ----- | -------------- |  -----

1    | Dude | test@testing.com | John | Doe | (hashed) | string | city | int | int | date| int | string | int | string

1    | Dude | test@testing.com | John | Doe | (hashed) | string | city | int | int | date| int | string | int | string

1    | Dude | test@testing.com | John | Doe | (hashed) | string | city | int | int | date| int | string | int | string



**User Interests Table**


id   | userId | interestId |
------ | ---      | ---    
1| 1 | 1
2| 1 | 2
3| 1 | 3

**Interests Table**


id   | interest| 
| -------- | ---  
1| dancing
2| chicken
3| computers


### User Stories

1. Little Billy Macadoo is a new college student who wants to find a new roomate he will have something in common with so he is not forced to move in with a complete stranger.
 
2. Nathaniel Hilcrest has an extra room and would like to get a room mate but he is not sure how to find someone he can trust not to break his glass doll collection. He hopes to fond someone with similar tastes so he may live happily.

3. Sheri Maryweather Jr is looking to move to a new city for a new job but doesn't know anyone there. She is unsure how to find a roommate on her own.

4. Denise Ortega is a mythical user looking to start a new boy band in the shire. She hopes to find fans of Gandalf, who preferably play the saxaphone so they may jam for hours on end without driving each other mad.



### Node Modules Used

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
