import axios from "axios";
const url_base = 'https://nodes-on-nodes-challenge.herokuapp.com/nodes/';
const map = {};
const set = new Set();
let nodeWithMaxAppearance = 0;
let maxCount = 0;
const getUniqueNodes = async () => {


    await treverseTree(set, map, '089ef556-dfff-4ff2-9733-654645be56fe');
    console.log(map);
    console.log(set.size);
    console.log(nodeWithMaxAppearance);


    console.log(getNodeThatSharedTheMost(map));


    return set.size;
}

const getNodeThatSharedTheMost = (map) => {
    const reverseMap = {};

    const keySet = Object.keys(map);
    for (let i = 0; i < keySet.length; i++) {
        map[keySet[i]];
        if (!reverseMap[map[keySet[i]]]) {
            reverseMap[map[keySet[i]]] = [];
        }
        reverseMap[map[keySet[i]]].push(keySet[i]);
    }
    console.log(reverseMap);
    return maxCount;
}

const treverseTree = async (set, map, currUUID) => {
    if (set.has(currUUID)) return;

    const response = (await axios.get(url_base + currUUID)).data;
    const nodeChildren = response[0].child_node_ids;
    set.add(currUUID);
    // console.log(nodeList[0].child_node_ids.length);
    for (let i = 0; i < nodeChildren.length; i++) {
        if (map[nodeChildren[1]]) {
            map[nodeChildren[1]] = map[nodeChildren[1]] + 1;
        } else {
            map[nodeChildren[1]] = 1;
        }
        // this will get us the node child that were shared the most
        // but when there are two nodes that has same maximum values,
        // we have to create reverse map with key of count and list of node uuids as values.
        if (maxCount < map[nodeChildren[1]]) {
            nodeWithMaxAppearance = nodeChildren[1];
            maxCount = map[nodeChildren[1]];
        }
        await treverseTree(set, map, nodeChildren[i]);
    }
}
getUniqueNodes();