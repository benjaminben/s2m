## Installation

### Go

- Follow the instructions [here](https://golang.org/doc/install) to download the binary
- Make sure you have your `$GOPATH` set somewhere in your `~/.bash_profile` e.g `export GOPATH=$HOME/code/go`

### Ngrok

- Very useful tool for exposing a public URL for a local server on your computer
- If you have Homebrew or NPM installed, [it appears](https://gist.github.com/wosephjeber/aa174fb851dfe87e644e) you can install ngrok with either of those package managers

### Project

- Clone this project `git clone https://github.com/benjaminben/s2m.git`
- `cd` into the project root and install the server dependencies with `go get ./...`

## Running

### Server

- UPDATE 12.5.17: From the project root, run `webpack` to compile the static assets for the web client. For live recompiling of these assets (if you're making changes), run `webpack --watch` instead
- From the project root, run `go run main.go` to start the development server. The web client is now accessible at `localhost:7000` (game namespaces can be viewed / created by visiting `localhost:7000/room/${roomID}`)
- In a new bash tab, run `ngrok http 7000` - this exposes a public URL for the server, e.g `https://0b308002.ngrok.io` (if you have a paid account with ngrok, you can specify a consistent subdomain such as `abc.ngrok.io`, which can be very helpful)
- Visit `${subdomain}.ngrok.io` in your browser to confirm it works as a substitute for `localhost:7000`

### Unity

- Download the project files (you should have received a collab invite via email)
- Open the only available scene in `Assets` if it's not already open
- Select the `GameController` in the project hierarchy and note the values in the `GameController` component inspector
- Change the value of Base Host to `${subdomain}.ngrok.io` - remember that unless you use a custom subdomain the value will change every time you restart ngrok!
- You may or may not need to check `Use SSL` depending on network files... maybe check it just in case
- You can leave the `Room ID` as `abc123` or change it to whatever [URL safe!!] string you want
- Press play in Unity and check in your bash tab running the go server that the Unity client has connected

You may now visit `${subdomain}.ngrok.io/room/${roomID}` on a web browser (e.g from your phone) and tap the canvas to place objects in the Unity scene.

## TODO

Everything lol. Let's go!
