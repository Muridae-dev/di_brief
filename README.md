# Marketplace
This was a project at Hyper Island during our module Data interaction, where our task was to host and use some type of server and requesting information from said server. A recommendation was to make E-commerce websites and I wanted to take that to the next level and got the idea to make something similar to "Ebay", where users could also interact with the backend, by creating their own accounts, posting their own items to the marketplace and being able to trade said items with other users.

So what I ended up with is a marketplace demo that features:

- A fully built MERN-Stack

- User registration & login saved to Mongodb with bcrypted passwords

- User authentication using JSON-webtokens

- Posting items with images that are saved to the local server using Multer.

- Item creation also features a short description, choosing tags and choosing the color of the description text.

In the marketplace you can view other users items, filter items using tags and REQUEST TRADEs. When a trade request is made the owner of the item will be notified in the "Inventory" route and can then choose to ACCEPT TRADE, where the requesting user will then aquire said item in their inventory.
