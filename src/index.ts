// const { WOMClient } = require('@wise-old-man/utils');
import { WOMClient } from "@wise-old-man/utils";


/*
 * WOM Base URL: https://api.wiseoldman.net/v2
 * CollectionLog Base URL: https://api.collectionlog.net/
 * Iron Relax groupId: 5657
 */

const groupId = 5657;
const baseUrl = "https://api.wiseoldman.net/v2";

const client = new WOMClient();

fetch(`${baseUrl}/groups/${groupId}`).then(res => res.json()).then(data => {
    for (let i = 0; i < data.memberships.length; i++) {
        console.log("Member: ", data.memberships[i].player.displayName)
    }
}).catch(err => console.error(err));

// client.players.updatePlayer("Nallieheai");
// client.groups.getRequest(`${baseUrl}/groups/${groupId}`).then(data => console.log(data));