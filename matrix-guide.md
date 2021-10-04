# Matrix new user guide for TC39 delegates

1. Choose a client

    Like IRC and unlike many closed platforms, Matrix is an open protocol. Therefore, you can choose which client(s) you would prefer to use based on your preferred workflow.

    If you don't care too much and just want something that "works", we recommend [Element] (web, desktop and mobile).

    If you want to explore further or experiment with alternate clients, check out this [list of clients].

1. Create an account

    (Skip this step if you already have a Matrix account).

    1. Choose a homeserver

        Matrix is a federated service. Unlike IRC, you don't necessarily need to register on each server you want to talk on, you can register on any server you trust/like and talk everywhere else.

        We recommend using the officially maintained matrix.org homeserver, unless you have a reason to do otherwise. Matrix.org is the default on most clients. This is the server our channels are hosted on and a majority of delegates are registered to.

        Other servers are also available. For instance, Mozilla and Igalia delegates tend to use their own corporate homeservers. If you want to explore other servers, you can find many to choose from in the following lists:
        - https://www.hello-matrix.net/public_servers.php
        - https://publiclist.anchel.nl/

    1. Create your account

        Check the documentation for your preferred client. For most clients including Element, there should be a link to do this on the landing page when you're not already logged into another account.

1. Log into your account and start talking

    1. Log into your account

        Check the documentation for your preferred client. For most clients including Element, there should be a link to do this on the landing page when you're not already logged into another account.

    1. Join the official TC39 channels

        You can click through the following links to join the various official TC39 channels in your preferred client. They all correspond to the similarly titled channels on Freenode.

        1. [#tc39-general] - public conversation, open to community members
        1. [#tc39-delegates] - publicly viewable conversation, participation restricted to delegates
        1. [#temporaldeadzone] - off-topic conversations and backchanneling. Technically public, but intended for delegates
        1. [#tc39-implementers] - space for discussions regarding maintenance and development of the JavaScript engines
        1. [#tc39-ecma402] - space for discussion regarding maintenance and development of the `Intl` spec
        1. [#tc39-beginners] - space for clarifying questions on terminology, process, history, etc
        1. [#tc39-inclusion] - an informal working group with the goal of making TC39 a more inclusive committee in which to participate
        1. [#tc39-website] - for development of [tc39.es](https://tc39.es)

    1. Check that you have the correct permissions

        If you are a TC39 delegate, you should be able to post messages in [#tc39-delegates].
        This corresponds to a "power level" of 10.
        This should have been set during your onboarding as a delegate.
        If it wasn't, or if you joined Matrix in the initial migration and you don't have this yet, ask one of the TC39 chairs to give you this permission.

        If you are not a delegate, then you should have a power level of less than 10 and only be able to view messages in [#tc39-delegates].

## How To...

(These "how to"s apply if you are using the Element client, but other Matrix clients have similar ways to accomplish the same thing.)

### ...see who is in the channel?

Click on "Room Info" (the 🛈 circled-**i** icon in the top right hand corner). Note that not all homeservers expose online/offline info to everyone, so someone may be online even if they are marked as offline.

### ...DM someone?

Click on their avatar in front of one of their messages, or click on their avatar in the list in "Room Info" (the 🛈 circled-**i** icon in the top right hand corner). Then click "Direct Message" (in the menu near the bottom of the right hand panel) to start a private one-to-one room.

To do this IRC-style, you can also type `/msg jsfan hi, what's up?` to start a DM room (in this case with the user `jsfan`).

### ...start a chat with a small group?

Click on the **+** (plus sign) next to "Rooms" (in the room list on the left sidebar).
You can choose to make it public (discoverable in the public room list) or private (invite-only).
End-to-end encryption is probably fine to leave on.

### ...use formatting in messages?

Clicking the smiley face icon at the bottom left, or typing <kbd>:</kbd> brings up the emoji picker.
At the moment the emoji picker is slightly clunky in Element, unfortunately, compared to other chat clients.

You can use Markdown formatting in your messages: `*` for bold, `_` for italics, backticks for code.
You can even do code blocks with syntax highlighting, using triple backticks; to add a newline in the message without sending it, use <kbd>Shift</kbd>+<kbd>Enter</kbd>.
(That is, <kbd>&grave;</kbd>, <kbd>&grave;</kbd>, <kbd>&grave;</kbd>, <kbd>J</kbd>, <kbd>S</kbd>, <kbd>Shift</kbd>+<kbd>Enter</kbd>, <kbd>Ctrl</kbd>+<kbd>V</kbd> to paste your code, <kbd>Shift</kbd>+<kbd>Enter</kbd>, <kbd>&grave;</kbd>, <kbd>&grave;</kbd>, <kbd>&grave;</kbd>, <kbd>Enter</kbd>).

Unordered and ordered lists also work the same way as they do in markdown, so <kbd>Shift</kbd>+<kbd>Enter</kbd> comes in handy there as well.

### ...correct mistakes in messages?

You can edit your own messages if you make a typo. To do this, hover over the message and click the pencil icon.

As a shortcut, to edit your most recent message, you can press the up arrow <kbd>↑</kbd>.

You can also remove your message if you post it by mistake (for example, in the wrong channel). To do this, hover over the message and click the **…** (ellipsis), then click "Remove". A "Message deleted" will show up in its place.

### ...mute someone in case of toxic behaviour?

To mute someone so that you don't see their messages, click on their avatar in front of one of their messages, or click on their avatar in the list in "Room Info" (the 🛈 circled-**i** icon in the top right hand corner). Then click "Ignore" (in red at the bottom of the menu in the right hand panel).

In case of harassment, please also [submit a report](https://tc39.es/code-of-conduct/#reporting-guidelines) to the Code of Conduct committee.

## Coming from IRC

If you're used to IRC and using the Element Web or Desktop clients, you can make the transition less jarring by changing some options. You can get to the settings by clicking your username in the upper-left corner and selecting "All Settings" from the dropdown.

Suggested settings to change:

- Appearance -> 'Show Advanced' (at the bottom) -> Enable experimental, compact IRC style layout \[this will significantly increase the number of lines on screen at a time\]
- Preferences -> Timeline -> Show read receipts sent by other users -> off \[keep them on if you like; many people find the animations distracting\]
- Preferences -> Timeline -> Show chat effects (animations when receiving e.g. confetti) -> off
- Notifications -> Enable email notifications -> off \[unless you want them\]


[Element]: https://element.io/
[list of clients]: https://matrix.org/clients/

[#tc39-general]: https://matrix.to/#/#tc39-general:matrix.org
[#tc39-delegates]: https://matrix.to/#/#tc39-delegates:matrix.org
[#temporaldeadzone]: https://matrix.to/#/#temporaldeadzone:matrix.org
[#tc39-implementers]: https://matrix.to/#/#tc39-implementers:matrix.org
[#tc39-ecma402]: https://matrix.to/#/#tc39-ecma402:matrix.org
[#tc39-beginners]: https://matrix.to/#/#tc39-beginners:matrix.org
[#tc39-inclusion]: https://matrix.to/#/#tc39-inclusion:matrix.org
[#tc39-website]: https://matrix.to/#/#tc39-website:matrix.org

# Creating a new channel on Matrix for TC39 use
(This assumes that you're using the Element client)

1. Click the plus icon next to "Rooms" in the sidebar
1. Give the room a name, like "TC39 Delegates"
1. Give the room a topic, if desired
1. Enable "Make this room public"
1. Make the room address a lowercase, dashed version of the name you input earlier, like "tc39-delegates"
1. Click "Create Room"
1. Click the three-dot menu button that appears when you hover over the new room in the sidebar, then click "Settings" in the menu that appears
1. In General, add the TC39 logo as the room's image. You can find the logo [here](https://avatars0.githubusercontent.com/u/1725583?s=280&v=4).
1. At the bottom of General, enable URL previews by default for participants in this room
1. In Security & Privacy, set "Who can access this room?" to "Anyone who knows the room's link, including guests". Also set "Who can read history?" to "Anyone".
1. In Advanced, copy the internal room ID. Go back to General, and add a link to the logs in the room topic, like so: "Public logs at https://view.matrix.org/room/!WgJwmjBNZEXhJnXHXw:matrix.org/".
1. Ask one of the chairs to add the room to the [TC39 space](https://app.element.io/#/room/!hmsRHUEXriRovkvcin:matrix.org).
1. Once the room is in the TC39 space it will automatically get logged on https://matrixlogs.bakkot.com/. You can change the topic to refer to the relevant channel there instead.
