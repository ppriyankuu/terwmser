
# Terwmser
A browser based terminal. Uses Xterm for the terminal interface.

```Fun Kitty Project```
![screenshot_01](https://i.postimg.cc/qM9TZJrL/ss.png)

### Working
- Frontend sends the command to a websocket server.
- Server spawns a child process (on a seperate thread) to run the command.
- Server sends back the result of the command executed.

## Tech Stack
- Next js
- [Xterm.js](https://xtermjs.org/) (terminal interface on browsers)
- [ws](https://www.npmjs.com/package/ws) (websocket)
- [node-pty](https://github.com/ppriyankuu) (child processes)



## Run Locally

Clone the project

```bash
  git clone https://github.com/ppriyankuu/terwmser
```

Go to the project directory

```bash
  cd terwmser
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Author
- [@Priyanku Gogoi](https://github.com/ppriyankuu)