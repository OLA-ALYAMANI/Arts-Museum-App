# ![GA Logo](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) 

# Project #2: Arts Museum Applicaton
- It is a full stack application using NodeJS and NoSQL.

## About Arts Muesum in General:
- An art museum or art gallery is a building or space for the display of art, usually from the museum's own collection. It might be in public or private ownership and may be accessible to all or have restrictions in place. Although primarily concerned with visual art, art galleries are often used as a venue for other cultural exchanges and artistic activities, such as performance arts, music concerts, or poetry readings. Art museums also frequently host themed temporary exhibitions which often include items on loan from other collections.
- In distinction to a commercial art gallery, run by an art dealer, the primary purpose of an art museum is not the sale of the items on show.

## Requirements:

### Overall Technical Requirements:

#### Authentication Requirements
There are three type of users: Regular User, Admin and Tour Guide.
- Each type of users can: sign up, sign in, change password and sign out.
- Each type of users has personal profile.

#### Art Items Requirements
- Both admin user type and regular user type can:
    - View a list of art items description in brief.
    - View single art item's full details.
    - Search art items by artist name and/or by year and/or by location.
- Admin user type can:
    - Create, edit and delete art Items.

#### Tours Requirements
- Both admin user type and regular user type can:
    - View a list of tours description in brief.
    - View single tour full details.
    - Book and cancel Booking tours. 
- Admin user type can:
    - Create, edit and delete tours.
    - Cancel regular user booking tour


## Arts Museum Applicaton Wireframes:
### Home Page
![home](https://media.git.generalassemb.ly/user/26796/files/e3a8e780-74c8-11ea-93c1-57c502b3c083)

### Admin Pages
![Art Page](https://media.git.generalassemb.ly/user/26796/files/4bf7c900-74c9-11ea-80c5-3f1635a7410f)
![Show Page as admin](https://media.git.generalassemb.ly/user/26796/files/a47b9600-74ca-11ea-8d34-c5b59301f13c)
![Add Art](https://media.git.generalassemb.ly/user/26796/files/49966e80-74cb-11ea-8040-f6c2bc66cdae)
![Tour list for admin](https://media.git.generalassemb.ly/user/26796/files/fae9d400-74cc-11ea-84fe-1c06b018aeeb)

### Regular User Pages
![Art Page as regular](https://media.git.generalassemb.ly/user/26796/files/038cdb00-74ca-11ea-9e1d-569c6db07981)
![Show Page as regular](https://media.git.generalassemb.ly/user/26796/files/1e614e80-74ce-11ea-831a-8c5ee91cd107)
![Tour list for regular](https://media.git.generalassemb.ly/user/26796/files/8b73e480-74cc-11ea-8538-010d199d88e1)

## Covered Themes: 
- Command Line
- Source Control
- Programming Fundamentals
- Web Fundamentals
- Browser Applications
- Deployment
- Responsive Web Design
- Server Side Applications
- Databases
- NoSQL
- HTML
- CSS
- JavaScript
- NodeJS and Express
- Mongodb
- Mongoose

## Librariies Used:
- **[JQuery](https://jquery.com)**
- **[Bootstrap](https://www.npmjs.com/package/bootstrap)**

## Application Deyploment:
- Heroku [here](https://devcenter.heroku.com/articles/deploying-nodejs)

## Bugs and Errors: 
- Editing Art Items Images: after adding an art item details by the admin and uploading it's image, the admin can edit the details but he can't change the old image by a new one.
- TextArea components: the area text components used for editing art items and tours details doesn't' show the previous text but it accept new text and save it effectively on the database.
- Upload Image Component: Doesn't work effectively as a design, after uploading an image it appears nothing uploaded, but it is actually does.
- Tour Date Format: Date format appears too long and it needs to be fixed to a more short readable format. 
- Page Footer Design: in some pages the footer appears up in the page. 

## Future work: 
- Make the application responsive.
- Enhancing the overall application design. 
- Adding more users types.
- Allowing admin to add more art item details.
- Enabling admin to add more types of art items.
- Adding in general more functionally and operations to the museum.

## Main Resources Uesd: 
- **[Git Documentation](https://git-scm.com/doc)**
- **[Bootstrap Documentation](https://getbootstrap.com/docs/4.1/getting-started/introduction/)**
- **[Git Team Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows)**
- **[Git Team Cheatsheet](https://jameschambers.co/writing/git-team-workflow-cheatsheet/)**
- **[nodeJS Example projects](https://github.com/sqreen/awesome-nodejs-projects)**
- **[MongooseJS documentation](https://mongoosejs.com/docs/index.html)**

## Channel of Collaboration Used by Team Members: 
- GitHub
- Slack
- Zoom 
- Discord
- WhatsApp

## Development Team Members: 
- Jaber Alsalamah
- Lujen Babunji
- Ola AlYamani