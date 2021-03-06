import axios from "axios";
const url_base = 'https://nodes-on-nodes-challenge.herokuapp.com/nodes/';
const map = {};
const set = new Set();
let nodeWithMaxAppearance = 0;
let maxCount = 0;
const getUniqueNodes = async () => {


    await treverseTree(set, map, '089ef556-dfff-4ff2-9733-654645be56fe');
    console.log(set.size);
    console.log(nodeWithMaxAppearance);
    // map contains the count of each child that appeared.
    console.log(map);

    // function call to this will get the node that appeared the most in children
    console.log(getNodeThatSharedTheMost(map));

    // set contains number of nodes in given starting node
    return set.size;
}

const getNodeThatSharedTheMost = (map) => {
    const reverseMap = {};

    const keySet = Object.keys(map);
    for (let i = 0; i < keySet.length; i++) {
        if (!reverseMap[map[keySet[i]]]) {
            reverseMap[map[keySet[i]]] = [];
        }
        reverseMap[map[keySet[i]]].push(keySet[i]);
    }
    return maxCount;
}

const treverseTree = async (set, map, currUUID) => {
    if (set.has(currUUID)) return;

    const response = (await axios.get(url_base + currUUID)).data;
    const nodeChildren = response[0].child_node_ids;
    set.add(currUUID);
    // iterate through all the nodes to see if those are already visited or not;
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