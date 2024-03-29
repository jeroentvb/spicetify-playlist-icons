# Playlist icons
Spicetify extension to add icons to the 'add to playlist' context menu, and in legacy mode to add the icon of a playlist in front of the playlist the playlist list.  

<img src="./docs/context-menu.png" width="600">

![playlist icons small](./docs/playlist-icons-small.png)
![playlist icons big](./docs/playlist-icons-big.png)

## Installation
Install via [spicetify-marketplace](https://github.com/CharlieS1103/spicetify-marketplace).

Or the manual way:  
Copy `playlist-icons.js` (from the [dist](https://github.com/jeroentvb/spicetify-playlist-icons/tree/dist) branch) to the spicetify extensions folder
| **Platform**    | **Path**                               |
|-----------------|----------------------------------------|
| **MacOs/Linux** | `~/.config/spicetify/Extensions`       |
| **Windows**     | `%appdata%\spicetify\Extensions\`      |

Run the following commands
```sh
spicetify config extensions playlist-icons.js
spicetify apply
```
