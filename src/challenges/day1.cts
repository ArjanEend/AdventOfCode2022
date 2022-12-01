import * as fs from "fs/promises";

export default async function execute() {
    const file = await fs.readFile("input/day1.txt");
    const txt = file.toString("utf8");

    const elfs = txt.split("\n\n");

    const elfMap = elfs.map(elf =>
        elf.split("\n")
    );

    let highestCount = 0;
    const totalCallories = elfMap.map(elfArray => {
        let count = 0;
        elfArray.forEach(element => {
            count += parseInt(element);
        });
        highestCount = Math.max(count, highestCount);
        return count;
    }).sort((a, b) => -(a - b)).slice(0, 3);

    console.log(totalCallories);
    let topThree = 0;
    for (let i = 0; i < totalCallories.length; i++) {
        topThree += totalCallories[i];
    }
    console.log(topThree);
}