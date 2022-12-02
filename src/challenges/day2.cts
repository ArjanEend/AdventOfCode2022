import * as fs from "fs/promises";

const optionsAttack = ["A", "B", "C"];
const optionsDefend = ["X", "Y", "Z"];

const pointMap = new Map<string, number>();

for (let i = 0; i < optionsDefend.length; i++) {
    let baseScore = i + 1;
    for (let j = 0; j < optionsAttack.length; j++) {
        let winScore = 0;
        if (i > j || (j === optionsAttack.length - 1 && i === 0))
            winScore = 6;
        else if (i === j)
            winScore = 3;
        pointMap.set(`${optionsAttack[j]} ${optionsDefend[i]}`, baseScore + winScore);
    }
}

export default async function executeDay2() {
    const file = await fs.readFile("input/day2.txt");
    const txt = file.toString("utf8");

    const turns = txt.split("\n");

    let score = 0;
    const turnMap = turns.forEach(turn => {
        console.log(turn);
        console.log(pointMap.get(turn));
        score += pointMap.get(turn);
    });

    console.log(score);
}