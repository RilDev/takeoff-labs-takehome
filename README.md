# Club Takehome

During this test, you'll need to develop a minimal chat interface based on the [design on figma](https://www.figma.com/file/32YI2YtVas5aOjYKXhchev/Chat-take-home?node-id=0%3A1).

You will need to use this github as a starter, create one or multiple pages based on your decision that will lead to match the design.

![MacBook Pro - 1](https://user-images.githubusercontent.com/11197281/143602062-8980d974-bd8b-45bd-a522-0b141b4dd9ae.png)

### Chat data API

Chat data are already fetched server side. Your move to transfer them to the client by props or Redux!

### Run the project

- Install dependencies: `yarn`
- Run Next.js: `yarn start` or using Run and Debug tab from Visual Studio Code
- Check it on http://localhost:3000 (port may change if already taken)

### Verification

You don't need to deploy your project for verification. You can push it in github or send us through a zip file. What is important for us is that we only need to use `yarn start` in order to see your work, nothing more.

Start simple and go deep, that's how we work.

### Rules and Evaluation

- You're allowed to use any external ressource that you'ld like
- After 3h you should send a zip of your project
- Do spend some time to work on the extra points as we expect you to not only perform the basic implementation

## Features

### List of Chat

- [x] Sorted by last message date
- [x] Displaying profile picture, last message a time indicator
- [x] Find a design way to understand that the message has not been read
- [x] Clicking on a chat preview open the corresponding chat
- [ ] EXTRA: Search a person is a local filtering based on a text input

### Chat

- [x] Sorted by date
- [ ] Input add a local message from you (not using POST or anything)
- [ ] EXTRA: Add a tooltip such as when hovering any message you see the
      date of the message
- [ ] EXTRA: Search a message is a local search for a message that, when
      submited, scroll and highlight the first message found

### Details

- [x] I strongly advise you to use Tailwind for css styling. On all of our web
      project, we use a mix of Tailwind and a bit of Scss but our main css
      framework is Tailwind. It’s quite fast to learn and pretty simple, if you
      don’t know it, take a look!
- [x] Put whatever photo you want on the profile picture on top of the chat list,
      it can be a photo of yourself! :)
- [ ] BIG EXTRA: Responsive!

### Extra

- [x] set user cards background to active when clicked
- [ ] update the unread message status when chat clicked
- [x] select the first chat on load
- [x] fix the chat scroll system
- [ ] refactor
