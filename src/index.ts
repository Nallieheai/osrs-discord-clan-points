// const { WOMClient } = require('@wise-old-man/utils');
import { WOMClient } from "@wise-old-man/utils";
import fs from 'fs';
import { parse } from 'fast-csv'

/*
 * WOM Base URL: https://api.wiseoldman.net/v2
 * CollectionLog Base URL: https://api.collectionlog.net/
 * Iron Relax groupId: 5657
 */

const playerId = 137230;
const playerName = "Nallieheai";
const groupId = 5657;
const groupName = "Iron Relax";
const womBaseUrl = "https://api.wiseoldman.net/v2";
const clogBaseUrl = "https://api.collectionlog.net";

async function processCollection(clogs: any, whitelist: {[k: string]: number}) {
    const confirmed_loot = [];
    const keys = Object.keys(clogs);
    for (let i = 0; i < keys.length; i++) {
        const items: Array<{name: string, quantity: number }> = clogs[keys[i]].items;
        for (let j = 0; j < items.length; j++) {
            // const item = items[j];
            // console.log("Type: ", typeof items[j].quantity, items[j].quantity);
            if (items[j].quantity == 0) continue;
            const item = items[j].name.toLowerCase();
            const key = Object.keys(whitelist).find(key => key === item);
            if (key === undefined) continue;
            // console.log(`${item} is worth ${whitelist[key]}!`);
            confirmed_loot.push({
                'item': items[j].name,
                'points': whitelist[key],
                'quantity': items[j].quantity
            });

            console.log(`${items[j].quantity} x ${items[j].name} grants ${whitelist[key] * items[j].quantity} points!`);
            delete whitelist[key];
        }
    }

    return confirmed_loot;
}

async function readCsv() {
    const data: {[k: string]: number} = {};
    const stream = fs.createReadStream("item_point_list.csv").pipe(parse({ headers: false }));

    for await (const row of stream) {
        data[row[0]] = parseInt(row[1]); // Each row is a key-value pair object
    }

    return data;
}


// Main function
(async () => {
    // const player = await fetch(`${womBaseUrl}/players/id/${playerId}`).then(res => res.json());
    // const player = await fetch(`${womBaseUrl}/players/${playerName}`).then(res => res.json());

    const whitelist = await readCsv();
    const groups = await fetch(`${womBaseUrl}/players/${playerName}/groups`).then(res => res.json());

    if (groups.length === 0) {
        console.error(`${playerName} is not a member of any groups!`);
        return;
    }

    let isMember = false;

    for (let i = 0; i < groups.length; i++) {
        const clan = groups[i].group;
        if (clan.id != groupId) continue;
        isMember = true;
        break;
    }

    if (!isMember) {
        console.error(`${playerName} is not a member of ${groupName}!`);
        return;
    }

    const clogs = await fetch(`${clogBaseUrl}/collectionlog/user/${playerName}`).then(res => res.json());
    const keys = Object.keys(clogs.collectionLog.tabs);
    const promises: Promise<{item: string; points: number; quantity: number;}[]>[] = [];
    
    for (let i = 0; i < keys.length; i++) {
        promises.push(processCollection(clogs.collectionLog.tabs[keys[i]], whitelist));
    }

    let total_points = 0;

    await Promise.allSettled(promises).then(data => {
        data.forEach(result => {
            if (result.status !== 'fulfilled') return;
        
            let tmp_points = 0;
            const items = result.value;
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                tmp_points += item.points * item.quantity;
            }
            // console.log("Section grants: ", tmp_points);
            total_points += tmp_points;
        });
    });

    console.log(`Total points for ${playerName}`, total_points);
})();

// console.log("Player: ", player);
// const client = new WOMClient();

// fetch(`${baseUrl}/groups/${groupId}`).then(res => res.json()).then(data => {
//     for (let i = 0; i < data.memberships.length; i++) {
//         console.log("Member: ", data.memberships[i].player.displayName)
//     }
// }).catch(err => console.error(err));

// client.players.updatePlayer("Nallieheai");
// client.groups.getRequest(`${baseUrl}/groups/${groupId}`).then(data => console.log(data));