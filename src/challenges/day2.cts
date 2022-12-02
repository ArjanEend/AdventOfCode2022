import * as fs from "fs/promises";

const optionsAttack = ["A", "B", "C"];
const optionsDefend = ["X", "Y", "Z"];

const pointMap = new Map<string, number>();
for (let i = 0; i < optionsDefend.length; i++) {
    let baseScore = i + 1;
    for (let j = 0; j < optionsAttack.length; j++) {
        let winScore = 0;
        if (i > j)
            winScore = 6;
        if (i === 0 && j === 2)
            winScore = 6;
        if (j === 0 && i === 2)
            winScore = 0;
        if (i === j)
            winScore = 3;
        pointMap.set(`${optionsAttack[j]} ${optionsDefend[i]}`, baseScore + winScore);


        console.log(`${optionsAttack[j]} ${optionsDefend[i]} ${baseScore + winScore}`);
    }
}

//Map the points you would get differently for challenge 2
const winMap = new Map<string, number>();
for (let i = 0; i < optionsDefend.length; i++) {
    for (let j = 0; j < optionsAttack.length; j++) {
        let defendIndex = (j + 1) % optionsDefend.length;
        if (i === 0)
            defendIndex = (j - 1);
        if (defendIndex < 0)
            defendIndex += optionsDefend.length;
        if (i === 1)
            defendIndex = j;
        winMap.set(`${optionsAttack[j]} ${optionsDefend[i]}`, pointMap.get(`${optionsAttack[j]} ${optionsDefend[defendIndex]}`));

        console.log(winMap.get(`${optionsAttack[j]} ${optionsDefend[i]}`));
    }
}

export default async function executeDay2() {
    const file = await fs.readFile("input/day2.txt");
    const txt = file.toString("utf8");

    const turns = txt.split("\n");

    let score = 0;
    let part2Score = 0;
    turns.forEach(turn => {
        score += pointMap.get(turn);
        part2Score += winMap.get(turn);
    });

    console.log(score);
    console.log(part2Score);
}